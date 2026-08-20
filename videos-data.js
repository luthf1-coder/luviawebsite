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
        id: "video1",
        title: "Special Dokumenter for MOVAST & VROEG SAMEN While in Al-Bahjah Cianjur",
        defaultViews: 0,
        thumb: "https://img.youtube.com/vi/U6N_8dUF30g/maxresdefault.jpg", 
        archiveSrc: "",
        driveEmbed: "",
        youtubeId: "U6N_8dUF30g",
        rumbleEmbed: "",
        downloadUrl: "https://www.ssyoutube.com/watch?v=U6N_8dUF30g", 
        description: "Semua tentang sebuah Kebersamaan dan Kebahagiaan Angkatan 7 (SMPIQu) & dan Angkatan 1 (SMAIQu) di LPD Al-Bahjah Cianjur"
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
        description: "Semua tentang sebuah Kebersamaan dan Kebahagiaan Angkatan 7 (SMPIQu) & dan Angkatan 1 (SMAIQu) di LPD Al-Bahjah Cianjur"
    },
    {
        id: "video6",
        title: "Detective Conan: Episode One - The Great Detective Turned Small Dubbing Indonesia",
        defaultViews: 10,
        thumb: "Asset Foto/Thumbnimail  Banner YT.png",
        archiveSrc: "https://cdn.dubbindo.site/driveduo/uploads/34eeded7-a628-47a1-90ff-13fb45a4ad83/34eeded7-a628-47a1-90ff-13fb45a4ad83",
        driveEmbed: "",
        youtubeId: "",
        rumbleEmbed: "",
        customEmbed: "",
        downloadUrl: "https://cdn.dubbindo.site/driveduo/uploads/34eeded7-a628-47a1-90ff-13fb45a4ad83/34eeded7-a628-47a1-90ff-13fb45a4ad83",
        description: ""
    }
];

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
// 3. FUNGSI RENDER REKOMENDASI (GLOBAL VIEWS)
// ==========================================

// Render Slider di Halaman Utama (index.html)
function renderSliderRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const liveCount = getActiveLiveViewers();
    let html = `
        <a href="livestream.html" class="slider-card featured-live">
            <div class="thumb-box">
                <span id="kick-home-badge" class="badge-live">🔴 SEDANG LIVE (${liveCount} Penonton)</span>
                <img src="Asset Foto/live stream.png" alt="Live Streaming">
            </div>
            <div class="slider-details">
                <h3>LIVE STREAMING LUVIA STUDIO TV</h3>
                <p>Siaran Langsung • Klik Untuk Nonton</p>
            </div>
        </a>
    `;

    if (list.length === 0) {
        html += `<div style="padding: 20px; color: #ffffff; font-weight: bold;">Video tidak ditemukan.</div>`;
        container.innerHTML = html;
    } else {
        container.innerHTML = html;
        list.forEach(vid => {
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

            // Pasang Listener Realtime Per Video
            listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
                const el = document.getElementById(`view-count-slider-${vid.id}`);
                if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
            });
        });
    }
}

// Render Grid di Halaman Nonton & Live Stream (watch.html & livestream.html)
function renderGridRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Ambil kartu live jika ada di dalam container
    const liveCard = container.querySelector('.featured-live-card');
    container.innerHTML = liveCard ? liveCard.outerHTML : '';

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

        // Pasang Listener Realtime Per Video
        listenVideoViews(vid.id, vid.defaultViews || 0, (totalViews) => {
            const el = document.getElementById(`view-count-grid-${vid.id}`);
            if (el) el.innerText = `👁️ ${formatViews(totalViews)}`;
        });
    });
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

            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

            if (isHomePage) {
                executeSearchOnHome(query);
            } else {
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

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
