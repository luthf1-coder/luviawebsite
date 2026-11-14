// ==========================================
// CEK STATUS LIVE KICK (lewat server Cloudflare)
// Penonton memanggil /api/kick-status, bukan kick.com langsung,
// jadi DNS/jaringan penonton tidak berpengaruh.
// ==========================================
const KICK_USERNAME = "luthfi1234321";

export async function onRequestGet() {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://kick.com/"
    };
    const endpoints = [
        "https://kick.com/api/v2/channels/" + KICK_USERNAME,
        "https://kick.com/api/v1/channels/" + KICK_USERNAME
    ];

    for (const url of endpoints) {
        try {
            const res = await fetch(url, { headers: headers, cf: { cacheTtl: 15, cacheEverything: true } });
            if (!res.ok) continue;
            const data = await res.json();
            const ls = data && data.livestream;
            const live = !!(ls && ls.is_live !== false);
            return kirimJson({
                ok: true,
                live: live,
                viewers: live ? (ls.viewer_count || 0) : 0,
                mulai: live ? (ls.created_at || ls.start_time || "") : "",
                playback: live ? (data.playback_url || ls.playback_url || "") : ""
            }, 200);
        } catch (e) { /* coba endpoint berikutnya */ }
    }
    return kirimJson({ ok: false }, 502);
}

function kirimJson(obj, status) {
    return new Response(JSON.stringify(obj), {
        status: status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": status === 200 ? "public, max-age=15" : "no-store"
        }
    });
}
