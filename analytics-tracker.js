// ==========================================
// ANALYTICS TRACKER - LUVIA STUDIO TV
// File BARU. Dimuat setelah videos-data.js di setiap halaman publik.
// Mencatat: pengunjung harian (baru/berulang), kunjungan per halaman,
// tayangan video per hari, tayangan postingan per hari, dan waktu tonton.
// ==========================================
(function () {
    'use strict';
    if (typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length) return;

    // Browser admin tidak ikut dihitung (ditandai saat login admin)
    try { if (localStorage.getItem('luvia_no_track') === '1') return; } catch (e) { return; }

    var db = firebase.database();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var d0 = new Date();
    var hariIni = d0.getFullYear() + '-' + pad(d0.getMonth() + 1) + '-' + pad(d0.getDate());
    var aman = function (s) { return String(s).replace(/[^a-zA-Z0-9_-]/g, '_'); };
    var tambah = function (path, n) {
        db.ref(path).transaction(function (c) { return (c || 0) + n; });
    };

    // ID anonim per perangkat + tanggal pertama kali terlihat
    var vid, firstDate;
    try {
        vid = localStorage.getItem('luvia_vid');
        firstDate = localStorage.getItem('luvia_first');
        if (!vid || !firstDate) {
            vid = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
            firstDate = hariIni;
            localStorage.setItem('luvia_vid', vid);
            localStorage.setItem('luvia_first', firstDate);
        }
    } catch (e) { return; }

    // Nama halaman dari URL
    var page = (location.pathname.split('/').pop() || 'index').replace('.html', '') || 'index';
    if (page === 'admin') return;
    var daftar = ['index', 'videos', 'watch', 'posts', 'post', 'program', 'livestream', 'support'];
    if (daftar.indexOf(page) === -1) page = 'lainnya';

    // 1. Pengunjung harian (dicatat sekali per hari per perangkat)
    try {
        if (localStorage.getItem('luvia_seen_day') !== hariIni) {
            db.ref('analytics/daily_visitors/' + hariIni + '/' + vid).set(firstDate);
            localStorage.setItem('luvia_seen_day', hariIni);
        }
    } catch (e) {}

    // 2. Kunjungan per halaman (tiap halaman dibuka = +1)
    tambah('analytics/page_hits/' + hariIni + '/' + page + '/' + vid, 1);

    var itemId = new URLSearchParams(location.search).get('id');

    // 3. Tayangan postingan per hari
    if (page === 'post' && itemId) {
        tambah('analytics/post_views_daily/' + hariIni + '/' + aman(itemId), 1);
    }

    // 4. Tayangan video per hari + waktu tonton
    if (page === 'watch') {
        var vidId = aman(itemId || 'video1');
        tambah('analytics/video_views_daily/' + hariIni + '/' + vidId, 1);
        tambah('analytics/video_watch/' + hariIni + '/' + vidId + '/sessions', 1);

        var detik = 0, total = 0, MAKS = 10800; // maksimal 3 jam per sekali buka halaman
        setInterval(function () {
            if (document.visibilityState !== 'visible' || total >= MAKS) return;
            // Pemutar Plyr (MP4): hitung hanya saat benar-benar diputar.
            // Pemutar iframe (YouTube/Drive/dll): dihitung selama halaman terbuka & terlihat.
            var sedangPutar = window.player ? !!window.player.playing : true;
            if (sedangPutar) { detik += 1; total += 1; }
        }, 1000);

        var kirim = function () {
            if (detik > 0) {
                var n = detik; detik = 0;
                tambah('analytics/video_watch/' + hariIni + '/' + vidId + '/sec', n);
            }
        };
        setInterval(kirim, 30000);
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') kirim();
        });
        window.addEventListener('pagehide', kirim);
    }
})();
