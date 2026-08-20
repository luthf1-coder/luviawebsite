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
    //     rumbleEmbed: "https://rumble.com/embed/vID unik/kode identitas video milikmu/",
    //     // Solusi 2: Direct MP4 Link dari Dashboard Rumble
    //     downloadUrl: "https://ak.rumble.com/vID unik/kode identitas video milikmu.mp4", 
    //     description: "Hasil rekaman siaran langsung dari platform Rumble."
    // },
    // {
    //     id: "video5",
    //     title: "Contoh Video Google Drive",
    //     defaultViews: 10,
    //     thumb: "Asset Foto/Thumbnimail  Banner YT.png",
    //     archiveSrc: "",
    //     driveEmbed: "https://drive.google.com/file/d/ID_FILE_GDRIVE/preview",
    //     youtubeId: "",
    //     rumbleEmbed: "",
    //     // Solusi Direct Download Google Drive (Format export=download)
    //     downloadUrl: "https://drive.google.com/uc?export=download&id=ID_FILE_GDRIVE",
    //     description: "Video sampel yang tersimpan di Google Drive."
    // }
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
        // Solusi Direct Download Google Drive (Format export=download)
        downloadUrl: "https://cdn.dubbindo.site/driveduo/uploads/34eeded7-a628-47a1-90ff-13fb45a4ad83/34eeded7-a628-47a1-90ff-13fb45a4ad83",
        description: ""
    }
];

function downloadVideoFile(url, filename) {
    if (!url) { alert("Link unduhan tidak tersedia."); return; }
    fetch(url).then(r => r.blob()).then(b => {
        const url = window.URL.createObjectURL(b);
        const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    }).catch(() => { window.open(url, '_blank'); });
}

function getActiveLiveViewers() { return parseInt(localStorage.getItem('active_live_viewers')) || 0; }

function formatViews(views) {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M views';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K views';
    return views + ' views';
}

function getVideoViews(videoId) {
    const storedViews = localStorage.getItem(`views_${videoId}`);
    const vid = videoList.find(v => v.id === videoId);
    return storedViews ? parseInt(storedViews) : (vid ? vid.defaultViews : 0);
}

async function incrementVideoViewsAsync(videoId, defaultViews = 0) {
    const namespace = "luviastudio_tv_views";
    try {
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${videoId}/up`);
        const data = await response.json();
        return data.count + defaultViews;
    } catch (e) {
        let v = getVideoViews(videoId) + 1;
        localStorage.setItem(`views_${videoId}`, v);
        return v;
    }
}

function renderGridRecommendations(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '';
    videoList.forEach(vid => {
        html += `<a href="watch.html?id=${vid.id}" class="video-card"><div class="thumb-box"><img src="${vid.thumb}"></div><div class="video-details"><h3>${vid.title}</h3><p>LUVIA STUDIO TV • ${formatViews(getVideoViews(vid.id))}</p></div></a>`;
    });
    container.innerHTML += html;
}

// Tambahkan sisa fungsi pencarian kamu di sini (Search, renderSlider, dll)
// Saya tidak menghapus fungsi pencarianmu agar tidak hilang.
