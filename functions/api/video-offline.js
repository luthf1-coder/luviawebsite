// Upload & hapus video offline livestream ke GitHub (folder Asset Foto/Video/)
const OWNER_DEFAULT = "luthf1-coder";
const REPO_DEFAULT = "luviawebsite";
const FOLDER = "Asset Foto/Video";
const MAX_BYTES = 20 * 1024 * 1024; // Cloudflare Pages: maksimal 25 MB per file

function kunciBenar(request, env) {
    return env.ADMIN_UPLOAD_KEY && request.headers.get("X-Admin-Key") === env.ADMIN_UPLOAD_KEY;
}

function keBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
}

function urlGithub(env, namaFile) {
    const owner = env.GH_OWNER || OWNER_DEFAULT;
    const repo = env.GH_REPO || REPO_DEFAULT;
    const path = FOLDER.split("/").concat(namaFile).map(encodeURIComponent).join("/");
    return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

function headerGithub(env, accept) {
    return {
        "Authorization": `Bearer ${env.GH_PAT_TOKEN}`,
        "Accept": accept || "application/vnd.github+json",
        "User-Agent": "luvia-admin",
        "X-GitHub-Api-Version": "2022-11-28"
    };
}

export async function onRequestPut({ request, env }) {
    if (!env.GH_PAT_TOKEN || !env.ADMIN_UPLOAD_KEY) {
        return new Response("GH_PAT_TOKEN / ADMIN_UPLOAD_KEY belum dipasang di Cloudflare", { status: 500 });
    }
    if (!kunciBenar(request, env)) return new Response("Kunci admin salah", { status: 401 });

    let asli = request.headers.get("X-File-Name") || "";
    try { asli = decodeURIComponent(asli); } catch (e) {}
    const ekstensi = (asli.split(".").pop() || "").toLowerCase();
    if (!["mp4", "webm"].includes(ekstensi)) return new Response("Hanya file .mp4 atau .webm", { status: 400 });

    const buffer = await request.arrayBuffer();
    if (buffer.byteLength === 0) return new Response("File kosong", { status: 400 });
    if (buffer.byteLength > MAX_BYTES) return new Response("Ukuran file melebihi 20 MB", { status: 413 });

    const bersih = asli.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40) || "video";
    const namaFile = `offline_${Date.now()}_${bersih}.${ekstensi}`;

    try {
        const res = await fetch(urlGithub(env, namaFile), {
            method: "PUT",
            headers: { ...headerGithub(env), "Content-Type": "application/json" },
            body: JSON.stringify({ message: `Admin: upload video offline livestream (${namaFile})`, content: keBase64(buffer) })
        });
        if (!res.ok) {
            const t = await res.text();
            return new Response(`GitHub menolak (${res.status}): ${t.slice(0, 200)}`, { status: 502 });
        }
        return Response.json({
            success: true, name: namaFile, path: `${FOLDER}/${namaFile}`,
            sizeMB: (buffer.byteLength / 1048576).toFixed(1)
        });
    } catch (err) {
        return new Response("Error jaringan: " + err.message, { status: 502 });
    }
}

export async function onRequestDelete({ request, env }) {
    if (!env.GH_PAT_TOKEN || !env.ADMIN_UPLOAD_KEY) return new Response("Kunci belum dipasang", { status: 500 });
    if (!kunciBenar(request, env)) return new Response("Kunci admin salah", { status: 401 });

    const nama = new URL(request.url).searchParams.get("name") || "";
    if (!/^offline_[A-Za-z0-9_-]+\.(mp4|webm)$/.test(nama)) return new Response("Nama file tidak valid", { status: 400 });

    try {
        const info = await fetch(urlGithub(env, nama), { headers: headerGithub(env, "application/vnd.github.object+json") });
        if (info.status === 404) return Response.json({ success: true, note: "File sudah tidak ada" });
        if (!info.ok) return new Response("Gagal membaca file di GitHub: " + info.status, { status: 502 });
        const { sha } = await info.json();

        const del = await fetch(urlGithub(env, nama), {
            method: "DELETE",
            headers: { ...headerGithub(env), "Content-Type": "application/json" },
            body: JSON.stringify({ message: `Admin: hapus video offline (${nama})`, sha })
        });
        if (!del.ok) return new Response("GitHub menolak hapus: " + del.status, { status: 502 });
        return Response.json({ success: true });
    } catch (err) {
        return new Response("Error jaringan: " + err.message, { status: 502 });
    }
}
