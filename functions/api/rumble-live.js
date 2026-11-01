function resp(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
}

export async function onRequestGet(context) {
    const key = context.env.RUMBLE_API_KEY;
    if (!key) return resp({ error: "RUMBLE_API_KEY belum dipasang" }, 500);

    try {
        const res = await fetch(
            `https://rumble.com/-livestream-api/get-data?key=${encodeURIComponent(key)}`,
            { headers: { "User-Agent": "LuviaStudioBackupBot/1.0 (+https://luviastudiotv.pages.dev)", "Accept": "application/json" } }
        );
        const text = await res.text();
        if (!res.ok) return resp({ error: "Rumble menjawab " + res.status, cuplikan: text.slice(0, 120) }, 502);

        let data;
        try { data = JSON.parse(text); } catch (e) { return resp({ error: "Jawaban Rumble bukan JSON" }, 502); }

        const list = Array.isArray(data.livestreams) ? data.livestreams : [];
        return resp({
            username: data.username || "",
            livestreams: list.map(l => ({
                id: String(l.id),
                title: l.title || "",
                created_on: l.created_on || "",
                is_live: !!l.is_live,
                watching_now: l.watching_now || 0
            }))
        });
    } catch (err) {
        return resp({ error: err.message }, 500);
    }
}
