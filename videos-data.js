// ==========================================
// 1. KONFIGURASI FIREBASE REALTIME DATABASE
// ==========================================
// Ganti nilai firebaseConfig di bawah ini dengan konfigurasi Firebase milikmu!
const firebaseConfig = {
  apiKey: "AIzaSyDQfY4Q3ulm0NOZyzSdbzYb53SNCFCZrj0",
  authDomain: "luvia-studio-tv.firebaseapp.com",
  databaseURL: "https://luvia-studio-tv-default-rtdb.firebaseio.com",
  projectId: "luvia-studio-tv",
  storageBucket: "luvia-studio-tv.firebasestorage.app",
  messagingSenderId: "197959268371",
  appId: "1:197959268371:web:009210b197a4a4246d27e6",
  measurementId: "G-51NHLLES6V"
};

// Inisialisasi Firebase jika library Firebase SDK sudah terunduh di HTML
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ===== PUSAT GAMBAR (ganti gambar cukup di sini) =====
const IMG = {
    logoBulat:       "Asset Foto/Thumbnimail .png",
    logoNavbar:      "Asset Foto/Logo Luvia Insight Verse Studios.png",
    banner:          "Asset Foto/Banner Thumbnail.png",
    bannerProgram:   "Asset Foto/Thumbnimail  Banner YT.png",
    liveCard:        "Asset Foto/live stream.png",
    streamOffline:   "Asset Foto/stream offline.png",
    vodLive:         "Asset Foto/Thumbnimail_VOD_LIVE.png",
    sosialYoutube:   "Asset Foto/logo/2.png",
    sosialInstagram: "Asset Foto/logo/1.png",
    sosialTiktok:    "Asset Foto/logo/3.png",
    sosialUvideo:    "Asset Foto/logo/5.png"
};

// Browser ini milik admin? (ditandai saat login admin)
const IS_ADMIN_BROWSER = (function () {
    try { return localStorage.getItem('luvia_admin_mode') === '1'; } catch (e) { return false; }
})();
function setModeAdmin(aktif) {
    try {
        if (aktif) localStorage.setItem('luvia_admin_mode', '1');
        else localStorage.removeItem('luvia_admin_mode');
    } catch (e) {}
}
// Izin sekali-buka (20 detik) saat admin menekan sebuah video dari daftar admin
const IZIN_PRATINJAU = (function () {
    try { const t = Number(localStorage.getItem('luvia_preview_ok') || 0); return t > 0 && (Date.now() - t) < 20000; }
    catch (e) { return false; }
})();
function bukaPratinjau(url) {
    try { localStorage.setItem('luvia_preview_ok', String(Date.now())); } catch (e) {}
    window.open(url, '_blank');
    return false;
}


// Pengunjung baru? Dihitung SEKARANG, sebelum analytics-tracker.js memberi tanda
const PENGUNJUNG_BARU = (function () {
    try {
        const sudah = localStorage.getItem('luvia_first') || localStorage.getItem('luvia_popup_first');
        if (!sudah) {
            localStorage.setItem('luvia_popup_first', String(Date.now()));
            sessionStorage.setItem('luvia_sesi_baru', '1');
        }
        return sessionStorage.getItem('luvia_sesi_baru') === '1';
    } catch (e) { return false; }
})();

// IKON GAMBAR (SVG) - sumber: Asset Foto/icons.svg
function icon(name, extraClass) {
    return '<svg class="ic ' + (extraClass || '') + '" aria-hidden="true"><use href="Asset%20Foto/icons.svg#' + name + '"></use></svg>';
}

// Pusat Data Video
const videoList = [
    {
    "id": "kick_vod_134882134",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "IMG:vodLive",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/1URGaJsj7tcV4EXXJeWJUGJQNkICdFIbv/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=1URGaJsj7tcV4EXXJeWJUGJQNkICdFIbv",
    "description": "VOD LS TV pada 29 Oktober 2026. Perhatian! Untuk menonton VOD, Disarankan untuk opsi Menonton full screen. Agar Kontrol Video tidak terhalang Oleh Bingkai Player!!!. Report di kolom komentar Jika ada error atau Video tidak dapat Diputar!!.",
    "genre": "Video On Demand",
    "uploadDate": "2026-10-29"
},
    {
    "id": "kick_vod_133969675",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "IMG:vodLive",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/1cWPBhueR2YyeZfGRyA4QtMqhOd_m0pDi/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=1cWPBhueR2YyeZfGRyA4QtMqhOd_m0pDi",
    "description": "VOD LS TV pada 24 Oktober 2026. Perhatian! Untuk menonton VOD, Disarankan untuk opsi Menonton full screen. Agar Kontrol Video tidak terhalang Oleh Bingkai Player!!!. Report di kolom komentar Jika ada error atau Video tidak dapat Diputar!!.",
    "genre": "Video On Demand",
    "uploadDate": "2026-10-24"
},
    {
    "id": "kick_vod_129368659",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "IMG:vodLive",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/1F1cEEiDLuJWyoTgciYURIFWhbg7mt2oF/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=1F1cEEiDLuJWyoTgciYURIFWhbg7mt2oF",
    "description": "VOD LS TV pada 27 September 2026. Perhatian! Untuk menonton VOD, Disarankan untuk opsi Menonton full screen. Agar Kontrol Video tidak terhalang Oleh Bingkai Player!!!. Report di kolom komentar Jika ada error atau Video tidak dapat Diputar!!.",
    "genre": "Video On Demand",
    "uploadDate": "2026-09-27"
},
    {
    "id": "kick_vod_127079161",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "IMG:vodLive",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/1DL-OUZH1G6ku0dYnyaJnxItqWbhghktQ/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=1DL-OUZH1G6ku0dYnyaJnxItqWbhghktQ",
    "description": "VOD LS TV pada 13 September 2026. Perhatian! Untuk menonton VOD, Disarankan untuk opsi Menonton full screen. Agar Kontrol Video tidak terhalang Oleh Bingkai Player!!!. Report di kolom komentar Jika ada error atau Video tidak dapat Diputar!!.",
    "genre": "Video On Demand",
    "uploadDate": "2026-09-13"
},
    {
    "id": "kick_vod_126911541",
    "title": "BIOSKOP LIBURAN: DETECTIVE CONAN OVA 12: THE MIRACLE OF EXCALIBUR - VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "https://ia801002.us.archive.org/22/items/black-and-red-modern-movie-night-facebook-post-1/Black%20and%20Red%20Modern%20Movie%20Night%20Facebook%20Post%20%281%29.png",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/1xXdEKLKqSEZaIn3c6EFYNNLI2WTYD39D/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=1xXdEKLKqSEZaIn3c6EFYNNLI2WTYD39D",
    "description": "VOD LS TV pada 12 September 2026. Perhatian! Untuk menonton VOD, Disarankan untuk opsi Menonton full screen. Agar Kontrol Video tidak terhalang Oleh Bingkai Player!!!. Report di kolom komentar Jika ada error atau Video tidak dapat Diputar!!.",
    "genre": "Video On Demand",
    "uploadDate": "2026-09-12"
},
    {
    "id": "kick_vod_124783423",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "IMG:vodLive",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/13rV-LjZl1VW8z2ZLbphqWIeJDA1XneVu/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=13rV-LjZl1VW8z2ZLbphqWIeJDA1XneVu",
    "description": "VOD LS TV",
    "genre": "Video On Demand",
    "uploadDate": "2026-08-15"
},
    {
    "id": "kick_vod_123490654",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "IMG:vodLive",
    "sources": [],
    "driveEmbed": "https://drive.google.com/file/d/1GDOsTvewAmRzVIY1wyaZV2GdPk7-DMB4/preview",
    "youtubeId": "",
    "rumbleEmbed": "",
    "downloadUrl": "https://drive.google.com/uc?export=download&id=1GDOsTvewAmRzVIY1wyaZV2GdPk7-DMB4",
    "description": "VOD LS TV. Disarakan saat memutar video ini dalam mode fullscreen!",
    "genre": "Video On Demand",
    "uploadDate": "2026-08-18"
},
    {
        id: "video1",
        title: "Special Dokumenter for MOVAST & VROEG SAMEN While in Al-Bahjah Cianjur",
        defaultViews: 0,
        thumb: "https://img.youtube.com/vi/U6N_8dUF30g/maxresdefault.jpg", 
        archiveSrc: "",
        driveEmbed: "",
        youtubeId: "U6N_8dUF30g",
        rumbleEmbed: "",
        downloadUrl: "https://www.ssyoutube.com/watch?v=U6N_8dUF30g", 
        description: "Semua tentang sebuah Kebersamaan dan Kebahagiaan Angkatan 7 (SMPIQu) & dan Angkatan 1 (SMAIQu) di LPD Al-Bahjah Cianjur",
        genre: "MVS - AL-BAHJAH CIANJUR",
        uploadDate: "2026-07-15"
    },
    {
        id: "video2",
        title: "#part2 Special Dokumenter for MOVAST & VROEG SAMEN While in Al-Bahjah Cianjur (Re-Edited)",
        defaultViews: 0,
        thumb: "https://img.youtube.com/vi/sUNYcOKjw-w/maxresdefault.jpg",
        archiveSrc: "",
        driveEmbed: "",
        youtubeId: "sUNYcOKjw-w",
        rumbleEmbed: "",
        downloadUrl: "https://www.ssyoutube.com/watch?v=sUNYcOKjw-w",
        description: "Semua tentang sebuah Kebersamaan dan Kebahagiaan Angkatan 7 (SMPIQu) & dan Angkatan 1 (SMAIQu) di LPD Al-Bahjah Cianjur",
        genre: "MVS - AL-BAHJAH CIANJUR",
        uploadDate: "2026-07-20"
    },
    // {
    //      id: "video3",
    //      title: "Dokumenter Spesial Multi-Resolusi (Archive.org)",
    //      defaultViews: 45,
    //      thumb: "Asset Foto/Thumbnimail  Banner YT.png",
    //      // Multi-resolusi khusus Archive.org / Direct MP4
    //      sources: [
    //          { src: "https://archive.org/download/nama_item_kamu/video_360p.mp4", size: 360, type: "video/mp4" },
    //          { src: "https://archive.org/download/nama_item_kamu/video_720p.mp4", size: 720, type: "video/mp4" },
    //          { src: "https://archive.org/download/nama_item_kamu/video_1080p.mp4", size: 1080, type: "video/mp4" }
    //      ],
    //      description: "Sesi dokumenter eksklusif dengan pilihan resolusi pemutar dan tombol unduh sesuai kualitas."
    // },
    // {
    //      id: "video4",
    //      title: "REKAMAN LIVE SPECIAL RUMBLE",
    //      defaultViews: 50,
    //      thumb: "Asset Foto/live stream.png",
    //      archiveSrc: "",
    //      driveEmbed: "",
    //      youtubeId: "",
    //      rumbleEmbed: "https://rumble.com/embed/vID unik/kode identitas video milikmu/",
    //      // Solusi 2: Direct MP4 Link dari Dashboard Rumble
    //      downloadUrl: "https://ak.rumble.com/vID unik/kode identitas video milikmu.mp4", 
    //      description: "Hasil rekaman siaran langsung dari platform Rumble."
    // },
    // {
    //      id: "video5",
    //      title: "Contoh Video Google Drive",
    //      defaultViews: 10,
    //      thumb: "Asset Foto/Thumbnimail  Banner YT.png",
    //      archiveSrc: "",
    //      driveEmbed: "https://drive.google.com/file/d/ID_FILE_GDRIVE/preview",
    //      youtubeId: "",
    //      rumbleEmbed: "",
    //      // Solusi Direct Download Google Drive (Format export=download)
    //      downloadUrl: "https://drive.google.com/uc?export=download&id=ID_FILE_GDRIVE",
    //      description: "Video sampel yang tersimpan di Google Drive."
    // },
    {
        id: "video6",
        title: "Detective Conan: Episode One - The Great Detective Turned Small Dubbing Indonesia",
        defaultViews: 10,
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfr_mYXblDP9MuGL50PNh-UmHI55f5G0lsmSXRfxTEA-lCf_Vr3Otg2_t0&s=10",
        archiveSrc: "https://cdn.dubbindo.site/driveduo/uploads/34eeded7-a628-47a1-90ff-13fb45a4ad83/34eeded7-a628-47a1-90ff-13fb45a4ad83",
        driveEmbed: "",
        youtubeId: "",
        rumbleEmbed: "",
        customEmbed: "",
        downloadUrl: "https://cdn.dubbindo.site/driveduo/uploads/34eeded7-a628-47a1-90ff-13fb45a4ad83/34eeded7-a628-47a1-90ff-13fb45a4ad83",
        description: "Detective Conan Spesial",
        genre: "Anime",
        uploadDate: "2026-08-25"
    },
    {
        id: "video7",
        title: "Tunggu Aku Sukses Nanti (2026)",
        defaultViews: 10,
        thumb: "https://www.citycineplex.com/images/poster/f02659.jpg",
        archiveSrc: "https://cdn.dubbindo.site/dubbing/upload/videos/2026/09/QFNaG5RGRLhKoxssfTe8_06_9564b82870288455492e54153b066c9d_video_720p_converted.mp4",
        driveEmbed: "",
        youtubeId: "",
        rumbleEmbed: "",
        customEmbed: "",
        downloadUrl: "",
        description: "Tunggu Aku Sukses Nanti adalah film komedi keluarga Indonesia tahun 2026 yang disutradarai oleh Naya Anindita. Film ini dibintangi oleh Ardit Erwandha, Lulu Tobing, dan Ariyo Wahab. Menceritakan tentang Arga yang tengah berjuang menuju kesuksesan demi menaikkan martabat dan perekonomian keluarganya.",
        genre: "Film Komedi",
        uploadDate: "2026-09-12"
    },
    {
        id: "video8",
        title: "Shock Wave (2017) Dubbing Indonesia",
        defaultViews: 0,
        thumb: "https://i.ytimg.com/vi/h7UKJmjmclg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBb4nNt1mhNoD2feam3AVm_cT5kjA",
        archiveSrc: "https://cdn.dubbindo.site/dubbing/upload/videos/2026/09/x4Uo98IHHPoWdRFxNw9n_11_22af45dad554e422f2430fd5ee212625_video_720p_converted.mp4",
        driveEmbed: "",
        youtubeId: "",
        rumbleEmbed: "",
        customEmbed: "",
        downloadUrl: "",
        description: "Shock Wave adalah film Hong kong produksi tahun 2017 bergenre laga thriller yang disutradarai sekaligus ditulis skenarionya oleh Herman Yau, diproduseri dan dibintangi oleh Andy Lau. Film ini menandai kerja sama ketiga antara Yau dan Lau setelah film Don't Fool Me dan Fascination Amour.",
        genre: "Film Action",
        uploadDate: "2026-09-05"
    },
  {
        id: "video9",
        title: "Vanguard (2020) Dubbing Indonesia - HD Remastered",
        defaultViews: 0,
        thumb: "https://static.promediateknologi.id/crop/0x0:0x0/1200x0/webp/photo/p1/04/2024/07/29/Mega-Film-Asia-Indosiar-Sinopsis-Vanguard-2020-Pertempuran-Jackie-Chan-Melawan-Organisasi-Kriminal-Internasional-950592356.jpg",
        archiveSrc: "https://cdn.dubbindo.site/dubbing/upload/videos/2026/09/QPgr7Fb9Rgrpfj2yHisI_13_a2f89b7c09d8a56e798d6de374cc2334_video_720p_converted.mp4",
        driveEmbed: "",
        youtubeId: "",
        rumbleEmbed: "",
        customEmbed: "",
        downloadUrl: "https://play.indodub.my.id/d/dmjxkA",
        description: "Seorang akuntan menaruh harapan kepada organisasi misterius bernama Vanguard setelah dirinya menjadi sasaran kelompok paling mematikan di dunia.",
        genre: "Film Action",
        uploadDate: "2026-09-17"
    },
    {
        id: "video10",
        title: "AFTERMOVIE - TASYAKUR KELULUSAN SANTRI SMPIQu & SMAIQu AL-BAHJAH CIANJUR (2023-2026) | LUVIA TV",
        defaultViews: 0,
        thumb: "https://img.youtube.com/vi/vJgtIa4FtCE/maxresdefault.jpg",
        archiveSrc: "",
        driveEmbed: "",
        youtubeId: "vJgtIa4FtCE",
        rumbleEmbed: "",
        customEmbed: "",
        downloadUrl: "",
        description: "Credit/Property: TIM DAKWAH (MEDIA) AL-BAHJAH CIANJUR ©2026 - TIM DAKWAH AL-BAHJAH CIANJUR & LUVIA TV | MOVAST MEDIA",
        genre: "MVS - AL-BAHJAH CIANJUR",
        uploadDate: "2026-09-26"
    },
];


// ===== NAMA IKON (ganti di sini jika nama di icons.svg-mu berbeda) =====
const IKON = {
    suka: 'ig-heart',      sukaIsi: 'ig-heart-fill',
    komentar: 'ig-comment', bagikan: 'ig-send',   kirim: 'ig-send',
    simpan: 'ig-bookmark', simpanIsi: 'ig-bookmark-fill',
    lainnya: 'ig-more',    putar: 'ig-play',      video: 'ig-video',
    tutup: 'ig-close',     edit: 'ig-edit',       hapus: 'ig-trash',
    balas: 'ig-reply',     salin: 'ig-link',      centang: 'ig-verified',
    jam: 'ig-clock',       unduh: 'ig-download',  grid: 'ig-grid',
    suaraOn: 'ig-volume',  suaraOff: 'ig-mute',
    jempol: 'ig-thumb',    jempolIsi: 'ig-thumb-fill',
    perisai: 'ig-shield',
    bintang: 'ig-star',   bintangIsi: 'ig-star-fill',
    beranda: 'ig-home', tv: 'ig-tv', siaran: 'ig-live', bantuan: 'ig-help', info: 'ig-info', panah: 'ig-chevron-down',
    dilihat: 'eye', kembali: 'arrow-left', maju: 'arrow-right'
};

// ===== IDENTITAS ADMIN & NAMA YANG DILARANG UNTUK PENGUNJUNG =====
const ADMIN_PROFIL = { nama: "luviatv" };
const NAMA_TERLARANG = ["admin", "administrator", "moderator", "cs luvia", "luvia studio", "admin luvia", "admin luvia tv", "luvia tv"];

// ===== PUSAT AVATAR / FOTO PROFIL =====
const AVATAR = {
    // "huruf"  = lingkaran berwarna + huruf depan nama
    // "gambar" = semua penonton memakai gambarDefault
    // "acak"   = gambar dari daftar "pilihan" (konsisten per nama)
    mode: "huruf",
    gambarDefault: IMG.logoBulat,
    gambarAdmin:   IMG.logoBulat,
    pilihan: [],
    warna: ["#ff914d", "#b794ff", "#ffd166", "#6ee7b7", "#7dd3fc", "#f9a8d4", "#fca5a5"]
};

function hashAvatar(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
}
function warnaAvatar(nama) { return AVATAR.warna[hashAvatar(String(nama || '')) % AVATAR.warna.length]; }

// opsi: { kelas, ukuran (px), admin: true }
function buatAvatar(nama, opsi) {
    opsi = opsi || {};
    const kelas = opsi.kelas || '';
    const ukuran = opsi.ukuran ? 'width:' + opsi.ukuran + 'px;height:' + opsi.ukuran + 'px;' : '';
    const n = String(nama || '').trim();

    if (opsi.admin) return '<img class="av av-admin ' + kelas + '" src="' + AVATAR.gambarAdmin + '" alt="" style="' + ukuran + '">';
    if (AVATAR.mode === 'huruf' && n) {
        const huruf = escHtmlGlobal(Array.from(n)[0].toUpperCase());
        return '<span class="av av-huruf ' + kelas + '" style="' + ukuran + 'background:' + warnaAvatar(n) + '">' + huruf + '</span>';
    }
    if (AVATAR.mode === 'acak' && n && AVATAR.pilihan.length) {
        return '<img class="av ' + kelas + '" src="' + AVATAR.pilihan[hashAvatar(n) % AVATAR.pilihan.length] + '" alt="" style="' + ukuran + '">';
    }
    return '<img class="av ' + kelas + '" src="' + AVATAR.gambarDefault + '" alt="" style="' + ukuran + '">';
}

// ===== ATURAN NAMA & IDENTITAS PENGIRIM =====
function normalisasiNama(s) {
    const peta = { '4': 'a', '@': 'a', '1': 'i', '!': 'i', '|': 'i', '0': 'o', '3': 'e', '5': 's', '$': 's', '7': 't' };
    return String(s || '').toLowerCase().replace(/[4@1!|035$7]/g, c => peta[c]).replace(/[^a-z]/g, '');
}
function namaTerlarang(nama) {
    if (IS_ADMIN_BROWSER) return false;
    const x = normalisasiNama(nama);
    return NAMA_TERLARANG.some(k => x.indexOf(normalisasiNama(k)) !== -1);
}
// Dipakai semua form komentar/chat.  Mengembalikan { ok, nama, isAdmin, pesan }
function siapkanPengirim(namaInput) {
    if (IS_ADMIN_BROWSER) return { ok: true, nama: ADMIN_PROFIL.nama, isAdmin: true };
    const nama = String(namaInput || '').trim().slice(0, 24);
    if (!nama) return { ok: false, pesan: 'Isi nama pengguna dulu ya.' };
    if (namaTerlarang(nama)) return { ok: false, pesan: 'Nama itu tidak boleh dipakai (khusus admin). Silakan pakai nama pengguna lain.' };
    return { ok: true, nama: nama, isAdmin: false };
}
function centangBiru() {
    return '<span class="centang-biru" title="Terverifikasi">' + icon(IKON.centang) + '</span>';
}
function lencanaAdmin() {
    return centangBiru() + '<span class="lencana-admin">ADMIN</span>';
}  
// Mode admin: sembunyikan kolom nama, isi otomatis
function modeAdminForm(inputId) {
    if (!IS_ADMIN_BROWSER) return;
    const inp = document.getElementById(inputId);
    if (!inp) return;
    inp.required = false;
    inp.value = ADMIN_PROFIL.nama;
    inp.style.display = 'none';
    if (!inp.parentNode.querySelector('.chip-admin')) {
        const chip = document.createElement('div');
        chip.className = 'chip-admin';
        chip.innerHTML = icon(IKON.perisai) + ' Mode Admin: tampil sebagai <b>' + escHtmlGlobal(ADMIN_PROFIL.nama) + '</b>';
        inp.parentNode.insertBefore(chip, inp);
    }
}

// ===== UTILITAS TAMPILAN =====
function terapkanIkon(root) {
    (root || document).querySelectorAll('[data-ikon]').forEach(el => {
        if (el.dataset.ok === '1') return;
        el.dataset.ok = '1';
        el.innerHTML = icon(IKON[el.dataset.ikon] || el.dataset.ikon);
    });
}
function tampilToast(pesan) {
    const t = document.createElement('div');
    t.className = 'toast-luvia';
    t.textContent = pesan;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('tampil'), 10);
    setTimeout(() => { t.classList.remove('tampil'); setTimeout(() => t.remove(), 300); }, 2200);
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-avatar]').forEach(el => {
        el.src = (el.dataset.avatar === 'admin') ? AVATAR.gambarAdmin : AVATAR.gambarDefault;
    });
    terapkanIkon();
});


// ==========================================
// PUSAT KOMANDO GLOBAL WEBSITE LUVIA
// ==========================================
const webConfig = {
    namaWebsite: "Luvia Insight Verse",
    teksFooter: "© 2026 Luvia Insight Verse (Product by Luvia Studio TV). All Right Reserved",
    logoNavbar: IMG.logoNavbar, // <--- TAMBAHAN LOGO NAVBAR DI SINI
    
    // DAFTAR MENU SIDEBAR
    //   ikon  = nama kunci di objek IKON (atau id langsung dari icons.svg)
    //   rail  = true  -> ikut tampil di bilah ikon kiri (laptop/TV) dan bar bawah (HP)
    //   pendek= nama singkat untuk bar bawah HP
    menuSidebar: [
        { nama: "Home",           pendek: "Home",    link: "index.html",               ikon: "beranda", rail: true },
        { nama: "Videos",         pendek: "Videos",  link: "videos.html",              ikon: "video",   rail: true },
      { nama: "Postingan",         pendek: "Postingan",  link: "posts.html",              ikon: "putar",   rail: true },
        { nama: "Program TV",     pendek: "Program", link: "index.html#projects",      ikon: "tv",      rail: true },
        { nama: "Live TV",        pendek: "Live",    link: "index.html#livestreaming", ikon: "siaran",  rail: true },
        { nama: "Help Center",    pendek: "Bantuan", link: "support.html",             ikon: "bantuan", rail: true },
        { nama: "About Us",       pendek: "Tentang", link: "about.html",               ikon: "info",    rail: false }
    ],

    // TEKS TAUTAN DI BAWAH MENU (otomatis dipisah dengan  " · ").
    //   link  = tujuan,   baru: true = buka di tab baru,   aksi: "rating" = membuka pop-up rating
    linkTeks: [
        { nama: "Beri Rating",  aksi: "rating" },
        { nama: "Help Center",  link: "support.html" },
        { nama: "About Us", link: "about.html" },
        { nama: "YouTube",      link: "https://www.youtube.com/@luthfi-fx", baru: true }
    ],

    // DAFTAR SOSIAL MEDIA
    sosialMedia: [
        { nama: "YouTube", link: "https://www.youtube.com/@luthfi-fx", gambar: IMG.sosialYoutube },
        { nama: "Instagram", link: "https://www.instagram.com/fauzanlathif_86", gambar: IMG.sosialInstagram },
        { nama: "TikTok", link: "https://www.tiktok.com/@fauzan_lathif", gambar: IMG.sosialTiktok },
        { nama: "UVideo", link: "https://www.dubbindo.site/@luviastudioofficialtv", gambar: IMG.sosialUvideo }
    ]
};

// Fungsi Global untuk Membuka/Menutup Sidebar dari Semua Halaman
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
};

// Skrip Otomatis Penggerak Website
document.addEventListener('DOMContentLoaded', () => {

// 0. CETAK NAVBAR OTOMATIS DARI PUSAT KOMANDO
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <div class="container nav-container">
                <!-- 1. Tombol Hamburger -->
                <button class="hamburger-menu" onclick="toggleSidebar()" title="Menu">${icon('menu')}</button>
                
                <!-- 2. Logo Luvia -->
                <a href="index.html" title="Halaman Utama" style="display: flex; align-items: center; margin-right: 15px;">
                    <img src="${webConfig.logoNavbar}" alt="Logo Luvia" style="height: 34px; width: auto; object-fit: contain;">
                </a>
                
                <!-- 3. Tombol Riwayat (Back/Forward) -->
                <div class="nav-history-controls">
                    <button onclick="history.back()" class="btn-nav-history" title="Kembali">${icon('arrow-left')}</button>
                    <button onclick="history.forward()" class="btn-nav-history" title="Maju">${icon('arrow-right')}</button>
                </div>
                
                <!-- 4. Kolom Pencarian & Fitur Live Search -->
                <form class="nav-search" id="navSearchForm" onsubmit="return false;">
                    <input type="text" id="navSearchInput" placeholder="Search..." aria-label="Cari" autocomplete="off">
                    <button type="submit">${icon('search')}</button>
                    <div class="search-dropdown-list" id="searchDropdownList"></div>
                </form>
            </div>
        `;
    }
    
    // 1. CETAK SIDEBAR OTOMATIS
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        const hal = halamanSaatIni();
        const aktifKah = (link) => String(link).indexOf('#') === -1 && tautanHalaman(link) === hal;

        let linksHTML = '';
        webConfig.menuSidebar.forEach(menu => {
            const ik = menu.ikon ? '<span class="menu-ikon">' + icon(IKON[menu.ikon] || menu.ikon) + '</span>' : '';
            linksHTML += '<a href="' + menu.link + '" class="' + (aktifKah(menu.link) ? 'aktif' : '') + '" onclick="toggleSidebar()">' + ik + '<span>' + menu.nama + '</span></a>';
        });

        const teksHTML = (webConfig.linkTeks || []).map(t => {
            const atribut = t.aksi
                ? 'href="#" data-aksi="' + t.aksi + '"'
                : 'href="' + t.link + '"' + (t.baru ? ' target="_blank" rel="noopener"' : '');
            return '<a ' + atribut + ' onclick="return klikLinkTeks(this)">' + t.nama + '</a>';
        }).join('<span class="sep"> · </span>');

        sidebarContainer.innerHTML = `
            <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
            <div class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="index.html" class="sidebar-brand">
                        <img src="${IMG.logoBulat}" alt="Logo">
                        <span class="nama-web-otomatis">${webConfig.namaWebsite}</span>
                    </a>
                    <button class="close-btn" onclick="toggleSidebar()">×</button>
                </div>
                <div class="sidebar-links">
                    ${linksHTML}
                </div>
                ${teksHTML ? '<div class="sidebar-textlinks">' + teksHTML + '</div>' : ''}
                <div class="sidebar-footer">
                    <p style="font-size: 0.8rem; color: #bbb; text-align: center;">${webConfig.teksFooter}</p>
                </div>
            </div>
        `;

        // Bilah ikon yang SELALU terlihat: rail di laptop/TV, bar bawah di HP
        const itemRail = webConfig.menuSidebar.filter(m => m.ikon && m.rail);
        if (itemRail.length && !document.querySelector('.rail')) {
            document.body.classList.add('has-rail');
            const rail = document.createElement('nav');
            rail.className = 'rail';
            rail.setAttribute('aria-label', 'Navigasi cepat');
            rail.innerHTML = itemRail.map(m =>
                '<a href="' + m.link + '" class="' + (aktifKah(m.link) ? 'aktif' : '') + '" title="' + m.nama + '" aria-label="' + m.nama + '">' + icon(IKON[m.ikon] || m.ikon) + '</a>'
            ).join('');
            document.body.appendChild(rail);

            const bar = document.createElement('nav');
            bar.className = 'bottombar';
            bar.setAttribute('aria-label', 'Navigasi bawah');
            bar.innerHTML = itemRail.slice(0, 5).map(m =>
                '<a href="' + m.link + '" class="' + (aktifKah(m.link) ? 'aktif' : '') + '">' + icon(IKON[m.ikon] || m.ikon) + '<span>' + (m.pendek || m.nama) + '</span></a>'
            ).join('');
            document.body.appendChild(bar);
        }
    }
    // 2. Tembak Teks Judul (Bila ada elemen lain di luar sidebar)
    document.querySelectorAll('.nama-web-otomatis').forEach(el => {
        el.innerText = webConfig.namaWebsite;
    });

    // 3. Tembak Teks Footer
    const footerText = document.getElementById('teks-footer-copyright');
    if (footerText) footerText.innerText = webConfig.teksFooter;

    // 4. CETAK IKON SOSIAL MEDIA OTOMATIS
    const socialContainer = document.getElementById('footer-social-container');
    if (socialContainer) {
        let socialHTML = '';
        webConfig.sosialMedia.forEach(sosmed => {
            socialHTML += `
                <a href="${sosmed.link}" target="_blank" class="social-icon" title="${sosmed.nama}">
                    <img src="${sosmed.gambar}" alt="${sosmed.nama}">
                </a>
            `;
        });
        socialContainer.innerHTML = socialHTML;
    }
});

// ==========================================
// FUNGSI BANTUAN TANGGAL & WAKTU (BARU DITAMBAHKAN)
// ==========================================
function timeAgoFormated(dateString) {
    if (!dateString) return "Baru saja";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays === 0) return "Hari ini";
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;
    return `${Math.floor(diffDays / 365)} tahun yang lalu`;
}

function formatDateIndonesian(dateString) {
    if (!dateString) return "";
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ==========================================
// 2. HELPER VIEWS FIREBASE & FORMATTING
// ==========================================

// Format angka tayangan (Pencegah NaN)
function formatViews(views) {
    const num = parseInt(views, 10);
    if (isNaN(num)) return '0 Ditonton';
    return num.toLocaleString('id-ID') + ' Ditonton';
}

// Fungsi Mendengarkan Perubahan Data Views Realtime dari Firebase
function listenVideoViews(videoId, defaultViews = 0, callback) {
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        callback(parseInt(defaultViews, 10) || 0);
        return;
    }
    const safeVideoId = String(videoId).replace(/[^a-zA-Z0-9_-]/g, '_');
    const baseViews = parseInt(defaultViews, 10) || 0;
    const viewsRef = firebase.database().ref('video_views/' + safeVideoId);

    viewsRef.on('value', (snapshot) => {
        const firebaseCount = snapshot.val() || 0;
        callback(baseViews + firebaseCount);
    }, (err) => {
        console.error("Firebase Read Error:", err);
        callback(baseViews);
    });
}

// Fungsi Menambah +1 View ke Firebase saat Video Dibuka
async function incrementVideoViewsAsync(videoId, defaultViews = 0) {
    const baseViews = parseInt(defaultViews, 10) || 0;

    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        return baseViews;
    }

    const safeVideoId = String(videoId).replace(/[^a-zA-Z0-9_-]/g, '_');
    const viewsRef = firebase.database().ref('video_views/' + safeVideoId);

    return new Promise((resolve) => {
        viewsRef.transaction((currentValue) => {
            return (currentValue || 0) + 1;
        }, (error, committed, snapshot) => {
            if (committed && snapshot.val() !== null) {
                resolve(baseViews + snapshot.val());
            } else {
                resolve(baseViews);
            }
        });
    });
}

// --- FUNGSI PROSES DOWNLOAD OTOMATIS ---
function downloadVideoFile(url, filename) {
    if (!url) {
        alert("Link unduhan tidak tersedia untuk video ini.");
        return;
    }
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = filename || 'video-luvia-tv.mp4';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(blobUrl);
            a.remove();
        })
        .catch(() => {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || 'video-luvia-tv.mp4';
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
}

// --- SISTEM PENONTON LIVE REALTIME ---
function getActiveLiveViewers() {
    const viewers = localStorage.getItem('active_live_viewers');
    return viewers ? parseInt(viewers) : 0;
}

function updateActiveLiveViewersDisplay() {
    const count = getActiveLiveViewers();

    const homeBadge = document.getElementById('kick-home-badge');
    if (homeBadge) {
        homeBadge.innerText = `🔴 SEDANG LIVE (${count} Penonton)`;
    }

    const watchBadge = document.getElementById('kick-watch-badge');
    if (watchBadge) {
        watchBadge.innerText = `🔴 SEDANG LIVE (${count} Penonton)`;
    }

    const liveViewerElement = document.getElementById('live-viewers-count-text');
    if (liveViewerElement) {
        liveViewerElement.innerHTML = `👁️ <span style="color: #53fc18;">${count} Orang</span> Sedang Menonton Saat Ini`;
    }
}

window.addEventListener('storage', (e) => {
    if (e.key === 'active_live_viewers') {
        updateActiveLiveViewersDisplay();
    }
});

// ==========================================
// 3. FUNGSI RENDER REKOMENDASI (GLOBAL VIEWS & TANGGAL KARTU)
// ==========================================

async function updateKickBadgeStatus(badgeId) {
    const badge = document.getElementById(badgeId);
    if (!badge) return;

    const kickUsername = "luthfi1234321"; 
    try {
        const res = await fetch(`https://kick.com/api/v2/channels/${kickUsername}`);
        const data = await res.json();

        if (data.livestream && data.livestream.is_live) {
            const viewers = data.livestream.viewer_count || 0;
            badge.innerText = `🔴 SEDANG LIVE (${viewers} Penonton)`;
            badge.className = "badge-live";
        } else {
            badge.innerText = "⚪ OFFLINE";
            badge.className = "badge-offline";
        }
    } catch (err) {
        badge.innerText = "⚪ OFFLINE";
        badge.className = "badge-offline";
    }
}

// FUNGSI HELPER ACAK ARRAY (Baru)
function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Render Slider Rekomendasi (BERDASARKAN VIDEO TERBARU RILIS)
function renderSliderRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Urutkan berdasarkan tanggal terbaru (Newest First) dan ambil 6 video
    const sortedList = [...list].sort((a, b) => {
        const dateA = a.uploadDate ? new Date(a.uploadDate) : new Date(0);
        const dateB = b.uploadDate ? new Date(b.uploadDate) : new Date(0);
        return dateB - dateA;
    }).slice(0, 6);

    let html = `
        <a href="livestream.html" class="slider-card featured-live">
            <div class="thumb-box">
                <span id="kick-home-badge" class="badge-live">🔍 Memeriksa...</span>
                <img src="${IMG.liveCard}" alt="Live Streaming">
            </div>
            <div class="slider-details">
                <h3>LIVE STREAMING LUVIA STUDIO TV</h3>
                <p>
                    <span class="card-genre-btn" onclick="event.preventDefault(); window.location.href='videos.html?genre=Live%20Stream'">LIVE STREAM</span><br>
                    Siaran Langsung • Klik Untuk Nonton
                </p>
            </div>
        </a>
    `;

    if (sortedList.length === 0) {
        html += `<div style="padding: 20px; color: #ffffff; font-weight: bold;">${window.videoDataSiap ? 'Video tidak ditemukan.' : 'Memuat video...'}</div>`;
        container.innerHTML = html;
    } else {
        container.innerHTML = html;
        sortedList.forEach(vid => {
            const card = document.createElement('a');
            card.href = `watch.html?id=${vid.id}`;
            card.className = 'slider-card';
            const uploadTime = vid.uploadDate ? timeAgoFormated(vid.uploadDate) : '';
            
            card.innerHTML = `
                <div class="thumb-box"><img src="${vid.thumb}" alt="${vid.title}"></div>
                <div class="slider-details">
                    <h3>${vid.title}</h3>
                    <p>
                        <span class="card-genre-btn" onclick="event.preventDefault(); window.location.href='videos.html?genre=${encodeURIComponent(vid.genre || 'Umum')}'">${vid.genre || 'Umum'}</span><br>
                        <span id="view-count-slider-${vid.id}">${icon('eye')} Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                    </p>
                </div>
            `;
            container.appendChild(card);
            listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
                const el = document.getElementById(`view-count-slider-${vid.id}`);
                if (el) el.innerHTML = `${icon('eye')} ${formatViews(totalViews)}`;
            });
        });
    }
    updateKickBadgeStatus('kick-home-badge');
}

// Render Slider Tontonan Trending/Teratas (VIEWS TERBANYAK TANPA LIVE STREAM)
function renderTrendingRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Urutkan berdasarkan Views Terbanyak dan ambil 6 video
    const sortedList = [...list].sort((a, b) => (b.defaultViews || 0) - (a.defaultViews || 0)).slice(0, 6);

    container.innerHTML = ''; // Pastikan bersih tanpa menambahkan kartu Live Streaming

    sortedList.forEach((vid, i) => {
        const card = document.createElement('a');
        card.href = `watch.html?id=${vid.id}`;
        card.className = 'slider-card';
        const uploadTime = vid.uploadDate ? timeAgoFormated(vid.uploadDate) : '';
        
        card.innerHTML = `
            <div class="thumb-box"><img src="${vid.thumb}" alt="${vid.title}"><span class="rank-num">${i + 1}</span></div>
            <div class="slider-details">
                <h3>${vid.title}</h3>
                <p>
                    <span class="card-genre-btn" onclick="event.preventDefault(); window.location.href='videos.html?genre=${encodeURIComponent(vid.genre || 'Umum')}'">${vid.genre || 'Umum'}</span><br>
                    <span id="view-count-trending-${vid.id}">${icon('eye')} Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                </p>
            </div>
        `;
        container.appendChild(card);
        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-trending-${vid.id}`);
            if (el) el.innerHTML = `${icon('eye')} ${formatViews(totalViews)}`;
        });
    });
}

// Render Grid di Halaman Nonton & Live Stream (DIBUAT ACAK MAX 8 KARTU)
function renderGridRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const isLivePage = window.location.pathname.includes('livestream.html');
    
    // Ambil maksimal 8 video dari hasil acakan array list
    const randomList = shuffleArray([...list]).slice(0, 8);

    let html = '';

    container.innerHTML = html;

    randomList.forEach(vid => {
        const card = document.createElement('a');
        card.href = `watch.html?id=${vid.id}`;
        card.className = 'video-card';
        const uploadTime = vid.uploadDate ? timeAgoFormated(vid.uploadDate) : ''; 
        
        card.innerHTML = `
            <div class="thumb-box">
                <img src="${vid.thumb}" alt="${vid.title}">
            </div>
            <div class="video-details">
                <h3>${vid.title}</h3>
                <p>
                    <span class="card-genre-btn" onclick="event.preventDefault(); window.location.href='videos.html?genre=${encodeURIComponent(vid.genre || 'Umum')}'">${vid.genre || 'Umum'}</span><br>
                    <span id="view-count-grid-${vid.id}">${icon('eye')} Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                </p>
            </div>
        `;
        container.appendChild(card);

        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-grid-${vid.id}`);
            if (el) el.innerHTML = `${icon('eye')} ${formatViews(totalViews)}`;
        });
    });

    // Menambahkan Tombol "Lihat Video Lainnya" di bagian paling bawah
    const btnContainer = document.createElement('div');
    btnContainer.style.textAlign = 'center';
    btnContainer.style.marginTop = '30px';
    btnContainer.style.gridColumn = '1 / -1'; 
    btnContainer.innerHTML = `
        <a href="videos.html" class="btn-watch-hero" style="font-size: 15px; padding: 12px 30px;">
            Lihat Video Lainnya ❯
        </a>
    `;
    container.appendChild(btnContainer);

    if (!isLivePage) {
        updateKickBadgeStatus('kick-watch-badge');
    }
}

// D. FUNGSI RENDER SEMUA VIDEO UNTUK HALAMAN VIDEOS.HTML
function renderAllVideosPage(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Memastikan bersih dari kartu live streaming statis

    list.forEach(vid => {
        const card = document.createElement('a');
        card.href = `watch.html?id=${vid.id}`;
        card.className = 'video-card';
        const uploadTime = vid.uploadDate ? timeAgoFormated(vid.uploadDate) : '';
        
        card.innerHTML = `
            <div class="thumb-box"><img src="${vid.thumb}" alt="${vid.title}"></div>
            <div class="video-details">
                <h3>${vid.title}</h3>
                <p>
                    <span class="card-genre-btn" onclick="event.preventDefault(); window.location.href='videos.html?genre=${encodeURIComponent(vid.genre || 'Umum')}'">${vid.genre || 'Umum'}</span><br>
                    <span id="view-count-all-${vid.id}">${icon('eye')} Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                </p>
            </div>
        `;
        container.appendChild(card);
        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-all-${vid.id}`);
            if (el) el.innerHTML = `${icon('eye')} ${formatViews(totalViews)}`;
        });
    });
}
// ==============================================================================


// ==========================================
// 4. SISTEM PENCARIAN (LIVE SEARCH & REDIRECT)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Beri jeda 100ms agar Navbar dari Pusat Komando selesai dicetak ke layar terlebih dahulu
    setTimeout(() => {
        const searchInput = document.getElementById('navSearchInput');
        const searchDropdown = document.getElementById('searchDropdownList');
        const searchForm = document.getElementById('navSearchForm');

        if (searchInput && searchDropdown && searchForm) {
            
                       // A. LIVE SEARCH CAMPURAN (VIDEO + POSTINGAN), hanya yang relevan
            let postSaran = null; // cache postingan dari Firebase
            const nSaran = s => String(s == null ? '' : s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
            const skorSaran = (judul, gudang, kata) => {
                const j = nSaran(judul), g = nSaran(gudang);
                let n = 0;
                for (const k of kata) {
                    if (j.includes(k)) n += 2;
                    else if (g.includes(k)) n += 1;
                    else return -1;
                }
                return n;
            };
            const potongSaran = (s, maks) => {
                s = String(s || '').replace(/\s+/g, ' ').trim();
                return s.length > maks ? s.slice(0, maks - 1) + '…' : s;
            };

            function tampilSaran() {
                const query = searchInput.value.trim();
                const kata = nSaran(query).split(/\s+/).filter(Boolean);
                if (!kata.length) { searchDropdown.classList.remove('show'); return; }

                const hasil = [];
                if (typeof videoList !== 'undefined') {
                    videoList.forEach(vid => {
                        const n = skorSaran(vid.title, [vid.title, vid.genre, vid.uploadDate, vid.description].join(' '), kata);
                        if (n >= 0) hasil.push({ tipe: 'video', n: n, t: new Date(vid.uploadDate || 0).getTime() || 0, vid: vid });
                    });
                }
                Object.keys(postSaran || {}).forEach(k => {
                    const p = postSaran[k];
                    const n = skorSaran(p.caption, [p.caption, p.uploadDate].join(' '), kata);
                    if (n >= 0) hasil.push({ tipe: 'post', n: n, t: p.timestamp || 0, key: k, p: p });
                });
                hasil.sort((a, b) => b.n - a.n || b.t - a.t);
                const tampil = hasil.slice(0, 6);

                if (!tampil.length) {
                    searchDropdown.innerHTML = '<div style="padding: 15px; text-align: center; color: #bbb; font-size: 0.85rem;">Tidak ada hasil untuk "' + escHtmlGlobal(query) + '"</div>' +
                        '<a href="search.html?q=' + encodeURIComponent(query) + '" class="search-semua">Buka halaman pencarian ❯</a>';
                    searchDropdown.classList.add('show');
                    return;
                }

                let html = '';
                tampil.forEach(x => {
                    if (x.tipe === 'video') {
                        const vid = x.vid;
                        html += `
                            <a href="watch.html?id=${vid.id}" class="search-result-item">
                                <img src="${vid.thumb}" alt="Thumbnail">
                                <div class="search-result-info">
                                    <h4>${vid.title}</h4>
                                    <p><span class="sr-tipe sr-tipe-video">Video</span> ${vid.genre || 'Umum'} • <span id="search-view-${vid.id}">Memuat...</span></p>
                                </div>
                            </a>`;
                    } else {
                        const p = x.p, sumber = p.videoUrl || p.imageUrl || '';
                        const isVid = /\.(mp4|webm|mov)(\?|$)/i.test(sumber);
                        const media = (isVid && !p.thumbnailUrl)
                            ? '<video src="' + escHtmlGlobal(sumber) + '#t=0.5" preload="metadata" muted playsinline></video>'
                            : '<img src="' + escHtmlGlobal(p.thumbnailUrl || sumber) + '" alt="Postingan">';
                        html += `
                            <a href="post.html?id=${encodeURIComponent(x.key)}" class="search-result-item">
                                ${media}
                                <div class="search-result-info">
                                    <h4>LUVIA STUDIO TV</h4>
                                    <p class="sr-cap"><span class="sr-tipe sr-tipe-post">Postingan</span> ${escHtmlGlobal(potongSaran(p.caption || 'Tanpa keterangan', 90))}</p>
                                </div>
                            </a>`;
                    }
                });
                html += '<a href="search.html?q=' + encodeURIComponent(query) + '" class="search-semua">Lihat semua hasil untuk “' + escHtmlGlobal(query) + '” ❯</a>';
                searchDropdown.innerHTML = html;
                searchDropdown.classList.add('show');

                tampil.forEach(x => {
                    if (x.tipe !== 'video' || typeof listenVideoViews !== 'function') return;
                    listenVideoViews(x.vid.id, x.vid.defaultViews || 0, (totalViews) => {
                        const viewEl = document.getElementById(`search-view-${x.vid.id}`);
                        if (viewEl) viewEl.innerText = `${formatViews(totalViews)}`;
                    });
                });
            }

            // Muat postingan sekali di awal agar saran langsung campuran
            if (typeof firebase !== 'undefined' && firebase.apps.length) {
                firebase.database().ref('posts').once('value')
                    .then(s => { postSaran = s.val() || {}; if (searchDropdown.classList.contains('show')) tampilSaran(); })
                    .catch(() => { postSaran = {}; });
            }
            searchInput.addEventListener('input', tampilSaran);

            // Sembunyikan dropdown jika user mengeklik area luar pencarian
            document.addEventListener('click', function(e) {
                if (!searchForm.contains(e.target)) searchDropdown.classList.remove('show');
            });

            // B. AKSI SAAT MENEKAN TOMBOL ENTER ATAU CARI
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const q = searchInput.value.trim();
                if (q) {
                    // Pindah ke halaman pencarian (video + postingan)
                    window.location.href = `search.html?q=${encodeURIComponent(q)}`;
                }
            });
        }
    }, 100); // Akhir dari jeda 100ms
});

// =================================================================
// KODE TAMBAHAN UNTUK JALUR HYBRID (BOT GITHUB + ADMIN FIREBASE)
// =================================================================

videoList.forEach(selesaikanThumb);   // <-- baris ini taruh SEBELUM "const botVideos = [...videoList];"

// 1. Simpan salinan video dari bot
const botVideos = [...videoList]; 

videoList.length = 0;              // kosongkan dulu, diisi setelah Firebase menjawab
window.videoDataSiap = false;

// Semua video apa pun visibilitasnya (untuk admin & pembukaan lewat link)
const videoListSemua = [];

// Thumbnail boleh ditulis "IMG:vodLive" supaya ikut pusat gambar
function selesaikanThumb(v) {
    if (v && typeof v.thumb === 'string' && v.thumb.indexOf('IMG:') === 0) {
        v.thumb = IMG[v.thumb.slice(4)] || '';
    }
    return v;
}


function muatDataDariFirebase() {
    if (typeof firebase === 'undefined') return;

    firebase.database().ref('videos_manual').on('value', (snapshot) => {
        let adminVideos = [];
        let adminIds = [];

        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.keys(data).forEach(key => {
                adminVideos.push(selesaikanThumb(data[key]));
                adminIds.push(data[key].id);
            });
        }

        const filteredBotVideos = botVideos.filter(v => !adminIds.includes(v.id));

        videoListSemua.length = 0;
        videoListSemua.push(...filteredBotVideos, ...adminVideos);

        // videoList = yang boleh tampil di daftar/slider/pencarian/program
        videoList.length = 0;
        videoList.push(...videoListSemua.filter(v =>
            IS_ADMIN_BROWSER || (v.visibility || 'publik') === 'publik'
        ));

        window.videoDataSiap = true;
      
        window.dispatchEvent(new Event('videoDataReady'));
    });
}
// Jalankan sistem hybrid
muatDataDariFirebase();

setTimeout(() => {
    if (window.videoDataSiap) return;
    videoListSemua.push(...botVideos);
    videoList.push(...botVideos);
    window.videoDataSiap = true;
    window.dispatchEvent(new Event('videoDataReady'));
}, 8000);

// 3. Update tampilan otomatis saat data siap
window.addEventListener('videoDataReady', () => {
    if (typeof renderSliderRecommendations === 'function' && document.getElementById('home-recommendations-slider')) {
        renderSliderRecommendations('home-recommendations-slider', videoList);
    }
    if (typeof renderTrendingRecommendations === 'function' && document.getElementById('home-trending-slider')) {
        renderTrendingRecommendations('home-trending-slider', videoList);
    }
    if (typeof renderGridRecommendations === 'function' && document.getElementById('watch-recommendations-grid')) {
        renderGridRecommendations('watch-recommendations-grid', videoList);
    }
    if (typeof initVideosPage === 'function' && document.getElementById('all-videos-container')) {
        initVideosPage();
    }
});

function terapkanGambar(root) {
    (root || document).querySelectorAll('[data-img]').forEach(el => {
        const u = IMG[el.dataset.img];
        if (!u) return;
        if (el.tagName === 'IMG') el.src = u;
        else if (el.tagName === 'LINK') el.href = u;
        else el.style.backgroundImage = `url("${u}")`;
    });

    (root || document).querySelectorAll('[data-avatar]').forEach(el => {
        el.src = (el.dataset.avatar === 'admin') ? AVATAR.gambarAdmin : AVATAR.gambarDefault;
    });
  
}
document.addEventListener('DOMContentLoaded', () => terapkanGambar());


// ==========================================
// PUSAT POP-UP, COOKIE & CEK BROWSER
// ==========================================
const HALAMAN_ADMIN = /admin(\.html)?$/i.test(location.pathname);
const KEY_CONSENT = 'luvia_cookie_consent';

function simpanLokal(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
function bacaLokal(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function simpanSesi(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
function bacaSesi(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function escHtmlGlobal(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function cekStorage() {
    try {
        localStorage.setItem('__luvia_t', '1'); localStorage.removeItem('__luvia_t');
        sessionStorage.setItem('__luvia_t', '1'); sessionStorage.removeItem('__luvia_t');
        return navigator.cookieEnabled !== false;
    } catch (e) { return false; }
}

// ---------- Pembangun pop-up (tengah / bawah) ----------
function bangunPopup(p, onTutup) {
    const tengah = p.posisi !== 'bawah';
    const wrap = document.createElement('div');
    wrap.className = tengah ? 'pop-overlay' : 'pop-bawah';

    const card = document.createElement('div');
    card.className = 'pop-card';
    if (p.gambar) {
        const g = p.gambar.indexOf('IMG:') === 0 ? (IMG[p.gambar.slice(4)] || '') : p.gambar;
        if (g) card.innerHTML += `<img class="pop-img" src="${escHtmlGlobal(g)}" alt="">`;
    }
    card.innerHTML += `<div class="pop-body">
        ${p.judul ? `<h3 class="pop-judul">${escHtmlGlobal(p.judul)}</h3>` : ''}
        ${p.isi ? `<p class="pop-isi">${escHtmlGlobal(p.isi)}</p>` : ''}
        <div class="pop-btns"></div></div>`;

    let sudahTutup = false;
    const tutup = () => { if (sudahTutup) return; sudahTutup = true; wrap.remove(); if (onTutup) onTutup(); };

    const x = document.createElement('button');
    x.className = 'pop-x'; x.type = 'button'; x.textContent = '✕'; x.setAttribute('aria-label', 'Tutup');
    x.addEventListener('click', tutup);
    card.insertBefore(x, card.firstChild);

    const area = card.querySelector('.pop-btns');
    let tombol = Array.isArray(p.tombol) ? p.tombol : Object.values(p.tombol || {});
    if (!tombol.length) tombol = [{ teks: 'Tutup', link: '' }];
        tombol.forEach(t => {
        const link = (t.link || '').trim();
        if (/^\s*javascript:/i.test(link)) return;            // keamanan
        // Tujuan khusus: "aksi:rating" = membuka pop-up Beri Rating
        const aksi = /^aksi:/i.test(link) ? link.slice(5).trim().toLowerCase() : '';
        const adaLink = !!link && !aksi;
        const el = document.createElement(adaLink ? 'a' : 'button');
        el.className = 'pop-btn' + ((adaLink || aksi) ? '' : ' sekunder');
        el.textContent = t.teks || (adaLink ? 'Buka' : (aksi ? 'Beri Rating' : 'Tutup'));
        if (adaLink) {
            el.href = link;
            if (/^https?:\/\//i.test(link) && link.indexOf(location.origin) !== 0) { el.target = '_blank'; el.rel = 'noopener'; }
        } else { el.type = 'button'; }
        el.addEventListener('click', () => {
            tutup();
            if (aksi === 'rating') {
                setTimeout(() => {
                    if (HALAMAN_ADMIN) tampilToast('Pratinjau: tombol ini akan membuka pop-up Beri Rating');
                    else bukaRating();
                }, 150);
            }
        });
        area.appendChild(el);
    });

    if (tengah) wrap.addEventListener('click', e => { if (e.target === wrap) tutup(); });
    wrap.appendChild(card);
    return wrap;
}

window.tampilkanPreviewPopup = function (p) { document.body.appendChild(bangunPopup(p, null)); };

// ---------- Antrean pop-up dari Firebase ----------
function kunciPopup(p) { return 'luvia_popup_' + p.id + '_' + (p.versi || 0); }

function layakTampil(p) {
    if (bacaSesi(kunciPopup(p))) return false;                 // sudah tampil di kunjungan ini
    if (p.tampil === 'baru' && !PENGUNJUNG_BARU) return false; // khusus pengunjung baru
    return true;
}

function tampilkanAntrean(antrean) {
    if (!antrean.length) return;
    const p = antrean.shift();
    simpanSesi(kunciPopup(p), '1');
    document.body.appendChild(bangunPopup(p, () => setTimeout(() => tampilkanAntrean(antrean), 350)));
}

async function jalankanPopup() {
    if (HALAMAN_ADMIN || typeof firebase === 'undefined' || !firebase.apps.length) return;
    let daftar = [];
    try {
        const snap = await firebase.database().ref('popups').once('value');
        const d = snap.val() || {};
        daftar = Object.keys(d).map(k => Object.assign({ id: k }, d[k]));
    } catch (e) { return; }
    daftar = daftar.filter(p => p.aktif !== false && layakTampil(p)).sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
    const antrean = daftar.filter(p => p.posisi !== 'bawah').concat(daftar.filter(p => p.posisi === 'bawah'));
    tampilkanAntrean(antrean);
}

// ---------- Pesan cookie (tengah layar: Setuju / Keluar) ----------
function keluarSitus() {
    try { window.close(); } catch (e) {}
    location.replace('about:blank');
}

function tampilkanCookie(lanjut) {
    const wrap = document.createElement('div');
    wrap.className = 'pop-overlay ck-top';
    wrap.innerHTML = `
        <div class="pop-card">
            <div class="pop-body">
                <h3 class="pop-judul">🍪 Website ini menggunakan cookie</h3>
                <p class="pop-isi">Kami memakai cookie dan penyimpanan lokal di perangkatmu untuk menghitung jumlah pengunjung dan penonton, serta mengingat nama chat, like, dan komentar milikmu. Video yang disematkan dari YouTube, Google Drive, atau Kick juga dapat menyimpan cookie dari pihak mereka sendiri. Pilih "Setuju" untuk melanjutkan.</p>
                <div class="pop-btns">
                    <button type="button" class="pop-btn" id="ck-setuju">Setuju</button>
                    <button type="button" class="pop-btn sekunder" id="ck-keluar">Keluar</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('#ck-setuju').addEventListener('click', () => {
        simpanLokal(KEY_CONSENT, 'ya');
        wrap.remove();
        lanjut();
    });
    wrap.querySelector('#ck-keluar').addEventListener('click', keluarSitus);
}

// ---------- Peringatan browser yang memblokir ----------
function tampilkanPeringatanBrowser(masalah) {
    const wrap = document.createElement('div');
    wrap.className = 'pop-overlay ck-top2';
    wrap.innerHTML = `
        <div class="pop-card">
            <div class="pop-body">
                <h3 class="pop-judul">⚠️ Browser kamu memblokir fitur yang dibutuhkan</h3>
                <p class="pop-isi">${masalah.map(m => '• ' + escHtmlGlobal(m)).join('\n')}

Website ini tidak dapat berjalan normal kalau cookie, penyimpanan data situs, atau koneksi pihak ketiga (Google/Firebase, YouTube, Google Drive, Kick) diblokir.

Rekomendasi: buka memakai browser biasa seperti Google Chrome, Microsoft Edge, atau Firefox dengan pengaturan standar, atau matikan sementara pemblokir/pelindung pelacakan untuk situs ini. Mode Samaran (Incognito/Private) dan pemblokir ketat dapat menyebabkan masalah ini.</p>
                <div class="pop-btns"><button type="button" class="pop-btn" id="wb-ok">Saya Mengerti</button></div>
            </div>
        </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('#wb-ok').addEventListener('click', () => wrap.remove());
}

function cekBrowserBermasalah() {
    if (bacaSesi('luvia_warn_browser')) return;
    const masalah = [];
    if (!cekStorage()) masalah.push('Cookie / penyimpanan data situs diblokir, sehingga like, komentar, nama chat, dan statistik tidak bisa tersimpan.');

    const tampil = () => {
        if (!masalah.length || bacaSesi('luvia_warn_browser')) return;
        simpanSesi('luvia_warn_browser', '1');
        tampilkanPeringatanBrowser(masalah);
    };

    if (typeof firebase !== 'undefined' && firebase.apps.length) {
        let tersambung = false;
        firebase.database().ref('.info/connected').on('value', s => { if (s.val() === true) tersambung = true; });
        setTimeout(() => {
            if (!tersambung && navigator.onLine !== false) {
                masalah.push('Koneksi ke server data (Firebase / Google) terblokir oleh browser atau ekstensi pemblokir.');
            }
            tampil();
        }, 10000);
    } else { tampil(); }
}

document.addEventListener('DOMContentLoaded', () => {
    if (HALAMAN_ADMIN) return;
    const storageOk = cekStorage();
    if (storageOk && bacaLokal(KEY_CONSENT) !== 'ya') {
        tampilkanCookie(() => { jalankanPopup(); mulaiRating(); mulaiPresence(); });
    } else {
        jalankanPopup();
        mulaiRating();
        mulaiPresence();
    }
    cekBrowserBermasalah();
});

// =====================================================================
//  A. DIALOG KUSTOM  (pengganti alert / confirm / prompt bawaan browser)
//     Tampilannya sama dengan pesan izin cookie.
// =====================================================================
function bukaDialog(cfg, selesai) {
    const wrap = document.createElement('div');
    wrap.className = 'pop-overlay dlg';
    const card = document.createElement('div');
    card.className = 'pop-card dlg-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');

    let h = '<div class="pop-body">';
    if (cfg.judul) h += '<h3 class="pop-judul">' + escHtmlGlobal(cfg.judul) + '</h3>';
    if (cfg.pesan) h += '<p class="pop-isi">' + escHtmlGlobal(cfg.pesan) + '</p>';
    if (cfg.input) {
        h += '<input type="text" class="dlg-input" maxlength="' + (cfg.input.maks || 500) + '" value="' +
             escHtmlGlobal(cfg.input.nilai || '') + '" placeholder="' + escHtmlGlobal(cfg.input.placeholder || '') + '">';
    }
    h += '<div class="pop-btns dlg-btns"></div></div>';
    card.innerHTML = h;

    const area = card.querySelector('.dlg-btns');
    const inp = card.querySelector('.dlg-input');
    const nilaiBatal = (cfg.nilaiBatal === undefined) ? null : cfg.nilaiBatal;
    let tertutup = false;

    function tutupDengan(nilai) {
        if (tertutup) return;
        tertutup = true;
        document.removeEventListener('keydown', onKey, true);
        wrap.remove();
        selesai(nilai);
    }
    function onKey(e) {
        if (e.key === 'Escape') { e.stopPropagation(); tutupDengan(nilaiBatal); }
        else if (e.key === 'Enter' && inp && document.activeElement === inp) {
            e.preventDefault();
            const u = cfg.tombol.find(t => t.utama);
            tutupDengan(u ? (u.nilai === '__input' ? inp.value : u.nilai) : null);
        }
    }
    document.addEventListener('keydown', onKey, true);

    cfg.tombol.forEach(t => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'pop-btn' + (t.utama ? '' : ' sekunder') + (t.bahaya ? ' bahaya' : '');
        b.textContent = t.teks;
        b.onclick = () => tutupDengan(t.nilai === '__input' ? inp.value : t.nilai);
        area.appendChild(b);
    });
    wrap.addEventListener('click', e => { if (e.target === wrap) tutupDengan(nilaiBatal); });
    wrap.appendChild(card);
    document.body.appendChild(wrap);
    setTimeout(() => {
        if (inp) { inp.focus(); inp.select(); }
        else { const u = area.querySelector('.pop-btn:not(.sekunder)') || area.lastChild; if (u) u.focus(); }
    }, 30);
}

// Pemberitahuan (pengganti alert)
function tampilAlert(pesan, judul) {
    return new Promise(res => bukaDialog({
        judul: judul || 'Pemberitahuan', pesan: String(pesan),
        tombol: [{ teks: 'OK', nilai: true, utama: true }], nilaiBatal: true
    }, res));
}
// Konfirmasi Ya/Batal (pengganti confirm) -> Promise<true|false>
function tampilKonfirmasi(pesan, opsi) {
    opsi = opsi || {};
    return new Promise(res => bukaDialog({
        judul: opsi.judul || 'Konfirmasi', pesan: String(pesan),
        tombol: [{ teks: opsi.batal || 'Batal', nilai: false }, { teks: opsi.ya || 'Ya', nilai: true, utama: true, bahaya: !!opsi.bahaya }],
        nilaiBatal: false
    }, res));
}
// Isian teks (pengganti prompt) -> Promise<string|null>
function tampilInput(pesan, nilaiAwal, opsi) {
    opsi = opsi || {};
    return new Promise(res => bukaDialog({
        judul: opsi.judul || 'Edit', pesan: pesan,
        input: { nilai: nilaiAwal || '', placeholder: opsi.placeholder || '' },
        tombol: [{ teks: 'Batal', nilai: null }, { teks: opsi.simpan || 'Simpan', nilai: '__input', utama: true }],
        nilaiBatal: null
    }, res));
}
// Pilihan bebas -> Promise<nilai|null>.  daftar: [{ teks, nilai, utama?, bahaya? }]
function tampilPilihan(judul, pesan, daftar) {
    return new Promise(res => bukaDialog({ judul: judul, pesan: pesan, tombol: daftar, nilaiBatal: null }, res));
}
// Semua alert("...") yang sudah ada otomatis memakai dialog kustom ini
window.alert = function (pesan) { tampilAlert(pesan); };


// =====================================================================
//  B. NAMA BERSAMA  (isi nama sekali -> terisi otomatis di semua halaman)
// =====================================================================
const KUNCI_NAMA = 'luvia_nama_pengguna';

function ambilNama() {
    // kunci lama ikut dibaca supaya nama yang sudah tersimpan tidak hilang
    return bacaLokal(KUNCI_NAMA) || bacaLokal('luvia_comment_name') ||
           bacaLokal('luvia_live_chat_name') || bacaLokal('luvia_chat_name') || '';
}
function simpanNama(n) {
    simpanLokal(KUNCI_NAMA, String(n || '').trim().slice(0, 24));
}

// Menggambar kolom nama gaya "Komentar sebagai NAMA · ganti" di dalam <div id=wadahId>.
// Mengembalikan { ambil(), segarkan() }.
function pasangKolomNama(wadahId, inputId, label) {
    const wadah = document.getElementById(wadahId);
    if (!wadah) return null;
    label = label || 'Komentar sebagai';
    wadah.classList.add('kn');
    wadah.innerHTML =
        '<div class="kn-who" style="display:none;"></div>' +
        '<div class="kn-edit">' +
            '<input type="text" id="' + inputId + '" placeholder="Nama pengguna..." maxlength="24" autocomplete="off">' +
            '<button type="button" class="kn-batal" aria-label="Batal" title="Batal">' + icon(IKON.tutup) + '</button>' +
        '</div>';

    const who = wadah.querySelector('.kn-who');
    const edit = wadah.querySelector('.kn-edit');
    const input = wadah.querySelector('input');
    const batal = wadah.querySelector('.kn-batal');
    let sedangGanti = false;

    function tampil() {
        if (IS_ADMIN_BROWSER) {
            edit.style.display = 'none'; who.style.display = 'block';
            who.innerHTML = icon(IKON.perisai) + ' Mode Admin: tampil sebagai <b>' + escHtmlGlobal(ADMIN_PROFIL.nama) + '</b>';
            input.value = ADMIN_PROFIL.nama;
            return;
        }
        const n = ambilNama();
        if (n && !sedangGanti) {
            who.style.display = 'block'; edit.style.display = 'none';
            who.innerHTML = escHtmlGlobal(label) + ' <b>' + escHtmlGlobal(n) + '</b> · <button type="button" class="kn-ganti">ganti</button>';
            input.value = n;
            who.querySelector('.kn-ganti').onclick = () => { sedangGanti = true; tampil(); input.focus(); input.select(); };
        } else {
            who.style.display = 'none'; edit.style.display = 'flex';
            batal.style.display = n ? 'inline-flex' : 'none';     // X hanya jika ada nama lama untuk dikembalikan
        }
    }
    batal.onclick = () => { sedangGanti = false; input.value = ambilNama(); tampil(); };
    window.addEventListener('storage', (e) => { if (e.key === KUNCI_NAMA) { sedangGanti = false; tampil(); } });
    tampil();

    return {
        ambil: () => (IS_ADMIN_BROWSER ? ADMIN_PROFIL.nama : (input.value || '').trim()),
        segarkan: () => { sedangGanti = false; tampil(); }
    };
}


// =====================================================================
//  C. RATING WEBSITE  (pop-up bintang 1-5 + kritik & saran)
// =====================================================================

// =====================================================================
//  HELPER MENU
// =====================================================================
function halamanSaatIni() {
    return location.pathname.split('/').pop().replace(/\.html$/i, '') || 'index';
}
function tautanHalaman(link) {
    return String(link).split('#')[0].split('?')[0].replace(/\.html$/i, '').replace(/^\//, '') || 'index';
}
const AKSI_MENU = { rating: function () { bukaRating(); } };
function klikLinkTeks(a) {
    if (typeof toggleSidebar === 'function') toggleSidebar();
    const aksi = a.getAttribute('data-aksi');
    if (aksi && AKSI_MENU[aksi]) { AKSI_MENU[aksi](); return false; }
    return true;
}


// =====================================================================
//  C. RATING WEBSITE (BARU)
//  - Otomatis muncul tiap kunjungan, KECUALI kunjungan pertama
//    dan KECUALI yang sudah pernah memberi rating.
//  - Bisa dibuka manual kapan saja lewat tautan "Beri Rating" di sidebar.
// =====================================================================
const RT_KUNJUNGAN = 'luvia_rt_kunjungan';
const RT_SELESAI = 'luvia_rt_selesai';
const RT_TEKS = ['', 'Sangat buruk', 'Buruk', 'Cukup', 'Bagus', 'Luar biasa'];

function angkaLokal(k) { return parseInt(bacaLokal(k) || '0', 10) || 0; }

function mulaiRating() {
    if (HALAMAN_ADMIN || IS_ADMIN_BROWSER || !cekStorage()) return;

    // hitung kunjungan: sekali per sesi (tab/browser dibuka kembali)
    if (!bacaSesi('luvia_rt_sesi')) {
        simpanSesi('luvia_rt_sesi', '1');
        simpanLokal(RT_KUNJUNGAN, String(angkaLokal(RT_KUNJUNGAN) + 1));
    }
    if (bacaLokal(RT_SELESAI) === '1') return;          // sudah pernah memberi rating
    if (angkaLokal(RT_KUNJUNGAN) < 2) return;           // kunjungan pertama: jangan dulu
    if (bacaSesi('luvia_rt_tampil')) return;            // cukup sekali per kunjungan

    function coba() {
        if (bacaSesi('luvia_rt_tampil')) return;
        if (document.querySelector('.pop-overlay')) return;     // jangan menumpuk dengan pop-up lain
        if (window.player && window.player.playing) return;     // tunggu video berhenti
        simpanSesi('luvia_rt_tampil', '1');
        bukaRating();
    }
    setTimeout(coba, 6000);
    setInterval(coba, 20000);
}

function bukaRating() {
    if (document.querySelector('.rt-overlay')) return;
    tampilkanRating();
}

function tampilkanRating() {
    const sudahPernah = bacaLokal(RT_SELESAI) === '1';
    const wrap = document.createElement('div');
    wrap.className = 'pop-overlay rt-overlay';
    wrap.innerHTML =
        '<div class="pop-card rt-card"><div class="pop-body">' +
            '<h3 class="pop-judul">Bagaimana tampilan website kami?</h3>' +
            '<p class="pop-isi">' + (sudahPernah ? 'Kamu sudah pernah memberi rating. Kamu boleh menambahkan penilaian baru kapan saja.' : 'Penilaianmu membantu kami membuat website ini lebih baik.') + '</p>' +
            '<div class="rt-stars" role="radiogroup" aria-label="Pilih bintang">' +
                [1, 2, 3, 4, 5].map(n => '<button type="button" class="rt-star" data-n="' + n + '" aria-label="' + n + ' bintang">' + icon(IKON.bintang) + '</button>').join('') +
            '</div>' +
            '<div class="rt-label" id="rt-label">Pilih bintang</div>' +
            '<textarea class="rt-saran" id="rt-saran" rows="3" maxlength="500" placeholder="Kritik dan saran..."></textarea>' +
            '<div class="rt-info" id="rt-info">Kritik dan saran wajib diisi jika bintang di bawah 5.</div>' +
            '<div class="rt-err" id="rt-err"></div>' +
            '<div class="pop-btns"><button type="button" class="pop-btn" id="rt-kirim">Beri Rating</button>' +
            '<button type="button" class="pop-btn sekunder" id="rt-tidak">Tidak Terimakasih</button></div>' +
        '</div></div>';
    document.body.appendChild(wrap);

    let nilai = 0;
    const bintang = wrap.querySelectorAll('.rt-star');
    const label = wrap.querySelector('#rt-label');
    const info = wrap.querySelector('#rt-info');
    const err = wrap.querySelector('#rt-err');
    const saran = wrap.querySelector('#rt-saran');

    function gambar(n) {
        bintang.forEach((b, i) => {
            const aktif = i < n;
            b.classList.toggle('on', aktif);
            b.innerHTML = icon(aktif ? IKON.bintangIsi : IKON.bintang);
        });
    }
    // Efek hover hanya dipasang di perangkat bermouse (laptop/PC).
    // Di layar sentuh (HP, iPhone, tablet, TV) hover dimatikan supaya klik tidak "ditelan" browser.
    const bisaHover = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    bintang.forEach(b => {
        if (bisaHover) {
            b.addEventListener('mouseenter', () => gambar(Number(b.dataset.n)));
            b.addEventListener('mouseleave', () => gambar(nilai));
        }
        b.addEventListener('click', () => {
            nilai = Number(b.dataset.n);
            gambar(nilai);
            label.textContent = RT_TEKS[nilai];
            err.textContent = '';
            if (nilai === 5) { info.textContent = 'Kritik dan saran (boleh dikosongkan).'; saran.placeholder = 'Kritik dan saran (opsional)...'; }
            else { info.textContent = 'Kritik dan saran WAJIB diisi agar kami tahu apa yang perlu diperbaiki.'; saran.placeholder = 'Apa yang perlu diperbaiki?'; }
        });
    });

    wrap.querySelector('#rt-tidak').onclick = () => wrap.remove();
    wrap.addEventListener('click', e => { if (e.target === wrap) wrap.remove(); });

    wrap.querySelector('#rt-kirim').onclick = () => {
        const teks = saran.value.trim();
        if (!nilai) { err.textContent = 'Pilih jumlah bintang dulu.'; return; }
        if (nilai < 5 && !teks) { err.textContent = 'Mohon isi kritik dan saran agar kami tahu apa yang perlu diperbaiki.'; saran.focus(); return; }
        if (typeof firebase === 'undefined' || !firebase.apps.length) { err.textContent = 'Koneksi bermasalah. Coba lagi nanti.'; return; }

        const tombol = wrap.querySelector('#rt-kirim');
        tombol.disabled = true;
        const data = { bintang: nilai, saran: teks, waktu: Date.now(), selesai: false, uid: idPengguna() };
        const nama = ambilNama();
        if (nama) data.nama = nama;
        firebase.database().ref('ratings').push(data)
            .then(() => {
                simpanLokal(RT_SELESAI, '1');
                wrap.remove();
                tampilToast('Terima kasih atas penilaianmu!');
            })
            .catch(() => { tombol.disabled = false; err.textContent = 'Gagal mengirim. Coba lagi nanti.'; });
    };
}


// ----------------------------------------------------------------------
//  LANGKAH 5  ->  NAMA PENGGUNA (unik, maksimal 3x ubah per 14 hari)
//  Tempel di PALING BAWAH videos-data.js (setelah kode LANGKAH 4).
// ----------------------------------------------------------------------

const NAMA_UBAH_MAKS = 3;      // boleh diubah maksimal 3 kali ...
const NAMA_UBAH_HARI = 14;     // ... dalam 14 hari terakhir

function idPengguna() {
    let id = bacaLokal('luvia_uid_pengguna');
    if (!id) {
        id = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        simpanLokal('luvia_uid_pengguna', id);
    }
    return id;
}
// "Adi os" dan "adios" dianggap sama (mencegah nama yang mirip)
function kunciNama(n) {
    return String(n || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}
function formatTanggalNama(ts) {
    return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Mendaftarkan / mengganti nama pengguna.  Mengembalikan Promise<{ok, nama, pesan}>
async function tetapkanNama(namaInput) {
    const nama = String(namaInput || '').trim().replace(/\s+/g, ' ').slice(0, 24);
    const kunci = kunciNama(nama);
    if (kunci.length < 3) return { ok: false, pesan: 'Nama pengguna minimal 3 huruf atau angka.' };
    if (typeof firebase === 'undefined' || !firebase.apps.length) return { ok: false, pesan: 'Tidak dapat memeriksa nama pengguna sekarang. Coba lagi.' };

    const uid = idPengguna();
    const db = firebase.database();
    try {
        const sn = await db.ref('pengguna/' + uid).once('value');
        const data = sn.val() || {};
        const namaLama = data.nama || '';

        if (namaLama === nama && data.kunci === kunci) {
            simpanNama(nama); simpanLokal('luvia_nama_terdaftar', kunci);
            return { ok: true, nama: nama };
        }

        const sekarang = Date.now();
        const batas = sekarang - NAMA_UBAH_HARI * 86400000;
        const ubah = Object.values(data.ubah || {}).filter(t => t > batas).sort((a, b) => a - b);
        const gantiNama = !!namaLama && data.kunci !== kunci;

        if (gantiNama && ubah.length >= NAMA_UBAH_MAKS) {
            return { ok: false, pesan: 'Nama pengguna hanya bisa diubah ' + NAMA_UBAH_MAKS + ' kali dalam ' + NAMA_UBAH_HARI + ' hari. Kamu bisa mengubahnya lagi pada ' + formatTanggalNama(ubah[0] + NAMA_UBAH_HARI * 86400000) + '.' };
        }

        // klaim nama (harus unik)
        if (data.kunci !== kunci) {
            const refKlaim = db.ref('nama_pengguna/' + kunci);
            const klaim = await refKlaim.once('value');
            const dipakai = { ok: false, pesan: 'Nama pengguna sudah dipakai orang lain. Silakan pilih nama pengguna lain.' };
            if (klaim.exists() && klaim.val() !== uid) return dipakai;
            if (!klaim.exists()) {
                const hasil = await refKlaim.transaction(cur => (cur === null ? uid : undefined));
                if (!hasil.committed) return dipakai;
            }
        }

        const up = {};
        up['pengguna/' + uid + '/nama'] = nama;
        up['pengguna/' + uid + '/kunci'] = kunci;
        up['pengguna/' + uid + '/diperbarui'] = sekarang;
        if (!data.dibuat) up['pengguna/' + uid + '/dibuat'] = sekarang;
        up['nama_uid/' + uid] = nama;
        if (gantiNama) {
            up['pengguna/' + uid + '/ubah/' + db.ref().push().key] = sekarang;
            up['pengguna/' + uid + '/riwayat/' + db.ref().push().key] = { nama: namaLama, waktu: sekarang };
            if (data.kunci) up['nama_pengguna/' + data.kunci] = null;      // lepas nama lama
        }
        await db.ref().update(up);

        simpanNama(nama);
        simpanLokal('luvia_nama_terdaftar', kunci);
        return { ok: true, nama: nama };
    } catch (e) {
        return { ok: false, pesan: 'Tidak dapat memeriksa nama pengguna sekarang. Coba lagi.' };
    }
}

// Pengganti siapkanPengirim() di form yang mengirim pesan (menunggu hasil pemeriksaan)
async function siapkanPengirimAsync(namaInput) {
    const info = siapkanPengirim(namaInput);
    if (!info.ok || info.isAdmin) return info;
    if (info.nama === ambilNama() && bacaLokal('luvia_nama_terdaftar') === kunciNama(info.nama)) return info;   // sudah terdaftar
    const hasil = await tetapkanNama(info.nama);
    if (!hasil.ok) return { ok: false, pesan: hasil.pesan };
    return { ok: true, nama: hasil.nama, isAdmin: false };
}

// Peta uid -> nama pengguna terkini (supaya nama di komentar ikut berubah)
const NAMA_UID = {};
let namaUidMulai = false;
function mulaiNamaUid() {
    if (namaUidMulai || typeof firebase === 'undefined' || !firebase.apps.length) return;
    namaUidMulai = true;
    firebase.database().ref('nama_uid').on('value', s => {
        Object.keys(NAMA_UID).forEach(k => delete NAMA_UID[k]);
        Object.assign(NAMA_UID, s.val() || {});
        window.dispatchEvent(new Event('luvia-nama-uid'));
    });
}
function namaTampil(uid, cadangan) { return (uid && NAMA_UID[uid]) || cadangan || 'Pengunjung'; }
function namaKomentar(c) { return c.isAdmin ? (c.name || ADMIN_PROFIL.nama) : namaTampil(c.uid, c.name); }


// ----------------------------------------------------------------------
//  LANGKAH 6  ->  STATUS ONLINE (untuk "terakhir online" di admin)
//  Tempel di PALING BAWAH videos-data.js.
// ----------------------------------------------------------------------
function mulaiPresence() {
    if (HALAMAN_ADMIN || IS_ADMIN_BROWSER || !cekStorage() || typeof firebase === 'undefined' || !firebase.apps.length) return;
    const ref = firebase.database().ref('presence/' + idPengguna());
    const ST = firebase.database.ServerValue.TIMESTAMP;
    const tulis = () => ref.set({ online: document.visibilityState === 'visible', last: ST });
    firebase.database().ref('.info/connected').on('value', s => {
        if (s.val() === true) { ref.onDisconnect().set({ online: false, last: ST }); tulis(); }
    });
    setInterval(tulis, 60000);
    document.addEventListener('visibilitychange', tulis);
}


// ----------------------------------------------------------------------
//  LANGKAH 7  ->  HELPER CHAT GAYA WHATSAPP (dipakai support.html & admin)
//  Tempel di PALING BAWAH videos-data.js.
// ----------------------------------------------------------------------
const WA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const WA_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function waJam(ts) {
    const d = new Date(ts);
    return String(d.getHours()).padStart(2, '0') + '.' + String(d.getMinutes()).padStart(2, '0');
}
function waSamaHari(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function waKunciHari(ts) { const d = new Date(ts); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
// Pemisah tanggal di dalam percakapan: Hari ini / Kemarin / Senin, 3 November 2026
function waLabelTanggal(ts) {
    const d = new Date(ts), n = new Date(), k = new Date();
    k.setDate(n.getDate() - 1);
    if (waSamaHari(d, n)) return 'Hari ini';
    if (waSamaHari(d, k)) return 'Kemarin';
    return WA_HARI[d.getDay()] + ', ' + d.getDate() + ' ' + WA_BULAN[d.getMonth()] + ' ' + d.getFullYear();
}
// Waktu di daftar kontak: jam (hari ini) / Kemarin / 03/11/2026
function waWaktuDaftar(ts) {
    if (!ts) return '';
    const d = new Date(ts), n = new Date(), k = new Date();
    k.setDate(n.getDate() - 1);
    if (waSamaHari(d, n)) return waJam(ts);
    if (waSamaHari(d, k)) return 'Kemarin';
    return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
}
function waTanggalLengkap(ts) {
    const d = new Date(ts);
    return WA_HARI[d.getDay()] + ', ' + d.getDate() + ' ' + WA_BULAN[d.getMonth()] + ' ' + d.getFullYear() + ' pukul ' + waJam(ts);
}
// Teks status di header admin: online / terakhir online ...
function waStatusOnline(p) {
    if (!p || !p.last) return 'Belum pernah terlihat online';
    if (p.online === true && (Date.now() - p.last) < 150000) return 'online';
    return 'terakhir online ' + waLabelTanggal(p.last).toLowerCase() + ' pukul ' + waJam(p.last);
}

// cfg: { milikku(m), namaPengirim(m), labelMasuk(m), tambahan(m), awalan, kosong }
function waBubble(m, cfg, peta) {
    const keluar = cfg.milikku(m);
    const hapus = !!m.deleted_for_everyone;
    let kutip = '';
    if (m.quote_text && !hapus) {
        const asal = m.quote_id ? peta[m.quote_id] : null;
        const nama = asal ? cfg.namaPengirim(asal) : 'Pesan';
        kutip = '<div class="wc-quote" data-quote="' + escHtmlGlobal(m.quote_id || '') + '"><b>' + escHtmlGlobal(nama) + '</b><span>' + escHtmlGlobal(m.quote_text) + '</span></div>';
    }
    const label = (!keluar && cfg.labelMasuk) ? cfg.labelMasuk(m) : '';
    let h = '<div class="wc-row ' + (keluar ? 'out' : 'in') + '" id="wcm-' + m.id + '" data-id="' + m.id + '"><div class="wc-bubble">' +
        (hapus ? '' : '<button type="button" class="wc-chev" data-act="menu" data-id="' + m.id + '" aria-label="Menu pesan">' + icon(IKON.panah) + '</button>') +
        label + kutip +
        '<div class="wc-teks">' + (hapus ? '<i class="wc-hapus">Pesan ini telah dihapus</i>' : escHtmlGlobal(m.isi)) + '</div>' +
        '<div class="wc-meta">' + ((m.is_edited && !hapus) ? '<span class="wc-edited">diedit</span>' : '') + '<span class="wc-jam">' + waJam(m.timestamp) + '</span></div>' +
        '</div></div>';
    if (cfg.tambahan && !hapus) h += cfg.tambahan(m) || '';
    return h;
}
function waRender(wadah, daftar, cfg) {
    const peta = {};
    daftar.forEach(m => { peta[m.id] = m; });
    let html = cfg.awalan || '', hari = '';
    daftar.forEach(m => {
        const k = waKunciHari(m.timestamp || Date.now());
        if (k !== hari) { hari = k; html += '<div class="wc-sep"><span>' + waLabelTanggal(m.timestamp || Date.now()) + '</span></div>'; }
        html += waBubble(m, cfg, peta);
    });
    wadah.innerHTML = html || (cfg.kosong || '');
}
function waKeBawah(wadah) { wadah.scrollTop = wadah.scrollHeight; }
function waDekatBawah(wadah) { return wadah.scrollHeight - wadah.scrollTop - wadah.clientHeight < 90; }
function waLompat(wadah, id) {
    const el = wadah.querySelector('#wcm-' + id);
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.classList.add('wc-flash');
    setTimeout(() => el.classList.remove('wc-flash'), 1400);
}

// Menu kecil (Balas / Edit / Hapus) di dekat tombol panah pada gelembung pesan
let waPenutup = null;
function waTutupMenu() {
    document.querySelectorAll('.wc-menu').forEach(m => m.remove());
    if (waPenutup) { document.removeEventListener('click', waPenutup); waPenutup = null; }
}
function waMenu(jangkar, daftar) {
    waTutupMenu();
    const menu = document.createElement('div');
    menu.className = 'wc-menu';
    daftar.forEach(it => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'wc-menu-item' + (it.bahaya ? ' bahaya' : '');
        b.innerHTML = icon(IKON[it.ikon] || it.ikon) + '<span>' + it.teks + '</span>';
        b.onclick = () => { waTutupMenu(); it.aksi(); };
        menu.appendChild(b);
    });
    document.body.appendChild(menu);
    const r = jangkar.getBoundingClientRect();
    const lebar = menu.offsetWidth, tinggi = menu.offsetHeight;
    const kiri = Math.min(Math.max(8, r.right - lebar), window.innerWidth - lebar - 8);
    let atas = r.bottom + 6;
    if (atas + tinggi > window.innerHeight - 8) atas = Math.max(8, r.top - tinggi - 6);
    menu.style.left = kiri + 'px';
    menu.style.top = atas + 'px';
    setTimeout(() => { waPenutup = waTutupMenu; document.addEventListener('click', waPenutup); }, 0);
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') waTutupMenu(); });


// ----------------------------------------------------------------------
//  PEMBERSIH HTML (untuk halaman Tentang Kami): buang script, onclick, dll
// ----------------------------------------------------------------------
function bersihkanHtml(html) {
    const doc = new DOMParser().parseFromString('<div>' + String(html || '') + '</div>', 'text/html');
    const root = doc.body.firstChild;
    const BOLEH = ['P','BR','DIV','SPAN','B','STRONG','I','EM','U','S','STRIKE','H1','H2','H3','H4','H5','H6','UL','OL','LI','A','IMG','BLOCKQUOTE','HR','FONT','SUB','SUP','MARK','FIGURE','FIGCAPTION'];
    const ATRIBUT = ['class','style','href','src','alt','target','rel','width','height','color','face','size','align','title'];
    (function telusuri(el) {
        Array.from(el.children).forEach(ch => {
            if (BOLEH.indexOf(ch.tagName) === -1) { ch.remove(); return; }
            Array.from(ch.attributes).forEach(a => {
                const n = a.name.toLowerCase(), v = a.value;
                if (ATRIBUT.indexOf(n) === -1) { ch.removeAttribute(a.name); return; }
                if ((n === 'href' || n === 'src') && /^\s*(javascript|vbscript|data(?!:image\/)):/i.test(v)) ch.removeAttribute(a.name);
                if (n === 'style' && /(expression|javascript|@import|position\s*:)/i.test(v)) ch.removeAttribute(a.name);
            });
            telusuri(ch);
        });
    })(root);
    return root.innerHTML;
}


// ----------------------------------------------------------------------
//  FONT KUSTOM (diunggah dari admin, disimpan di Firebase)
// ----------------------------------------------------------------------
function daftarkanFont(id, nama, v) {
    id = String(id).replace(/[^A-Za-z0-9_-]/g, '');
    if (!v || !v.data || !id || document.getElementById('ff-' + id)) return;
    if (['woff2', 'woff', 'truetype', 'opentype'].indexOf(v.format) === -1) return;
    if (!/^data:font\/(woff2|woff|ttf|otf);base64,[A-Za-z0-9+\/=]+$/.test(v.data)) return;
    const aman = String(nama || '').replace(/[^A-Za-z0-9 _-]/g, '').trim();
    if (!aman) return;
    const st = document.createElement('style');
    st.id = 'ff-' + id;
    st.textContent = '@font-face{font-family:"' + aman + '";src:url("' + v.data + '") format("' + v.format + '");font-display:swap;}';
    document.head.appendChild(st);
}

// Halaman publik: hanya mengunduh font yang benar-benar dipakai di isi halaman
function muatFontKhusus(root) {
    if (typeof firebase === 'undefined' || !firebase.apps.length || !root) return;
    const dipakai = {};
    root.querySelectorAll('[style], font[face]').forEach(el => {
        const f = (el.style && el.style.fontFamily) || el.getAttribute('face') || '';
        f.split(',').forEach(n => { const k = n.replace(/["']/g, '').trim().toLowerCase(); if (k) dipakai[k] = true; });
    });
    if (!Object.keys(dipakai).length) return;
    firebase.database().ref('site_pages/font_list').once('value').then(s => {
        const list = s.val() || {};
        Object.keys(list).forEach(id => {
            if (!dipakai[String(list[id].nama || '').toLowerCase()]) return;
            if (document.getElementById('ff-' + id)) return;
            firebase.database().ref('site_pages/font_data/' + id).once('value')
                .then(d => daftarkanFont(id, list[id].nama, d.val()));
        });
    }).catch(() => {});
}
