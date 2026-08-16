// Cukup tambah/edit daftar video di sini! Otomatis memperbarui rekomendasi & sistem pencarian.
const videoList = [
    {
        id: "video1",
        title: "Dokumenter Special MOVAST & VROEG SAMEN",
        views: "Eksklusif",
        thumb: "Asset Foto/Thumbnimail  Banner YT.png", 
        archiveSrc: "https://archive.org/download/2-teaser-moviekan/2%20teaser%20moviekan.mp4",
        description: "Dokumenter eksklusif kegiatan dan momen kebersamaan MOVAST & VROEG SAMEN di Al-Bahjah Cianjur."
    },
    {
        id: "video2",
        title: "AUDIO MAULID NABI MUHAMMAD SAW",
        views: "10rb x ditonton",
        thumb: "https://archive.org/download/nama_item_kamu/thumbnail2.jpg",
        archiveSrc: "https://archive.org/download/nama_item_kamu/video2_asli.mp4",
        description: "Audio Only Maulid Nabi Muhammad SAW Al-Bahjah Cianjur."
    },
    {
        id: "video3",
        title: "LIVE MUSIC EKSKLUSIF SESSION",
        views: "5rb x ditonton",
        thumb: "https://archive.org/download/nama_item_kamu/thumbnail3.jpg",
        archiveSrc: "https://archive.org/download/nama_item_kamu/video3_asli.mp4",
        description: "Sesi musik akustik studio LUVIA TV secara eksklusif."
    }
];

// Fungsi Memuat Kartu ke Slider (Halaman Utama)
function renderSliderRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
        <a href="livestream.html" class="slider-card featured-live">
            <div class="thumb-box">
                <span id="kick-home-badge" class="badge-live">🔴 CHECKING...</span>
                <img src="Asset Foto/Thumbnimail  Banner YT.png" alt="Live Streaming">
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
            html += `
                <a href="watch.html?id=${vid.id}" class="slider-card">
                    <div class="thumb-box">
                        <img src="${vid.thumb}" alt="${vid.title}">
                    </div>
                    <div class="slider-details">
                        <h3>${vid.title}</h3>
                        <p>${vid.views}</p>
                    </div>
                </a>
            `;
        });
    }

    container.innerHTML = html;
}

// Fungsi Memuat Kartu ke Grid (Halaman Watch & Live)
function renderGridRecommendations(containerId, list = videoList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    list.forEach(vid => {
        html += `
            <a href="watch.html?id=${vid.id}" class="video-card">
                <div class="thumb-box">
                    <img src="${vid.thumb}" alt="${vid.title}">
                </div>
                <div class="video-details">
                    <h3>${vid.title}</h3>
                    <p>LUVIA STUDIO TV • ${vid.views}</p>
                </div>
            </a>
        `;
    });
    container.innerHTML += html;
}

// --- SISTEM PENCARIAN OTOMATIS (SEARCH ENGINE) ---
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
                // Jika mencari dari halaman lain, alihkan ke Beranda + parameter kata kunci
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            }
        });
    });

    // Cek apakah ada query pencarian dari URL (saat datang dari halaman lain)
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    if (searchQuery && isHomePage) {
        const input = document.querySelector('.nav-search input');
        if (input) input.value = searchQuery;
        executeSearchOnHome(searchQuery);
    }
});

// Fungsi Eksekusi Filter & Scroll ke Hasil Pencarian
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

    if (typeof updateHomeLiveBadge === 'function') {
        updateHomeLiveBadge();
    }
}
