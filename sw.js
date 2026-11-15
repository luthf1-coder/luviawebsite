self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(clients.claim());
});

// Notifikasi masuk dari server (tetap bekerja walau halaman admin ditutup)
self.addEventListener('push', function (event) {
    let d = {};
    try { d = event.data ? event.data.json() : {}; } catch (e) { d = {}; }

    const ikon = new URL('Asset Foto/Thumbnimail .png', self.registration.scope).href;
    const opsi = {
        body: d.isi || 'Ada aktivitas baru. Buka halaman admin.',
        icon: ikon,
        badge: ikon,
        vibrate: [200, 100, 200],
        tag: d.tag || undefined,
        data: { link: d.link || '' }
    };

    event.waitUntil((async function () {
        await self.registration.showNotification(d.judul || 'LUVIA STUDIO TV', opsi);
        if (d.jenis === 'dimatikan') {
            const daftar = await clients.matchAll({ type: 'window', includeUncontrolled: true });
            daftar.forEach(function (c) { c.postMessage({ type: 'push-dimatikan' }); });
        }
    })());
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const link = (event.notification.data && event.notification.data.link) || '';
    const dalam = link.indexOf('admin:') === 0 ? link : '';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.indexOf('admin.html') !== -1 && 'focus' in client) {
                    if (dalam) client.postMessage({ type: 'buka-tautan', link: dalam });
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(dalam ? 'admin.html#t=' + encodeURIComponent(dalam) : 'admin.html');
            }
        })
    );
});
