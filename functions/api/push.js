// ==========================================================================
//  functions/api/push.js  -  Web Push notifikasi admin LUVIA STUDIO TV
//  Rute: /api/push
//   GET  ?aksi=kunci                     -> kunci publik VAPID
//   GET  ?aksi=status&device=ID          -> apakah perangkat ini yang sedang aktif
//   POST {aksi:'notifikasi', key}        -> (dari halaman penonton) kirim push ke admin
//   POST {aksi:'aktifkan', deviceId, subscription}   (header X-Admin-Key)
//   POST {aksi:'matikan',  deviceId}                 (header X-Admin-Key)
// ==========================================================================
const FIREBASE_DB = 'https://luvia-studio-tv-default-rtdb.firebaseio.com';
const enc = new TextEncoder();

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
    status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
});
const ringkas = (s, m) => {
    s = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
    return s.length > m ? s.slice(0, m - 1) + '…' : s;
};

function b64uKeBytes(s) {
    s = String(s).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const bin = atob(s), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u;
}
function bytesKeB64u(u) {
    let s = '';
    for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function gabung(...arr) {
    const out = new Uint8Array(arr.reduce((a, b) => a + b.length, 0));
    let o = 0;
    for (const a of arr) { out.set(a, o); o += a.length; }
    return out;
}

// ---------- Enkripsi isi pesan (RFC 8291, aes128gcm) ----------
async function enkripsi(sub, teks) {
    const uaPublik = b64uKeBytes(sub.keys.p256dh);
    const auth = b64uKeBytes(sub.keys.auth);

    const asPair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
    const asPublik = new Uint8Array(await crypto.subtle.exportKey('raw', asPair.publicKey));
    const uaKey = await crypto.subtle.importKey('raw', uaPublik, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
    const ecdh = await crypto.subtle.deriveBits({ name: 'ECDH', public: uaKey }, asPair.privateKey, 256);

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const ecdhKey = await crypto.subtle.importKey('raw', ecdh, 'HKDF', false, ['deriveBits']);
    const keyInfo = gabung(enc.encode('WebPush: info\0'), uaPublik, asPublik);
    const ikm = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: auth, info: keyInfo }, ecdhKey, 256);

    const ikmKey = await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
    const cekBits = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: salt, info: enc.encode('Content-Encoding: aes128gcm\0') }, ikmKey, 128);
    const nonce = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: salt, info: enc.encode('Content-Encoding: nonce\0') }, ikmKey, 96);
    const cek = await crypto.subtle.importKey('raw', cekBits, 'AES-GCM', false, ['encrypt']);

    const data = gabung(enc.encode(teks), new Uint8Array([2]));
    const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, cek, data));

    const header = new Uint8Array(21);
    header.set(salt, 0);
    new DataView(header.buffer).setUint32(16, 4096);
    header[20] = asPublik.length;
    return gabung(header, asPublik, cipher);
}

// ---------- Tanda tangan VAPID ----------
async function headerVapid(endpoint, env) {
    const pub = b64uKeBytes(env.VAPID_PUBLIC_KEY);
    const jwk = {
        kty: 'EC', crv: 'P-256',
        x: bytesKeB64u(pub.slice(1, 33)), y: bytesKeB64u(pub.slice(33, 65)),
        d: env.VAPID_PRIVATE_KEY, ext: true
    };
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
    const head = bytesKeB64u(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
    const body = bytesKeB64u(enc.encode(JSON.stringify({
        aud: new URL(endpoint).origin,
        exp: Math.floor(Date.now() / 1000) + 12 * 3600,
        sub: env.VAPID_SUBJECT || 'https://luviastudiotv.pages.dev'
    })));
    const sig = new Uint8Array(await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(head + '.' + body)));
    return 'vapid t=' + head + '.' + body + '.' + bytesKeB64u(sig) + ', k=' + env.VAPID_PUBLIC_KEY;
}

async function kirimPush(sub, payload, env) {
    const body = await enkripsi(sub, JSON.stringify(payload));
    return fetch(sub.endpoint, {
        method: 'POST',
        headers: {
            'Authorization': await headerVapid(sub.endpoint, env),
            'Content-Encoding': 'aes128gcm',
            'Content-Type': 'application/octet-stream',
            'TTL': '86400',
            'Urgency': 'high'
        },
        body: body
    });
}

// ---------- GET ----------
export async function onRequestGet({ request, env }) {
    const u = new URL(request.url);
    const aksi = u.searchParams.get('aksi');
    if (aksi === 'kunci') {
        return env.VAPID_PUBLIC_KEY
            ? json({ ok: true, publicKey: env.VAPID_PUBLIC_KEY })
            : json({ ok: false, pesan: 'VAPID_PUBLIC_KEY belum dipasang di Cloudflare' }, 500);
    }
    if (aksi === 'status') {
        if (!env.PUSH_KV) return json({ ok: false, pesan: 'PUSH_KV belum terpasang' }, 500);
        const device = String(u.searchParams.get('device') || '');
        const aktif = await env.PUSH_KV.get('admin_push', 'json');
        return json({ ok: true, aktif: !!(aktif && aktif.deviceId === device), ada: !!aktif });
    }
    return json({ ok: false, pesan: 'Aksi tidak dikenal' }, 400);
}

// ---------- POST ----------
export async function onRequestPost({ request, env }) {
    if (!env.PUSH_KV || !env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY) {
        return json({ ok: false, pesan: 'PUSH_KV / VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY belum dipasang di Cloudflare' }, 500);
    }
    let b;
    try { b = await request.json(); } catch (e) { return json({ ok: false, pesan: 'Data tidak valid' }, 400); }

    try {
        if (b.aksi === 'notifikasi') return await notifikasi(b, env);
        if (b.aksi === 'aktifkan' || b.aksi === 'matikan') {
            if (!env.PUSH_ADMIN_KEY || request.headers.get('X-Admin-Key') !== env.PUSH_ADMIN_KEY) {
                return json({ ok: false, pesan: 'Kunci admin salah' }, 401);
            }
            return b.aksi === 'aktifkan' ? await aktifkan(b, env) : await matikan(b, env);
        }
    } catch (e) {
        return json({ ok: false, pesan: 'Kesalahan server: ' + (e && e.message ? e.message : e) }, 500);
    }
    return json({ ok: false, pesan: 'Aksi tidak dikenal' }, 400);
}

// Admin mengaktifkan notifikasi di satu perangkat (perangkat lama otomatis dimatikan)
async function aktifkan(b, env) {
    const deviceId = String(b.deviceId || '');
    const s = b.subscription;
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(deviceId) || !s || typeof s.endpoint !== 'string' ||
        s.endpoint.indexOf('https://') !== 0 || !s.keys || !s.keys.p256dh || !s.keys.auth) {
        return json({ ok: false, pesan: 'Data langganan tidak valid' }, 400);
    }
    const baru = { endpoint: s.endpoint, keys: { p256dh: s.keys.p256dh, auth: s.keys.auth } };

    // 1) kirim notifikasi uji ke perangkat baru (sekaligus membuktikan kunci VAPID benar)
    let tes = -1;
    try {
        const r = await kirimPush(baru, { jenis: 'tes', judul: 'Notifikasi Aktif!', isi: 'Siap menerima: support, panggilan admin, dan rating di bawah 5 bintang.', tag: 'luvia-tes' }, env);
        tes = r.status;
    } catch (e) { tes = -1; }
    if (tes < 200 || tes >= 300) {
        return json({ ok: false, pesan: 'Layanan push menolak langganan (kode ' + tes + '). Periksa kunci VAPID di Cloudflare.' }, 502);
    }

    // 2) matikan perangkat lama (jika berbeda)
    const lama = await env.PUSH_KV.get('admin_push', 'json');
    if (lama && lama.deviceId !== deviceId && lama.subscription) {
        try {
            await kirimPush(lama.subscription, { jenis: 'dimatikan', judul: 'Notifikasi dimatikan', isi: 'Notifikasi dimatikan karena ada perangkat lain yang mengaktifkannya.', tag: 'luvia-dimatikan' }, env);
        } catch (e) {}
    }

    // 3) simpan perangkat baru sebagai satu-satunya perangkat aktif
    await env.PUSH_KV.put('admin_push', JSON.stringify({ deviceId: deviceId, subscription: baru, waktu: Date.now() }));
    return json({ ok: true });
}

async function matikan(b, env) {
    const deviceId = String(b.deviceId || '');
    const aktif = await env.PUSH_KV.get('admin_push', 'json');
    if (aktif && aktif.deviceId === deviceId) await env.PUSH_KV.delete('admin_push');
    return json({ ok: true });
}

// Dipanggil halaman penonton setelah notifikasi tersimpan di Firebase
async function notifikasi(b, env) {
    const key = String(b.key || '');
    if (!/^[-A-Za-z0-9_]{10,40}$/.test(key)) return json({ ok: false, pesan: 'Kunci tidak valid' }, 400);

    // isi notifikasi dibaca langsung dari Firebase (bukan dari kiriman pengunjung)
    let n = null;
    try {
        const r = await fetch(FIREBASE_DB + '/admin_notifications/' + key + '.json');
        if (!r.ok) return json({ ok: false, pesan: 'Gagal membaca Firebase' }, 502);
        n = await r.json();
    } catch (e) { return json({ ok: false, pesan: 'Gagal membaca Firebase' }, 502); }
    if (!n || typeof n !== 'object') return json({ ok: false, pesan: 'Notifikasi tidak ditemukan' }, 404);

    if (!n.timestamp || Math.abs(Date.now() - Number(n.timestamp)) > 5 * 60 * 1000) return json({ ok: true, dilewati: 'kedaluwarsa' });

    const kat = n.kategori;
    const layak = kat === 'support' || kat === 'panggil' || (kat === 'rating' && Number(n.bintang) < 5);
    if (!layak) return json({ ok: true, dilewati: 'bukan kategori push' });

    const aktif = await env.PUSH_KV.get('admin_push', 'json');
    if (!aktif || !aktif.subscription) return json({ ok: true, dilewati: 'tidak ada perangkat aktif' });

    if (await env.PUSH_KV.get('sent:' + key)) return json({ ok: true, dilewati: 'sudah dikirim' });
    const menit = Math.floor(Date.now() / 60000);
    const rl = parseInt((await env.PUSH_KV.get('rl:' + menit)) || '0', 10);
    if (rl >= 20) return json({ ok: true, dilewati: 'dibatasi' });
    await env.PUSH_KV.put('sent:' + key, '1', { expirationTtl: 3600 });
    await env.PUSH_KV.put('rl:' + menit, String(rl + 1), { expirationTtl: 120 });

    const link = (typeof n.link === 'string' && /^admin:[A-Za-z0-9:_-]{1,100}$/.test(n.link)) ? n.link : '';
    const r = await kirimPush(aktif.subscription, {
        jenis: 'notif',
        judul: ringkas(n.tipe || 'LUVIA STUDIO TV', 60),
        isi: ringkas(n.pesan, 160),
        tag: 'luvia-' + key,
        link: link
    }, env);
    if (r.status === 404 || r.status === 410) await env.PUSH_KV.delete('admin_push');   // langganan sudah tidak berlaku
    return json({ ok: r.status >= 200 && r.status < 300, status: r.status });
}
