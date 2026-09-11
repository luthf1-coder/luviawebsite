// ==========================================
// 1. KONFIGURASI FIREBASE REALTIME DATABASE
// ==========================================
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

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Pusat Data Video
const videoList = [
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
    "genre": "Live Stream",
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
    "genre": "Live Stream",
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
        genre: "Dokumenter",
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
        genre: "Dokumenter",
        uploadDate: "2026-07-20"
    },
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
        uploadDate: "2026-09-01"
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
    }
];

// ==========================================
// FUNGSI BANTUAN TANGGAL & WAKTU
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

function formatViews(views) {
    const num = parseInt(views, 10);
    if (isNaN(num)) return '0 Ditonton';
    return num.toLocaleString('id-ID') + ' Ditonton';
}

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
// 3. FUNGSI RENDER REKOMENDASI (GLOBAL VIEWS)
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

// Render Slider di Halaman Utama (index.html)
function renderSliderRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sortedList = [...list].sort((a, b) => (b.defaultViews || 0) - (a.defaultViews || 0)).slice(0, 4);

    let html = `
        <a href="livestream.html" class="slider-card featured-live">
            <div class="thumb-box">
                <span id="kick-home-badge" class="badge-live">🔍 Memeriksa...</span>
                <img src="Asset Foto/live stream.png" alt="Live Streaming">
            </div>
            <div class="slider-details">
                <h3>LIVE STREAMING LUVIA STUDIO TV</h3>
                <p>Siaran Langsung • Klik Untuk Nonton</p>
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
            card.innerHTML = `
                <div class="thumb-box">
                    <img src="${vid.thumb}" alt="${vid.title}">
                </div>
                <div class="slider-details">
                    <h3>${vid.title}</h3>
                    <p id="view-count-slider-${vid.id}">👁️ Memuat...</p>
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

// Render Grid di Halaman Nonton & Live Stream
function renderGridRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const isLivePage = window.location.pathname.includes('livestream.html');
    let html = '';

    if (!isLivePage) {
        html = `
            <a href="livestream.html" class="video-card featured-live-card">
                <div class="thumb-box">
                    <span id="kick-watch-badge" class="badge-live">🔍 Memeriksa...</span>
                    <img src="Asset Foto/live stream.png" alt="Live Streaming">
                </div>
                <div class="video-details">
                    <h3>LIVE STREAMING LUVIA STUDIO TV</h3>
                    <p>LUVIA STUDIO TV • LIVE</p>
                </div>
            </a>
        `;
    }

    container.innerHTML = html;

    list.forEach(vid => {
        const card = document.createElement('a');
        card.href = `watch.html?id=${vid.id}`;
        card.className = 'video-card';
        card.innerHTML = `
            <div class="thumb-box">
                <img src="${vid.thumb}" alt="${vid.title}">
            </div>
            <div class="video-details">
                <h3>${vid.title}</h3>
                <p>LUVIA STUDIO TV • <span id="view-count-grid-${vid.id}">👁️ Memuat...</span></p>
            </div>
        `;
        container.appendChild(card);

        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-grid-${vid.id}`);
            if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
        });
    });

    if (!isLivePage) {
        updateKickBadgeStatus('kick-watch-badge');
    }
}

// Render Videos Halaman Daftar
function renderAllVideosPage(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
        <a href="livestream.html" class="video-card featured-live-card">
            <div class="thumb-box">
                <span id="kick-all-badge" class="badge-live">🔍 Memeriksa...</span>
                <img src="Asset Foto/live stream.png" alt="Live Streaming">
            </div>
            <div class="video-details">
                <h3>LIVE STREAMING LUVIA STUDIO TV</h3>
                <p>LUVIA STUDIO TV • LIVE</p>
            </div>
        </a>
    `;

    container.innerHTML = html;

    list.forEach(vid => {
        const card = document.createElement('a');
        card.href = `watch.html?id=${vid.id}`;
        card.className = 'video-card';
        card.innerHTML = `
            <div class="thumb-box">
                <img src="${vid.thumb}" alt="${vid.title}">
            </div>
            <div class="video-details">
                <h3>${vid.title}</h3>
                <p>LUVIA STUDIO TV • <span id="view-count-all-${vid.id}">👁️ Memuat...</span></p>
            </div>
        `;
        container.appendChild(card);

        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-all-${vid.id}`);
            if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
        });
    });

    updateKickBadgeStatus('kick-all-badge');
}


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
    const filteredVideos = videoList.filter(vid => 
        vid.title.toLowerCase().includes(q) || 
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
