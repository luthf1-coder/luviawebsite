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
        // Solusi Direct Download YouTube (Mengarahkan ke service download/direct file)
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
    // {
    //     id: "video3",
    //     title: "Dokumenter Spesial Multi-Resolusi (Archive.org)",
    //     defaultViews: 45,
    //     thumb: "Asset Foto/Thumbnimail  Banner YT.png",
    //     // Multi-resolusi khusus Archive.org / Direct MP4
    //     sources: [
    //         { src: "https://archive.org/download/nama_item_kamu/video_360p.mp4", size: 360, type: "video/mp4" },
    //         { src: "https://archive.org/download/nama_item_kamu/video_720p.mp4", size: 720, type: "video/mp4" },
    //         { src: "https://archive.org/download/nama_item_kamu/video_1080p.mp4", size: 1080, type: "video/mp4" }
    //     ],
    //     description: "Sesi dokumenter eksklusif dengan pilihan resolusi pemutar dan tombol unduh sesuai kualitas."
    // },
    // {
    //     id: "video4",
    //     title: "REKAMAN LIVE SPECIAL RUMBLE",
    //     defaultViews: 50,
    //     thumb: "Asset Foto/live stream.png",
    //     archiveSrc: "",
    //     driveEmbed: "",
    //     youtubeId: "",
    //     rumbleEmbed: "https://rumble.com/embed/vxxxxxx/",
    //     // Solusi 2: Direct MP4 Link dari Dashboard Rumble
    //     downloadUrl: "https://ak.rumble.com/vxxxxxx.mp4", 
    //     description: "Hasil rekaman siaran langsung dari platform Rumble."
    // },
    // {
    //     id: "video5",
    //     title: "Contoh Video Google Drive",
    //     defaultViews: 10,
    //     thumb: "Asset Foto/Thumbnimail  Banner YT.png",
    //     archiveSrc: "",
    //     driveEmbed: "https://drive.google.com/file/d/1b6MY1_Yf3rsJ6HAynCp9i9nGU7Jt4fqf/preview",
    //     youtubeId: "",
    //     rumbleEmbed: "",
    //     // Solusi Direct Download Google Drive (Format export=download)
    //     downloadUrl: "https://drive.google.com/uc?export=download&id=1b6MY1_Yf3rsJ6HAynCp9i9nGU7Jt4fqf",
    //     description: "Video sampel yang tersimpan di Google Drive."
    // }
];

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
            // Fallback jika terkena pembatasan CORS server (akan membuka link download langsung)
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || 'video-luvia-tv.mp4';
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
}

// --- SISTEM PENONTON LIVE REALTIME (OPSI 2: TAB/SESSION COUNTER) ---
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
