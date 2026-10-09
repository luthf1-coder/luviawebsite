// ==========================================
// PUSAT KOMANDO GLOBAL WEBSITE LUVIA
// ==========================================
const webConfig = {
    namaWebsite: "Luvia Insight Verse",
    teksFooter: "© 2026 Luvia Insight Verse (Product by Luvia Studio TV). All Right Reserved",
    
    // DAFTAR MENU SIDEBAR (Edit namanya atau linknya di sini!)
    menuSidebar: [
        { nama: "Home", link: "index.html" },
        { nama: "Videos", link: "videos.html" },
        { nama: "Program TV", link: "index.html#projects" },
        { nama: "Live Streaming", link: "index.html#livestreaming" },
        { nama: "Help Center", link: "support.html" },
        { nama: "About Us", link: "index.html#about" }
    ],

    // DAFTAR SOSIAL MEDIA
    sosialMedia: [
        { nama: "YouTube", link: "https://www.youtube.com/@luthfi-fx", gambar: "Asset Foto/logo/2.png" },
        { nama: "Instagram", link: "https://www.instagram.com/fauzanlathif_86", gambar: "Asset Foto/logo/1.png" },
        { nama: "TikTok", link: "https://www.tiktok.com/@fauzan_lathif", gambar: "Asset Foto/logo/3.png" },
        { nama: "UVideo", link: "https://www.dubbindo.site/@luviastudioofficialtv", gambar: "Asset Foto/logo/5.png" }
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
    // 1. CETAK SIDEBAR OTOMATIS
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        let linksHTML = '';
        webConfig.menuSidebar.forEach(menu => {
            linksHTML += `<a href="${menu.link}" onclick="toggleSidebar()">${menu.nama}</a>`;
        });

        sidebarContainer.innerHTML = `
            <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
            <div class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="index.html" class="sidebar-brand">
                        <img src="Asset Foto/Thumbnimail .png" alt="Logo">
                        <span class="nama-web-otomatis">${webConfig.namaWebsite}</span>
                    </a>
                    <button class="close-btn" onclick="toggleSidebar()">×</button>
                </div>
                <div class="sidebar-links">
                    ${linksHTML}
                </div>
                <div class="sidebar-footer">
                    <p style="font-size: 0.8rem; color: #bbb; text-align: center;">${webConfig.teksFooter}</p>
                </div>
            </div>
        `;
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

// Pusat Data Video
const videoList = [
    {
    "id": "kick_vod_129368659",
    "title": "VOD PLAY LIVE STREAMING LUVIA STUDIO TV",
    "defaultViews": 0,
    "thumb": "Asset Foto/Thumbnimail_VOD_LIVE.png",
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
    "thumb": "Asset Foto/Thumbnimail_VOD_LIVE.png",
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
    "thumb": "Asset Foto/Thumbnimail_VOD_LIVE.png",
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
    "thumb": "Asset Foto/Thumbnimail_VOD_LIVE.png",
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
                <img src="Asset Foto/live stream.png" alt="Live Streaming">
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
        html += `<div style="padding: 20px; color: #ffffff; font-weight: bold;">Video tidak ditemukan.</div>`;
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
                        <span id="view-count-slider-${vid.id}">👁️ Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                    </p>
                </div>
            `;
            container.appendChild(card);
            listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
                const el = document.getElementById(`view-count-slider-${vid.id}`);
                if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
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
                    <span id="view-count-trending-${vid.id}">👁️ Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                </p>
            </div>
        `;
        container.appendChild(card);
        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-trending-${vid.id}`);
            if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
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
                    <span id="view-count-grid-${vid.id}">👁️ Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                </p>
            </div>
        `;
        container.appendChild(card);

        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-grid-${vid.id}`);
            if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
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
                    <span id="view-count-all-${vid.id}">👁️ Memuat...</span>${uploadTime ? ' • ' + uploadTime : ''}
                </p>
            </div>
        `;
        container.appendChild(card);
        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-all-${vid.id}`);
            if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
        });
    });
}
// ==============================================================================


// ==========================================
// 4. SISTEM PENCARIAN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const searchForms = document.querySelectorAll('.nav-search');

    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const query = input ? input.value.trim() : '';
            if (!query) return;

            const isHomePage = window.location.pathname.endsWith('videos.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

            if (isHomePage) {
                executeSearchOnHome(query);
            } else {
                window.location.href = `videos.html?search=${encodeURIComponent(query)}`;
            }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const isHomePage = window.location.pathname.endsWith('videos.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    if (searchQuery && isHomePage) {
        const input = document.querySelector('.nav-search input');
        if (input) input.value = searchQuery;
        executeSearchOnHome(searchQuery);
    }
});

function executeSearchOnHome(query) {
    const q = query.toLowerCase();
    
    // UPDATE: Sekarang pencarian akan mengecek Judul, Genre, Tanggal, dan Deskripsi
    const filteredVideos = videoList.filter(vid => 
        (vid.title && vid.title.toLowerCase().includes(q)) || 
        (vid.genre && vid.genre.toLowerCase().includes(q)) ||
        (vid.uploadDate && vid.uploadDate.includes(q)) ||
        (vid.description && vid.description.toLowerCase().includes(q))
    );

    const sectionTitle = document.querySelector('#recommendations h2');
    if (sectionTitle) {
        sectionTitle.innerText = `Hasil Pencarian: "${query}" (${filteredVideos.length})`;
    }

    renderSliderRecommendations('home-recommendations-slider', filteredVideos);

    const recSection = document.getElementById('recommendations');
    if (recSection) {
        recSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// =================================================================
// KODE TAMBAHAN UNTUK JALUR HYBRID (BOT GITHUB + ADMIN FIREBASE)
// =================================================================

// 1. Simpan salinan video dari bot
const botVideos = [...videoList]; 

// 2. Fungsi untuk menarik video manual dari Admin Panel Firebase
// 2. Fungsi untuk menarik video manual dari Admin Panel Firebase
function muatDataDariFirebase() {
    if (typeof firebase === 'undefined') return;
    
    firebase.database().ref('videos_manual').on('value', (snapshot) => {
        let adminVideos = [];
        let adminIds = []; // Simpan ID dari Firebase
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.keys(data).forEach(key => {
                adminVideos.push(data[key]);
                adminIds.push(data[key].id);
            });
        }
        
        // PENTING: Ambil video Bot yang ID-nya TIDAK ADA di Firebase (Mencegah Duplikat)
        const filteredBotVideos = botVideos.filter(v => !adminIds.includes(v.id));
        
        // Gabungkan video Bot (yang tidak diedit) + Video Admin (Firebase)
        videoList.length = 0; 
        videoList.push(...filteredBotVideos, ...adminVideos); 
        
        // Beri sinyal ke website untuk memperbarui tampilan video
        window.dispatchEvent(new Event('videoDataReady'));
    });
}
// Jalankan sistem hybrid
muatDataDariFirebase();

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
