// File ini wajib ada agar browser HP (Android/iOS) 
// mengizinkan memunculkan Pop-Up Notifikasi Sistem.

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Jika notifikasi diklik, arahkan/fokuskan ke halaman admin
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.indexOf('admin.html') !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('admin.html');
            }
        })
    );
});
