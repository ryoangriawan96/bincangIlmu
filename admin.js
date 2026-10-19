
/* Admin Dashboard Logic */

document.addEventListener('DOMContentLoaded', () => {
    requireAdminAccess().then(() => {
        return loadAdminCollections();
    }).then(() => {
        updateStats();
        loadAdminKitabs();
        loadAdminCourses();
        loadAdminBlogs();
        loadAdminFatwas();
        loadAdminAds();
        loadAdminPartners();
        loadDonationCardForm();
        document.getElementById('donationCardImage')?.addEventListener('input', updateDonationCardImagePreview);
        renderUsers();
        loadAdminSiteSettings();
    }).catch(() => { window.location.replace('index.html'); });
});

async function requireAdminAccess() {
    const token = sessionStorage.getItem('authToken');
    if (!token) throw new Error('Login admin diperlukan');
    const apiBase = (window.API_BASE || '/api').replace(/\/$/, '');
    const response = await fetch(`${apiBase}/users`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error('Akses admin ditolak');
    sessionStorage.setItem('adminUsers', JSON.stringify(await response.json()));
}

async function loadAdminCollections() {
    const collections = [
        ['kitab', kitabData], ['courses', coursesData], ['blogs', blogsData],
        ['fatwas', fatwasData], ['ads', adsData], ['partners', partnersData]
    ];
    for (const [endpoint, map] of collections) {
        const current = await adminApi(`/${endpoint}`, 'GET');
        if (current.length === 0) {
            for (const [id, value] of Object.entries(map)) {
                current.push(await adminApi(`/${endpoint}`, 'POST', { ...value, id }));
            }
        } else if (endpoint === 'ads' && !current.some(item => item.id === 'donation-card')) {
            current.push(await adminApi('/ads', 'POST', { ...map['donation-card'], id: 'donation-card' }));
        }
        Object.keys(map).forEach(id => delete map[id]);
        Object.assign(map, Object.fromEntries(current.map(item => [item.id, item])));
    }
}

async function saveContent(endpoint, map, id, value) {
    const previous = map[id];
    const saved = previous
        ? await adminApi(`/${endpoint}/${encodeURIComponent(previous.id || id)}`, 'PUT', value)
        : await adminApi(`/${endpoint}`, 'POST', { ...value, id });
    map[id] = saved;
    return saved;
}

async function deleteContent(endpoint, map, id) {
    const item = map[id];
    if (item) await adminApi(`/${endpoint}/${encodeURIComponent(item.id || id)}`, 'DELETE');
    delete map[id];
}

// Tab Switching
function switchTab(tabId, element = null) {
    if (event) event.preventDefault();
    document.querySelectorAll('.admin-nav-link').forEach(link => link.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    } else if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    document.querySelectorAll('.admin-section').forEach(section => section.style.display = 'none');
    document.getElementById(`tab-${tabId}`).style.display = 'block';
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Update Dashboard Stats
function updateStats() {
    document.getElementById('statKitabCount').innerText = Object.keys(kitabData).length;
    document.getElementById('statCourseCount').innerText = Object.keys(coursesData).length;
    document.getElementById('statBlogCount').innerText = Object.keys(blogsData).length;
    document.getElementById('statFatwaCount').innerText = Object.keys(fatwasData).length;
    
    // User & Ad stats
    const usersCount = JSON.parse(sessionStorage.getItem('adminUsers') || '[]').length;
    const statUserEl = document.getElementById('statUserCount');
    if (statUserEl) statUserEl.innerText = usersCount;
    
    const adsCount = Object.keys(adsData || {}).filter(id => id !== 'top-banner').length;
    const statAdEl = document.getElementById('statAdCount');
    if (statAdEl) statAdEl.innerText = adsCount;
}

/* ================== KITAB CRUD ================== */
function loadAdminKitabs() {
    const tbody = document.getElementById('kitabTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, kitab] of Object.entries(kitabData)) {
        tbody.innerHTML += `
            <tr>
                <td><div style="width:30px;height:40px;background:${kitab.bgColor};border-radius:4px;"></div></td>
                <td><strong>${kitab.title}</strong><br><small>${key}</small></td>
                <td><span class="category-pill">${kitab.category}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editKitab('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteKitab('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openKitabModal() {
    document.getElementById('kitabForm').reset();
    document.getElementById('kitabKey').readOnly = false;
    document.getElementById('kitabModalTitle').innerText = 'Tambah Kitab Baru';
    openModal('kitabModal');
}

function editKitab(key) {
    const kitab = kitabData[key];
    if (!kitab) return;
    document.getElementById('kitabKey').value = key;
    document.getElementById('kitabKey').readOnly = true;
    document.getElementById('kitabTitle').value = kitab.title;
    document.getElementById('kitabAuthor').value = kitab.author;
    document.getElementById('kitabCategory').value = kitab.category;
    document.getElementById('kitabDesc').value = kitab.desc;
    document.getElementById('kitabImage').value = kitab.image || "";
    document.getElementById('kitabBg').value = kitab.bgColor;
    document.getElementById('kitabModalTitle').innerText = 'Edit Kitab';
    openModal('kitabModal');
}

async function saveKitab(event) {
    event.preventDefault();
    const key = document.getElementById('kitabKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    const item = {
        title: document.getElementById('kitabTitle').value,
        author: document.getElementById('kitabAuthor').value,
        category: document.getElementById('kitabCategory').value,
        desc: document.getElementById('kitabDesc').value,
        bgColor: document.getElementById('kitabBg').value,
        image: document.getElementById('kitabImage').value
    };
    
    try { await saveContent('kitab', kitabData, key, item); } catch (error) { return alert(error.message); }
    closeModal('kitabModal');
    loadAdminKitabs();
    updateStats();
}

async function deleteKitab(key) {
    if (confirm(`Hapus kitab "${key}"?`)) {
        try { await deleteContent('kitab', kitabData, key); } catch (error) { return alert(error.message); }
        loadAdminKitabs();
        updateStats();
    }
}

/* ================== COURSES CRUD ================== */
function loadAdminCourses() {
    const tbody = document.getElementById('courseTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, course] of Object.entries(coursesData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><strong>${course.title}</strong></td>
                <td>${course.instructor}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editCourse('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCourse('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openCourseModal() {
    document.getElementById('courseForm').reset();
    document.getElementById('courseKey').readOnly = false;
    document.getElementById('courseModalTitle').innerText = 'Tambah Kursus Baru';
    
    // Reset Curriculum Builder with 1 empty module
    const builder = document.getElementById('curriculumBuilder');
    builder.innerHTML = '';
    addModuleUI();

    openModal('courseModal');
}

function editCourse(key) {
    const course = coursesData[key];
    if (!course) return;
    document.getElementById('courseKey').value = key;
    document.getElementById('courseKey').readOnly = true;
    document.getElementById('courseTitle').value = course.title;
    document.getElementById('courseInstructor').value = course.instructor;
    document.getElementById('courseCategory').value = course.category;
    document.getElementById('courseImage').value = course.image || "";
    document.getElementById('courseDesc').value = course.desc;
    document.getElementById('courseModalTitle').innerText = 'Edit Kursus';

    // Render Curriculum
    const builder = document.getElementById('curriculumBuilder');
    builder.innerHTML = '';
    
    if (course.curriculum && course.curriculum.length > 0) {
        course.curriculum.forEach(mod => {
            const modEl = addModuleUI(mod.title);
            if (mod.lessons && mod.lessons.length > 0) {
                mod.lessons.forEach(lesson => {
                    addVideoUI(modEl, lesson.title, lesson.video);
                });
            }
        });
    } else {
        addModuleUI();
    }

    openModal('courseModal');
}

/* --- CURRICULUM BUILDER LOGIC --- */
function addModuleUI(title = '') {
    const builder = document.getElementById('curriculumBuilder');
    const modBox = document.createElement('div');
    modBox.className = 'module-box';
    
    modBox.innerHTML = `
        <button type="button" class="builder-remove-btn" onclick="this.parentElement.remove()" title="Hapus Modul"><i class="fas fa-trash"></i></button>
        <div class="module-header">
            <input type="text" class="mod-title-input" placeholder="Judul Modul (Contoh: Modul 1: Pengantar)" value="${title}" style="width: 85%; font-weight:bold; font-size:1.05rem;" required>
        </div>
        <div class="video-list"></div>
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addVideoUI(this.parentElement)"><i class="fas fa-plus"></i> Tambah Video</button>
    `;
    
    builder.appendChild(modBox);
    return modBox; // return element for chaining
}

function addVideoUI(modBox, title = '', videoUrl = '') {
    const videoList = modBox.querySelector('.video-list');
    const vidBox = document.createElement('div');
    vidBox.className = 'video-box';
    
    vidBox.innerHTML = `
        <button type="button" class="builder-remove-btn" style="top:5px; right:5px;" onclick="this.parentElement.remove()" title="Hapus Video"><i class="fas fa-times"></i></button>
        <input type="text" class="vid-title-input" placeholder="Judul Video (Contoh: Episode 1)" value="${title}" required>
        <input type="text" class="vid-url-input" placeholder="Link Video (Gunakan URL Embed YouTube)" value="${videoUrl}" required>
    `;
    
    videoList.appendChild(vidBox);
}

function getCurriculumData() {
    const curriculum = [];
    const modBoxes = document.querySelectorAll('#curriculumBuilder .module-box');
    
    modBoxes.forEach(modBox => {
        const modTitle = modBox.querySelector('.mod-title-input').value;
        const lessons = [];
        
        const vidBoxes = modBox.querySelectorAll('.video-box');
        vidBoxes.forEach(vidBox => {
            lessons.push({
                title: vidBox.querySelector('.vid-title-input').value,
                video: vidBox.querySelector('.vid-url-input').value
            });
        });
        
        curriculum.push({
            title: modTitle,
            lessons: lessons
        });
    });
    
    return curriculum;
}
/* -------------------------------- */

async function saveCourse(event) {
    event.preventDefault();
    const key = document.getElementById('courseKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    // Parse the DOM to get the curriculum JSON
    const newCurriculum = getCurriculumData();

    const item = {
        title: document.getElementById('courseTitle').value,
        instructor: document.getElementById('courseInstructor').value,
        instructorImg: coursesData[key] && coursesData[key].instructorImg ? coursesData[key].instructorImg : "https://randomuser.me/api/portraits/men/11.jpg",
        category: document.getElementById('courseCategory').value,
        desc: document.getElementById('courseDesc').value,
        image: document.getElementById('courseImage').value || "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80",
        students: coursesData[key] ? coursesData[key].students : 0,
        rating: coursesData[key] ? coursesData[key].rating : 5.0,
        curriculum: newCurriculum
    };
    
    try { await saveContent('courses', coursesData, key, item); } catch (error) { return alert(error.message); }
    closeModal('courseModal');
    loadAdminCourses();
    updateStats();
}

async function deleteCourse(key) {
    if (confirm(`Hapus kursus "${key}"?`)) {
        try { await deleteContent('courses', coursesData, key); } catch (error) { return alert(error.message); }
        loadAdminCourses();
        updateStats();
    }
}

/* ================== BLOGS CRUD ================== */
function loadAdminBlogs() {
    const tbody = document.getElementById('blogTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, blog] of Object.entries(blogsData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><strong>${blog.title}</strong><br><small>${blog.date}</small></td>
                <td>${blog.author || "Admin"}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editBlog('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBlog('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openBlogModal() {
    document.getElementById('blogForm').reset();
    document.getElementById('blogKey').readOnly = false;
    document.getElementById('blogModalTitle').innerText = 'Tambah Artikel Baru';
    openModal('blogModal');
}

function editBlog(key) {
    const blog = blogsData[key];
    if (!blog) return;
    document.getElementById('blogKey').value = key;
    document.getElementById('blogKey').readOnly = true;
    document.getElementById('blogTitle').value = blog.title;
    document.getElementById('blogAuthor').value = blog.author || "Admin";
    document.getElementById('blogCategory').value = blog.category;
    document.getElementById('blogImage').value = blog.image || "";
    document.getElementById('blogExcerpt').value = blog.excerpt;
    document.getElementById('blogContent').value = blog.content;
    document.getElementById('blogModalTitle').innerText = 'Edit Artikel';
    openModal('blogModal');
}

async function saveBlog(event) {
    event.preventDefault();
    const key = document.getElementById('blogKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    const item = {
        title: document.getElementById('blogTitle').value,
        author: { name: document.getElementById('blogAuthor').value, img: blogsData[key] && blogsData[key].author && blogsData[key].author.img ? blogsData[key].author.img : "https://randomuser.me/api/portraits/men/1.jpg" },
        category: document.getElementById('blogCategory').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: document.getElementById('blogContent').value,
        date: blogsData[key] ? blogsData[key].date : new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}),
        image: document.getElementById('blogImage').value || "https://images.unsplash.com/photo-1455390582262-044cdead2708?w=800&q=80"
    };
    
    try { await saveContent('blogs', blogsData, key, item); } catch (error) { return alert(error.message); }
    closeModal('blogModal');
    loadAdminBlogs();
    updateStats();
}

async function deleteBlog(key) {
    if (confirm(`Hapus artikel "${key}"?`)) {
        try { await deleteContent('blogs', blogsData, key); } catch (error) { return alert(error.message); }
        loadAdminBlogs();
        updateStats();
    }
}

/* ================== FATWAS CRUD ================== */
function loadAdminFatwas() {
    const tbody = document.getElementById('fatwaTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, fatwa] of Object.entries(fatwasData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><strong>${fatwa.title}</strong></td>
                <td>${fatwa.mufti || "Ustadz"}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editFatwa('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteFatwa('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openFatwaModal() {
    document.getElementById('fatwaForm').reset();
    document.getElementById('fatwaKey').readOnly = false;
    document.getElementById('fatwaModalTitle').innerText = 'Tambah Fatwa Baru';
    openModal('fatwaModal');
}

function editFatwa(key) {
    const fatwa = fatwasData[key];
    if (!fatwa) return;
    document.getElementById('fatwaKey').value = key;
    document.getElementById('fatwaKey').readOnly = true;
    document.getElementById('fatwaTitle').value = fatwa.title;
    document.getElementById('fatwaMufti').value = fatwa.mufti || "Ustadz";
    document.getElementById('fatwaCategory').value = fatwa.category;
    document.getElementById('fatwaImage').value = fatwa.image || "";
    document.getElementById('fatwaQuestion').value = fatwa.question || "";
    document.getElementById('fatwaAnswer').value = fatwa.answer || "";
    document.getElementById('fatwaModalTitle').innerText = 'Edit Fatwa';
    openModal('fatwaModal');
}

async function saveFatwa(event) {
    event.preventDefault();
    const key = document.getElementById('fatwaKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    const item = {
        title: document.getElementById('fatwaTitle').value,
        mufti: document.getElementById('fatwaMufti').value,
        category: document.getElementById('fatwaCategory').value,
        image: document.getElementById('fatwaImage').value,
        question: document.getElementById('fatwaQuestion').value,
        answer: document.getElementById('fatwaAnswer').value,
        date: new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}),
        status: "Selesai"
    };
    
    try { await saveContent('fatwas', fatwasData, key, item); } catch (error) { return alert(error.message); }
    closeModal('fatwaModal');
    loadAdminFatwas();
    updateStats();
}

async function deleteFatwa(key) {
    if (confirm(`Hapus fatwa "${key}"?`)) {
        try { await deleteContent('fatwas', fatwasData, key); } catch (error) { return alert(error.message); }
        loadAdminFatwas();
        updateStats();
    }
}

/* ================== RESET ================== */
async function resetAllData() {
    if (!confirm("PERINGATAN: Ini akan menghapus konten kursus, kitab, artikel, fatwa, iklan, dan mitra. Akun pengguna tidak dihapus. Lanjutkan?")) return;
    try {
        for (const [endpoint, map] of [['kitab', kitabData], ['courses', coursesData], ['blogs', blogsData], ['fatwas', fatwasData], ['ads', adsData], ['partners', partnersData]]) {
            for (const id of Object.keys(map)) await deleteContent(endpoint, map, id);
        }
        alert("Konten berhasil di-reset. Memuat ulang halaman...");
        location.reload();
    } catch (error) { alert(`Reset gagal: ${error.message}`); }
}


/* ================== ADS CRUD ================== */
const adminDefaultAds = {
    "donation-card": {
        title: "Dukung Pengembangan Bincang Ilmu",
        subtitle: "",
        desc: "Kontribusi Anda membantu pengembangan fitur, pemeliharaan layanan, dan penyediaan konten bermanfaat.",
        buttonText: "Donasi via WhatsApp",
        buttonLink: "",
        imageUrl: "",
        type: "donation"
    },
    "ad_1": {
        title: "Siap Memulai Perjalanan Menuntut Ilmu?",
        subtitle: "",
        desc: "Gabung bersama ribuan penuntut ilmu lainnya dan istiqomah belajar agama hari ini.",
        badgeText: "",
        badgeIcon: "",
        buttonText: "Daftar Gratis Sekarang",
        buttonLink: "#",
        icon: "fas fa-mosque",
        type: "cta",
        sortOrder: 1
    },
    "ad_2": {
        title: "Penerimaan Santri Baru",
        subtitle: "Program Online Intensif",
        desc: "Pelajari Bahasa Arab, Fiqih, dan Aqidah dari dasar bersama asatidzah berkompeten.<br><strong>Pendaftaran Gelombang 1 Dibuka!</strong>",
        badgeText: "",
        badgeIcon: "",
        buttonText: "Daftar Sekarang",
        buttonLink: "courses.html",
        icon: "fas fa-graduation-cap",
        type: "promo",
        sortOrder: 2
    }
};

adsData = adminDefaultAds;

function loadDonationCardForm() {
    const item = adsData['donation-card'] || adminDefaultAds['donation-card'];
    const fields = {
        donationCardTitle: item.title,
        donationCardDesc: item.desc,
        donationCardImage: item.imageUrl,
        donationCardButtonText: item.buttonText,
        donationCardButtonLink: item.buttonLink
    };
    Object.entries(fields).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) input.value = value || '';
    });
    updateDonationCardImagePreview();
}

function updateDonationCardImagePreview() {
    const input = document.getElementById('donationCardImage');
    const preview = document.getElementById('donationCardImagePreview');
    if (!input || !preview) return;
    const url = input.value.trim();
    preview.src = url;
    preview.style.display = url ? 'block' : 'none';
    preview.onerror = () => { preview.style.display = 'none'; };
}

async function saveDonationCard(event) {
    event.preventDefault();
    const item = {
        title: document.getElementById('donationCardTitle').value.trim(),
        desc: document.getElementById('donationCardDesc').value.trim(),
        imageUrl: document.getElementById('donationCardImage').value.trim(),
        buttonText: document.getElementById('donationCardButtonText').value.trim(),
        buttonLink: document.getElementById('donationCardButtonLink').value.trim(),
        type: 'donation'
    };
    updateDonationCardImagePreview();
    const status = document.getElementById('donationCardSaveStatus');
    if (status) status.textContent = 'Menyimpan…';
    try {
        await saveContent('ads', adsData, 'donation-card', item);
        if (status) status.textContent = 'Kartu donasi berhasil disimpan.';
    } catch (error) {
        if (status) status.textContent = `Gagal menyimpan: ${error.message}`;
    }
}

function loadAdminAds() {
    const tbody = document.getElementById('adTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const entries = Object.entries(adsData).filter(([id]) => id !== 'top-banner' && id !== 'donation-card').sort(([, a], [, b]) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
    entries.forEach(([key, ad], index) => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td>${Number(ad.sortOrder || index + 1)}</td>
                <td><span class="category-pill">${ad.type.toUpperCase()}</span></td>
                <td>${ad.title}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editAd('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAd('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    });
}

function openAdModal() {
    document.getElementById('adForm').reset();
    document.getElementById('adKey').readOnly = false;
    document.getElementById('adSortOrder').value = Object.keys(adsData).filter(id => id !== 'top-banner' && id !== 'donation-card').length + 1;
    document.getElementById('adModalTitle').innerText = 'Tambah Iklan Baru';
    openModal('adModal');
}

function editAd(key) {
    const ad = adsData[key];
    if (!ad) return;
    document.getElementById('adKey').value = key;
    document.getElementById('adKey').readOnly = true;
    document.getElementById('adType').value = ad.type;
    document.getElementById('adBadgeText').value = ad.badgeText || "";
    document.getElementById('adBadgeIcon').value = ad.badgeIcon || "";
    document.getElementById('adTitle').value = ad.title;
    document.getElementById('adSubtitle').value = ad.subtitle || "";
    document.getElementById('adDesc').value = ad.desc;
    document.getElementById('adButtonText').value = ad.buttonText;
    document.getElementById('adButtonLink').value = ad.buttonLink;
    document.getElementById('adIcon').value = ad.icon;
    document.getElementById('adImageUrl').value = ad.imageUrl || "";
    document.getElementById('adSize').value = ad.size || "medium";
    document.getElementById('adSortOrder').value = ad.sortOrder || 1;
    
    document.getElementById('adModalTitle').innerText = 'Edit Iklan';
    openModal('adModal');
}

async function saveAd(event) {
    event.preventDefault();
    const key = document.getElementById('adKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    const item = {
        type: document.getElementById('adType').value,
        badgeText: document.getElementById('adBadgeText').value,
        badgeIcon: document.getElementById('adBadgeIcon').value,
        title: document.getElementById('adTitle').value,
        subtitle: document.getElementById('adSubtitle').value,
        desc: document.getElementById('adDesc').value,
        buttonText: document.getElementById('adButtonText').value,
        buttonLink: document.getElementById('adButtonLink').value,
        icon: document.getElementById('adIcon').value,
        imageUrl: document.getElementById('adImageUrl').value,
        size: document.getElementById('adSize').value,
        sortOrder: Math.max(1, Number(document.getElementById('adSortOrder').value) || 1)
    };
    
    try { await saveContent('ads', adsData, key, item); } catch (error) { return alert(error.message); }
    closeModal('adModal');
    loadAdminAds();
    updateStats();
}

async function deleteAd(key) {
    if(confirm('Yakin ingin menghapus iklan ini?')) {
        try { await deleteContent('ads', adsData, key); } catch (error) { return alert(error.message); }
        loadAdminAds();
        updateStats();
    }
}

/* ================== PARTNER CRUD ================== */
function loadAdminPartners() {
    const tbody = document.getElementById('partnerTableBody');
    if (!tbody) return;
    const entries = Object.entries(partnersData).sort(([, a], [, b]) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
    tbody.innerHTML = entries.map(([id, partner]) => `<tr><td><img src="${escapeHtml(partner.imageUrl)}" alt="" style="width:72px;height:42px;object-fit:contain"></td><td><strong>${escapeHtml(partner.name)}</strong><br><small>${escapeHtml(id)}</small></td><td>${Number(partner.sortOrder || 0)}</td><td><button class="btn btn-sm btn-outline-primary" onclick="editPartner('${escapeHtml(id)}')"><i class="fas fa-edit"></i></button> <button class="btn btn-sm btn-danger" onclick="deletePartner('${escapeHtml(id)}')"><i class="fas fa-trash"></i></button></td></tr>`).join('');
}
function openPartnerModal(id = '') {
    document.getElementById('partnerForm').reset();
    document.getElementById('partnerKey').readOnly = false;
    document.getElementById('partnerModalTitle').textContent = id ? 'Edit Mitra Dakwah' : 'Tambah Mitra Dakwah';
    if (id) {
        const partner = partnersData[id];
        document.getElementById('partnerKey').value = id;
        document.getElementById('partnerKey').readOnly = true;
        document.getElementById('partnerName').value = partner.name || '';
        document.getElementById('partnerImage').value = partner.imageUrl || '';
        document.getElementById('partnerSortOrder').value = partner.sortOrder || 1;
    } else document.getElementById('partnerSortOrder').value = Object.keys(partnersData).length + 1;
    openModal('partnerModal');
}
function editPartner(id) { openPartnerModal(id); }
async function savePartner(event) {
    event.preventDefault();
    const id = document.getElementById('partnerKey').value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const item = { name: document.getElementById('partnerName').value.trim(), imageUrl: document.getElementById('partnerImage').value.trim(), sortOrder: Math.max(1, Number(document.getElementById('partnerSortOrder').value) || 1) };
    if (!id || !item.name || !item.imageUrl) return;
    try { await saveContent('partners', partnersData, id, item); }
    catch (error) { return alert(error.message); }
    closeModal('partnerModal'); loadAdminPartners(); renderPartners();
}
async function deletePartner(id) {
    if (!confirm(`Hapus mitra “${partnersData[id]?.name || id}”?`)) return;
    try { await deleteContent('partners', partnersData, id); }
    catch (error) { return alert(error.message); }
    loadAdminPartners(); renderPartners();
}

async function loadAdminSiteSettings() {
    const form = document.getElementById('siteSettingsForm');
    if (!form) return;
    try {
        const settings = await adminApi('/site-settings', 'GET');
        document.getElementById('maintenanceEnabled').checked = settings.enabled === true;
        document.getElementById('maintenanceMode').value = settings.mode || 'maintenance';
        document.getElementById('maintenanceTitle').value = settings.title || '';
        document.getElementById('maintenanceMessage').value = settings.message || '';
    } catch (error) {
        document.getElementById('siteSettingsSaveStatus').textContent = `Gagal memuat pengaturan: ${error.message}`;
    }
}

async function saveSiteSettings(event) {
    event.preventDefault();
    const status = document.getElementById('siteSettingsSaveStatus');
    status.textContent = 'Menyimpan pengaturan…';
    try {
        await adminApi('/site-settings', 'PUT', {
            enabled: document.getElementById('maintenanceEnabled').checked,
            mode: document.getElementById('maintenanceMode').value,
            title: document.getElementById('maintenanceTitle').value.trim(),
            message: document.getElementById('maintenanceMessage').value.trim()
        });
        status.textContent = 'Pengaturan tersimpan. Perubahan berlaku pada kunjungan dan pemuatan halaman berikutnya.';
    } catch (error) { status.textContent = `Gagal menyimpan: ${error.message}`; }
}


// --- TOP AD LOGIC ---
document.addEventListener('DOMContentLoaded', loadTopAdSettings);

async function loadTopAdSettings() {
    const form = document.getElementById('topAdForm');
    if (!form) return;
    const status = document.getElementById('topAdSaveStatus');
    const existing = adsData['top-banner'] || { active: false, text: '', btnText: '', link: '' };

    const applySettings = data => {
        const active = document.getElementById('topAdStatus');
        const text = document.getElementById('topAdText');
        const btnText = document.getElementById('topAdBtnText');
        const link = document.getElementById('topAdLink');
        if (!active || !text || !btnText || !link) return;
        active.checked = Boolean(data.active);
        text.value = data.text || '';
        text.required = active.checked;
        btnText.value = data.btnText || '';
        link.value = data.link || '';
        updateTopAdStatusLabel();
        renderTopAdPreview();
    };

    try {
        const data = await adminApi('/ads/top-banner', 'GET');
        if (data && typeof data === 'object') adsData['top-banner'] = data;
        applySettings(data || existing);
    } catch (error) {
        applySettings(existing);
        if (status) status.textContent = 'Pengaturan belum berhasil dimuat dari server. Anda tetap bisa mengisi dan menyimpan, lalu periksa pesan jika penyimpanan gagal.';
    }

    if (!form.dataset.previewBound) {
        form.dataset.previewBound = 'true';
        form.querySelectorAll('input').forEach(input => input.addEventListener('input', renderTopAdPreview));
        document.getElementById('topAdStatus')?.addEventListener('change', () => {
            const text = document.getElementById('topAdText');
            if (text) text.required = document.getElementById('topAdStatus').checked;
            updateTopAdStatusLabel();
            renderTopAdPreview();
        });
    }
    renderTopAdPreview();
}

function updateTopAdStatusLabel() {
    const toggle = document.getElementById('topAdStatus');
    const label = document.getElementById('topAdStatusText');
    if (toggle && label) label.textContent = toggle.checked ? 'Aktif' : 'Nonaktif';
}

function renderTopAdPreview() {
    const preview = document.getElementById('topAdPreview');
    if (!preview) return;
    const enabled = Boolean(document.getElementById('topAdStatus')?.checked);
    const text = document.getElementById('topAdText')?.value.trim() || '';
    const buttonText = document.getElementById('topAdBtnText')?.value.trim() || '';
    const message = document.getElementById('topAdPreviewText');
    const button = document.getElementById('topAdPreviewButton');
    const state = document.getElementById('topAdPreviewState');
    if (message) message.textContent = text || 'Teks promo akan tampil di sini.';
    if (button) {
        button.textContent = buttonText || 'Tombol aksi';
        button.hidden = !buttonText;
    }
    preview.classList.toggle('is-active', enabled && Boolean(text));
    if (state) {
        state.textContent = enabled ? (text ? 'Aktif • akan tampil di situs' : 'Aktif • isi teks promo') : 'Nonaktif • tidak tampil di situs';
    }
}

async function saveTopAd(event) {
    event.preventDefault();
    const active = document.getElementById('topAdStatus').checked;
    const text = document.getElementById('topAdText').value.trim();
    const btnText = document.getElementById('topAdBtnText').value.trim();
    const link = document.getElementById('topAdLink').value.trim();
    const status = document.getElementById('topAdSaveStatus');
    const submit = document.querySelector('#topAdForm [type="submit"]');

    if (active && !text) {
        if (status) status.textContent = 'Isi teks promo sebelum mengaktifkan banner.';
        document.getElementById('topAdText').focus();
        return;
    }
    if (btnText && !link) {
        if (status) status.textContent = 'Isi URL tujuan untuk tombol aksi, atau kosongkan teks tombol.';
        document.getElementById('topAdLink').focus();
        return;
    }
    if (link) {
        try {
            const parsed = new URL(link, window.location.origin);
            if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('URL harus menggunakan http atau https.');
        } catch (_) {
            if (status) status.textContent = 'Masukkan URL tujuan yang valid (http://, https://, atau path seperti courses.html).';
            document.getElementById('topAdLink').focus();
            return;
        }
    }

    const topAdData = { active, text, btnText, link, type: 'banner', title: text };
    if (status) status.textContent = 'Menyimpan pengaturan…';
    if (submit) { submit.disabled = true; submit.setAttribute('aria-busy', 'true'); }
    try {
        const saved = await saveContent('ads', adsData, 'top-banner', topAdData);
        if (saved) adsData['top-banner'] = saved;
        if (status) status.textContent = 'Pengaturan tersimpan. Pratinjau di atas sudah diperbarui.';
        renderTopAdPreview();
    } catch (error) {
        if (status) status.textContent = `Gagal menyimpan: ${error.message}`;
    } finally {
        if (submit) { submit.disabled = false; submit.removeAttribute('aria-busy'); }
    }
}

// --- USER LOGIC ---
function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    usersData = JSON.parse(sessionStorage.getItem('adminUsers') || '[]');
    tbody.innerHTML = '';
    
    usersData.forEach((user, index) => {
        const tr = document.createElement('tr');
        
        let roleBadgeClass = 'badge-success';
        if(user.role === 'Admin') roleBadgeClass = 'badge-danger';
        if(user.role === 'Pengajar') roleBadgeClass = 'badge-primary';
        
        const nameCell = document.createElement('td');
        const identity = document.createElement('div'); identity.style.cssText = 'display:flex;align-items:center;gap:10px;';
        const avatar = document.createElement('div'); avatar.style.cssText = 'width:35px;height:35px;border-radius:50%;background:var(--primary-light);color:var(--primary-color);display:flex;align-items:center;justify-content:center;font-weight:bold;';
        avatar.textContent = String(user.name || '?').slice(0, 1).toUpperCase();
        const name = document.createElement('strong'); name.textContent = user.name || '';
        identity.append(avatar, name); nameCell.appendChild(identity);
        const emailCell = document.createElement('td'); emailCell.textContent = user.email || '';
        const passwordCell = document.createElement('td'); passwordCell.textContent = '••••••'; passwordCell.style.cssText = 'font-family:monospace;letter-spacing:1px;';
        const roleCell = document.createElement('td'); const badge = document.createElement('span'); badge.className = 'badge ' + roleBadgeClass; badge.textContent = user.role || 'Siswa'; roleCell.appendChild(badge);
        const dateCell = document.createElement('td'); const dateLabel = document.createElement('span'); dateLabel.style.cssText = 'color:var(--text-light);font-size:0.9em;';
        const parsedDate = user.createdAt ? new Date(user.createdAt) : null;
        dateLabel.textContent = parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'; dateCell.appendChild(dateLabel);
        const statusCell = document.createElement('td'); statusCell.textContent = 'Aktif'; statusCell.style.color = 'green';
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button'); editButton.className = 'btn btn-sm btn-outline-primary'; editButton.title = 'Edit'; editButton.innerHTML = '<i class="fas fa-edit"></i>'; editButton.addEventListener('click', () => editUser(user.email));
        const deleteButton = document.createElement('button'); deleteButton.className = 'btn btn-sm btn-danger'; deleteButton.title = 'Hapus'; deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; deleteButton.addEventListener('click', () => deleteUser(user.email));
        actionsCell.append(editButton, deleteButton);
        tr.append(nameCell, emailCell, passwordCell, roleCell, dateCell, statusCell, actionsCell);
        tbody.appendChild(tr);
    });
}

function editUser(email) {
    usersData = JSON.parse(sessionStorage.getItem('adminUsers') || '[]');
    const user = usersData.find(u => u.email === email);
    if (!user) return;
    
    document.getElementById('userModalTitle').innerText = 'Edit Pengguna';
    document.getElementById('userOriginalEmail').value = user.email;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPassword').value = ''; // Don't show password
    document.getElementById('userRole').value = user.role || 'Siswa';
    
    openModal('userModal');
}

async function saveUser(event) {
    event.preventDefault();
    usersData = JSON.parse(sessionStorage.getItem('adminUsers') || '[]');
    
    const originalEmail = document.getElementById('userOriginalEmail').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;
    
    if (originalEmail) {
        // Edit mode
        const index = usersData.findIndex(u => u.email === originalEmail);
        if (index !== -1) {
            const changes = { name, email, role };
            if (password) changes.password = password;
            try {
                const updated = await adminApi(`/users/${encodeURIComponent(usersData[index].id)}`, 'PUT', changes);
                usersData[index] = updated;
            } catch (error) { alert(error.message); return; }
        }
    } else {
        // Add mode
        if (!password) {
            alert("Password wajib diisi untuk pengguna baru!");
            return;
        }
        // Check if email exists
        if (usersData.some(u => u.email === email)) {
            alert("Email sudah terdaftar!");
            return;
        }
        try {
            usersData.push(await adminApi('/users', 'POST', { name, email, password, role }));
        } catch (error) { alert(error.message); return; }
    }
    
    sessionStorage.setItem('adminUsers', JSON.stringify(usersData));
    closeModal('userModal');
    renderUsers();
    updateStats();
    
    if(typeof showToast === 'function') {
        showToast("Sukses", "Data pengguna berhasil disimpan.", "success");
    }
}

function deleteUser(email) {
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna dengan email: ${email}?`)) {
        usersData = JSON.parse(sessionStorage.getItem('adminUsers') || '[]');
        const user = usersData.find(u => u.email === email);
        if (user) adminApi(`/users/${encodeURIComponent(user.id)}`, 'DELETE').then(() => {
            usersData = usersData.filter(u => u.id !== user.id);
            sessionStorage.setItem('adminUsers', JSON.stringify(usersData));
            renderUsers(); updateStats();
        }).catch(error => alert(error.message));
    }
}

async function adminApi(path, method, payload) {
    const apiBase = (window.API_BASE || '/api').replace(/\/$/, '');
    const response = await fetch(`${apiBase}${path}`, {
        method,
        headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}`, 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : undefined
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Permintaan admin gagal.');
    return result;
}

// Add renderUsers to DOMContentLoaded
