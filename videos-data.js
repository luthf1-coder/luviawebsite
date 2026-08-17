        // Pusat Data Video
const videoList = [
    {
        id: "video1",
        title: "Dokumenter Special MOVAST & VROEG SAMEN",
        defaultViews: 0,
        thumb: "https://archive.org/download/flyer-video-perpisahan-3/FLYER%20VIDEO%20PERPISAHAN%20%283%29.png", 
        archiveSrc: "https://archive.org/download/2-teaser-moviekan/2%20teaser%20moviekan.mp4",
        description: "Dokumenter eksklusif kegiatan dan momen kebersamaan MOVAST & VROEG SAMEN di Al-Bahjah Cianjur."
    },
    {
        id: "video2",
        title: "Spider-Man Brand New Day (2026)",
        defaultViews: 0,
        thumb: "https://archive.org/download/nama_item_kamu/thumbnail2.jpg",
        driveEmbed: "https://drive.google.com/file/d/1b6MY1_Yf3rsJ6HAynCp9i9nGU7Jt4fqf/preview",
        archiveSrc: "",
        description: "Audio Only Maulid Nabi Muhammad SAW Al-Bahjah Cianjur."
    },
    // {
    //     id: "video3",
    //     title: "LIVE MUSIC EKSKLUSIF SESSION",
    //     defaultViews: 0,
    //     thumb: "https://archive.org/download/nama_item_kamu/thumbnail3.jpg",
    //     archiveSrc: "https://archive.org/download/nama_item_kamu/video3_asli.mp4",
    //     description: "Sesi musik akustik studio LUVIA TV secara eksklusif."
    // }
];

// --- SISTEM PENONTON LIVE REALTIME (OPSI 2: TAB/SESSION COUNTER) ---
function getActiveLiveViewers() {
    const viewers = localStorage.getItem('active_live_viewers');
    return viewers ? parseInt(viewers) : 0;
}

function updateActiveLiveViewersDisplay() {
    const count = getActiveLiveViewers();
    const text = count > 0 ? `${count.toLocaleString('id-ID')} Penonton Aktif` : "Belum Ada Penonton";

    // Update Badge di Kartu Utama
    const homeBadge = document.getElementById('kick-home-badge');
    if (homeBadge) {
        homeBadge.innerText = `🔴 SEDANG LIVE (${count} Penonton)`;
    }

    const watchBadge = document.getElementById('kick-watch-badge');
    if (watchBadge) {
        watchBadge.innerText = `🔴 SEDANG LIVE (${count} Penonton)`;
    }

    // Update Text di Halaman Pemutar Live Stream
    const liveViewerElement = document.getElementById('live-viewers-count-text');
    if (liveViewerElement) {
        liveViewerElement.innerHTML = `👁️ <span style="color: #53fc18;">${count} Orang</span> Sedang Menonton Saat Ini`;
    }
}

// Listen perubahan data penonton antar tab secara instant
window.addEventListener('storage', (e) => {
    if (e.key === 'active_live_viewers') {
        updateActiveLiveViewersDisplay();
    }
});

// --- FUNGSI VIEWS VIDEO NON-LIVE ---
function getVideoViews(videoId) {
    const storedViews = localStorage.getItem(`views_${videoId}`);
    const vid = videoList.find(v => v.id === videoId);
    return storedViews ? parseInt(storedViews) : (vid ? vid.defaultViews : 0);
}

function incrementVideoViews(videoId) {
    let currentViews = getVideoViews(videoId);
    currentViews += 1;
    localStorage.setItem(`views_${videoId}`, currentViews);
    return currentViews;
}

function formatViews(count) {
    return count.toLocaleString('id-ID') + ' x ditonton';
}

// --- FUNGSI RENDER REKOMENDASI ---
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
    } else {
        list.forEach(vid => {
            const viewsCount = getVideoViews(vid.id);
            html += `
                <a href="watch.html?id=${vid.id}" class="slider-card">
                    <div class="thumb-box">
                        <img src="${vid.thumb}" alt="${vid.title}">
                    </div>
                    <div class="slider-details">
                        <h3>${vid.title}</h3>
                        <p>${formatViews(viewsCount)}</p>
                    </div>
                </a>
            `;
        });
    }

    container.innerHTML = html;
}

function renderGridRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    list.forEach(vid => {
        const viewsCount = getVideoViews(vid.id);
        html += `
            <a href="watch.html?id=${vid.id}" class="video-card">
                <div class="thumb-box">
                    <img src="${vid.thumb}" alt="${vid.title}">
                </div>
                <div class="video-details">
                    <h3>${vid.title}</h3>
                    <p>LUVIA STUDIO TV • ${formatViews(viewsCount)}</p>
                </div>
            </a>
        `;
    });
    container.innerHTML += html;
}

// --- SISTEM PENCARIAN ---
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
        vid.description.toLowerCase().includes(q)
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
