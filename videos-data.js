// Cukup isi link direct video & gambar dari Archive.org di sini!
const videoList = [
    {
        id: "video1",
        title: "Dokumenter Special MOVAST & VROEG SAMEN",
        views: "Eksklusif",
        // Pastikan 'thumb' mengarah ke link direct gambar Archive.org
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

// Fungsi memuat kartu ke Slider Horizontal (Halaman Utama)
function renderSliderRecommendations(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    videoList.forEach(vid => {
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
    container.innerHTML += html;
}

// Fungsi memuat kartu ke Grid (Halaman Watch & Live)
function renderGridRecommendations(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    videoList.forEach(vid => {
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
