export async function onRequestPut(context) {
    const { request, env } = context;

    // Ambil nama file dari header (dikirim oleh frontend admin.html)
    const fileName = request.headers.get('X-File-Name');
    if (!fileName) return new Response("Nama file tidak ditemukan", { status: 400 });

    // Ambil API Key dari Brankas Cloudflare (Environment Variables)
    const accessKey = env.IA_ACCESS_KEY;
    const secretKey = env.IA_SECRET_KEY;

    if (!accessKey || !secretKey) {
        return new Response("Kunci API belum dipasang di setelan Cloudflare", { status: 500 });
    }

    // Bikin nama item unik untuk Internet Archive
    const uniqueBucket = "luvia-post-" + Date.now();
    const safeName = fileName.replace(/[^a-zA-Z0-9.]/g, '_');
    const url = `https://s3.us.archive.org/${uniqueBucket}/${safeName}`;

    // Teruskan file dari Browser -> Cloudflare -> Internet Archive
    const iaRequest = new Request(url, {
        method: 'PUT',
        body: request.body, // Alirkan file langsung
        headers: {
            'Authorization': `LOW ${accessKey}:${secretKey}`,
            'x-archive-auto-make-bucket': '1',
            'x-archive-meta-title': 'Luvia Post Media',
            'Content-Type': request.headers.get('Content-Type') || 'application/octet-stream'
        },
        duplex: 'half' // Wajib untuk serverless streaming
    });

    try {
        const iaResponse = await fetch(iaRequest);
        if (iaResponse.ok) {
            // Jika sukses, kembalikan Link Asli Internet Archive ke Browser
            const finalUrl = `https://archive.org/download/${uniqueBucket}/${safeName}`;
            return new Response(JSON.stringify({ success: true, url: finalUrl }), { status: 200 });
        } else {
            return new Response("Ditolak oleh Internet Archive: " + iaResponse.status, { status: iaResponse.status });
        }
    } catch (err) {
        return new Response("Error Jaringan Cloudflare: " + err.message, { status: 500 });
    }
}