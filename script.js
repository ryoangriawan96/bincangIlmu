/* Main JavaScript for Bincang Ilmu */

// Course Data Database
const coursesData = {
    'arab': {
        title: "Bahasa Arab Dasar: Kitab Al-Arabiyyah Baina Yadaik",
        category: "Bahasa Arab",
        instructor: "Ustadz Abu Hanifah, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/32.jpg",
        image: "images/course-arab.png",
        rating: "5.0 (120 Review)",
        description: "Pelajari Bahasa Arab dari nol muslim dengan metode yang mudah dipahami menggunakan kitab panduan standar Universitas Timur Tengah (Al-Arabiyyah Baina Yadaik). Cocok untuk pemula yang ingin memahami Al-Qur'an dan As-Sunnah.",
        learnings: [
            "Kaidah Dasar Nahwu & Shorof",
            "Percakapan Bahasa Arab Sehari-hari",
            "Menambah Kosakata (Mufrodat) Populer",
            "Membaca Kitab Gundul Sederhana",
            "Persiapan Tes Timur Tengah"
        ],
        curriculum: [
            {
                title: "Modul 1: Pengenalan Bahasa Arab",
                duration: "45m",
                lessons: [
                    { title: "Keutamaan Belajar Bahasa Arab", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", free: true },
                    { title: "Pengenalan Huruf Hijaiyah", video: "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1", free: false }
                ]
            },
            {
                title: "Modul 2: Percakapan Sehari-hari",
                duration: "2j 30m",
                lessons: [
                    { title: "Perkenalan (At-Ta'aruf)", video: "https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1", free: false },
                    { title: "Keluargaku (Usrati)", video: "https://www.youtube.com/embed/VIDEO_ID_4?autoplay=1", free: false },
                    { title: "Kehidupan Sehari-hari", video: "https://www.youtube.com/embed/VIDEO_ID_5?autoplay=1", free: false, lock: true }
                ]
            }
        ]
    },
    'fiqih': {
        title: "Fiqih Ibadah: Panduan Sholat Lengkap Sesuai Sunnah",
        category: "Fiqih",
        instructor: "Ustadz Ahmad Zainuddin, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/44.jpg",
        image: "images/course-fiqih.png",
        rating: "4.9 (85 Review)",
        description: "Panduan lengkap tata cara sholat sesuai tuntunan Nabi Shallallahu 'alaihi wa sallam. Membahas syarat, rukun, wajib, dan sunnah-sunnah sholat berdasarkan dalil-dalil yang shahih.",
        learnings: [
            "Thaharah (Bersuci) dan Wudhu",
            "Syarat dan Rukun Sholat",
            "Bacaan dan Gerakan Sholat",
            "Dzikir Sesudah Sholat",
            "Kesalahan Umum dalam Sholat"
        ],
        curriculum: [
            {
                title: "Modul 1: Thaharah",
                duration: "1j 15m",
                lessons: [
                    { title: "Pentingnya Bersuci", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", free: true },
                    { title: "Tata Cara Wudhu Nabi", video: "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1", free: false }
                ]
            },
            {
                title: "Modul 2: Sifat Sholat Nabi",
                duration: "3j 00m",
                lessons: [
                    { title: "Takbiratul Ihram hingga Al-Fatihah", video: "https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1", free: false },
                    { title: "Ruku' dan I'tidal", video: "https://www.youtube.com/embed/VIDEO_ID_4?autoplay=1", free: false },
                    { title: "Sujud dan Duduk", video: "https://www.youtube.com/embed/VIDEO_ID_5?autoplay=1", free: false, lock: true }
                ]
            }
        ]
    },
    'usym': {
        title: "Syarh Riyadhus Shalihin: Panduan Adab Penuntut Ilmu",
        category: "Adab & Akhlak",
        instructor: "Ustadz Dr. Firanda Andirja, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/85.jpg",
        image: "images/course-usym.png",
        rating: "5.0 (200 Review)",
        description: "Kajian mendalam kitab Riyadhus Shalihin karya Imam An-Nawawi dengan penjelasan (syarah) dari Syaikh Ibn Utsaimin. Fokus pada bab-bab adab, ikhlas, dan taubat.",
        learnings: [
            "Biografi Imam An-Nawawi",
            "Bab Ikhlas dan Niat",
            "Bab Taubat",
            "Bab Sabar",
            "Bab Jujur (Ash-Shiddiq)"
        ],
        curriculum: [
            {
                title: "Modul 1: Mukadimah",
                duration: "1j 00m",
                lessons: [
                    { title: "Biografi Penulis & Syarah", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", free: true },
                    { title: "Pentingnya Niat", video: "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1", free: false }
                ]
            },
            {
                title: "Modul 2: Bab-Bab Utama",
                duration: "4j 30m",
                lessons: [
                    { title: "Hadits Tentang Taubat", video: "https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1", free: false },
                    { title: "Hadits Tentang Sabar", video: "https://www.youtube.com/embed/VIDEO_ID_4?autoplay=1", free: false },
                    { title: "Hadits Tentang Jujur", video: "https://www.youtube.com/embed/VIDEO_ID_5?autoplay=1", free: false, lock: true }
                ]
            }
        ]
    }
};

// Blogs Data Database
const blogsData = {
    'aqidah': {
        title: "Pentingnya Menuntut Ilmu Syar'i di Zaman Fitnah",
        date: "18 Des 2025",
        category: "Aqidah",
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Menuntut ilmu bukan sekadar hobi, melainkan kewajiban setiap muslim untuk membentengi diri.",
        content: `
            <p>Di zaman yang penuh dengan syubhat (kerancuan pemikiran) dan syahwat (godaan hawa nafsu) ini, menuntut ilmu syar'i adalah benteng utama bagi seorang muslim. Tanpa ilmu, kita akan mudah terombang-ambing oleh berbagai fitnah yang datang silih berganti.</p>
            <p>Rasulullah shallallahu 'alaihi wa sallam bersabda: "Menuntut ilmu adalah kewajiban bagi setiap muslim." (HR. Ibnu Majah). Kewajiban ini tidak gugur hanya karena kita sibuk dengan urusan dunia.</p>
            <h3>Ilmu Sebagai Cahaya</h3>
            <p>Ilmu adalah cahaya yang menerangi jalan kita menuju Allah. Dengan ilmu, kita bisa membedakan mana yang tauhid dan mana yang syirik, mana yang sunnah dan mana yang bid'ah, serta mana yang halal dan mana yang haram.</p>
            <p>Oleh karena itu, mari kita luangkan waktu setiap hari untuk duduk di majelis ilmu atau menyimak kajian-kajian ilmiah yang bermanfaat.</p>
        `
    },
    'fiqih': {
        title: "Adab-Adab Penuntut Ilmu Terhadap Guru",
        date: "15 Des 2025",
        category: "Fiqih",
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Keberkahan ilmu seringkali hilang karena kurangnya adab seorang murid terhadap gurunya.",
        content: `
            <p>Salah satu kunci sukses para ulama terdahulu dalam meraih ilmu adalah tingginya adab mereka terhadap guru-guru mereka. Mereka tidak hanya mengambil ilmu, tapi juga meneladani akhlak sang guru.</p>
            <h3>Menghormati Guru</h3>
            <p>Seorang penuntut ilmu hendaknya memuliakan gurunya, tidak memotong pembicaraannya, dan mendoakan kebaikan untuknya. Ibnul Jama'ah rahimahullah mengatakan: "Seorang penuntut ilmu harus memandang gurunya dengan pandangan pemuliaan dan penghormatan."</p>
            <p>Jika kita ingin ilmu yang kita pelajari berkah dan bermanfaat, perbaikilah adab kita di majelis ilmu.</p>
        `
    },
    'tazkiyatun': {
        title: "Obat Hati: Mengobati Kerasnya Hati dengan Al-Qur'an",
        date: "10 Des 2025",
        category: "Tazkiyatun Nufus",
        image: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Hati yang sakit perlu diobati. Salah satu obat yang paling mujarab adalah membaca Al-Qur'an.",
        content: `
            <p>Hati manusia bisa sakit, bahkan mati. Tanda hati yang sakit adalah ketika ia tidak lagi merasakan manisnya iman dan berat untuk melakukan ketaatan. Salah satu obat yang paling ampuh adalah Al-Qur'an.</p>
            <p>Allah berfirman: "Wahai manusia, sesungguhnya telah datang kepadamu pelajaran dari Tuhanmu dan penyembuh bagi penyakit-penyakit (yang berada) dalam dada..." (QS. Yunus: 57).</p>
            <h3>Tadabbur Al-Qur'an</h3>
            <p>Membaca Al-Qur'an dengan tadabbur (perenungan) akan melembutkan hati yang keras. Ia bagaikan air hujan yang menyirami tanah yang tandus, menumbuhkan kembali benih-benih keimanan di dalam jiwa.</p>
        `
    }
};

// Fatwas Data Database
const fatwasData = {
    'sholat-jamak': {
        title: "Hukum Menjamak Sholat Tanpa Udzur Syar'i",
        date: "20 Des 2025",
        category: "Ibadah",
        image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Apakah diperbolehkan menjamak sholat fardhu tanpa adanya alasan yang dibenarkan syariat seperti safar atau hujan?",
        content: `
            <p><strong>Pertanyaan:</strong><br>Bolehkah seseorang menjamak sholat Zhuhur dengan Ashar atau Maghrib dengan Isya tanpa sebab safar, sakit, atau hujan, hanya karena sibuk bekerja?</p>
            <p><strong>Jawaban:</strong><br>Alhamdulillah. Para ulama sepakat bahwa sholat harus dikerjakan pada waktunya masing-masing. Allah Ta'ala berfirman: "Sesungguhnya sholat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman." (QS. An-Nisa: 103).</p>
            <h3>Hukum Asal Sholat</h3>
            <p>Hukum asalnya tidak boleh menjamak sholat kecuali ada udzur yang syar'i. Jika seseorang menjamak sholat tanpa udzur, maka ia berdosa dan sholatnya yang kedua tidak sah menurut sebagian ulama. Ibnu Abbas radhiyallahu 'anhu meriwayatkan bahwa Rasulullah menjamak sholat di Madinah tanpa takut dan tanpa hujan, namun ini dimaknai ulama untuk "mengangkat kesulitan" (haraj) sesekali, bukan dijadikan kebiasaan.</p>
            <p><strong>Kesimpulan:</strong><br>Tidak diperbolehkan menjamak sholat hanya karena sibuk bekerja. Hendaknya seorang muslim mengatur waktunya agar bisa sholat tepat waktu.</p>
        `
    },
    'riba-bank': {
        title: "Bunga Bank Konvensional: Apakah Termasuk Riba?",
        date: "19 Des 2025",
        category: "Muamalah",
        image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Penjelasan mendalam mengenai status bunga bank dalam pandangan syariat Islam dan ijma' ulama.",
        content: `
            <p><strong>Pertanyaan:</strong><br>Apa hukum bunga yang diberikan oleh bank konvensional kepada nasabahnya?</p>
            <p><strong>Jawaban:</strong><br>Mayoritas lembaga fiqih internasional dan nasional sepakat bahwa bunga bank (interest) adalah riba yang diharamkan dalam Al-Qur'an dan As-Sunnah. Allah berfirman: "Allah telah menghalalkan jual beli dan mengharamkan riba." (QS. Al-Baqarah: 275).</p>
            <h3>Definisi Riba</h3>
            <p>Setiap penambahan yang disyaratkan dalam transaksi utang piutang (qardh) adalah riba. Ketika nasabah menabung di bank konvensional, pada hakikatnya ia meminjamkan uang kepada bank, dan bank memberikan tambahan (bunga) yang disyaratkan. Ini adalah Riba Qardh.</p>
            <p><strong>Solusi:</strong><br>Beralihlah ke bank syariah yang menggunakan akad mudharabah atau wadiah, atau gunakan tabungan tanpa bunga.</p>
        `
    },
    'puasa-safar': {
        title: "Musafir: Lebih Utama Puasa atau Berbuka?",
        date: "17 Des 2025",
        category: "Puasa",
        image: "https://images.unsplash.com/photo-1549241520-22c547842b03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Bagi seorang musafir di bulan Ramadan, manakah yang lebih afdhal? Tetap berpuasa atau mengambil keringanan (rukhsah)?",
        content: `
            <p><strong>Pertanyaan:</strong><br>Saya sering bepergian jauh saat Ramadan. Mana yang lebih utama bagi saya, tetap puasa atau berbuka?</p>
            <p><strong>Jawaban:</strong><br>Para ulama berbeda pendapat mengenai mana yang lebih utama. Namun pendapat yang rojih (kuat) adalah melihat kondisi si musafir.</p>
            <h3>Tiga Kondisi Musafir</h3>
            <ol>
                <li>Jika puasa memberatkannya, maka <strong>lebih utama berbuka</strong>. Bahkan makruh jika memaksakan diri.</li>
                <li>Jika puasa membahayakan nyawanya, maka <strong>wajib berbuka</strong> dan haram berpuasa.</li>
                <li>Jika puasa tidak memberatkannya, maka <strong>lebih utama berpuasa</strong> agar lebih cepat menggugurkan kewajiban.</li>
            </ol>
            <p>Rasulullah shallallahu 'alaihi wa sallam bersabda: "Bukanlah termasuk kebaikan (al-birr) berpuasa dalam safar (bagi yang keberatan)." (HR. Bukhari & Muslim).</p>
        `
    }
};

// Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const toggles = document.querySelectorAll('.theme-toggle i');
    toggles.forEach(icon => {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Check Auth State on Load
    // Check Auth State on Load
    checkAuthState();

    // Load Dynamic Course Content if on detail page
    if (window.location.pathname.includes('course-detail.html')) {
        loadCourseDetail();
    }

    // Load All Courses if on courses page
    if (window.location.pathname.includes('courses.html')) {
        loadAllCourses();
    }

    // Load All Blogs if on blog page
    if (window.location.pathname.includes('blog.html')) {
        loadAllBlogs();
    }

    // Load Blog Detail if on blog detail page
    if (window.location.pathname.includes('blog-detail.html')) {
        loadBlogDetail();
    }

    // === Bismillah Popup Logic ===
    const bismillahModal = document.getElementById('bismillahModal');
    const bismillahAudio = document.getElementById('bismillahAudio');

    if (bismillahModal) {
        // Show modal immediately
        setTimeout(() => {
            bismillahModal.classList.add('active');
        }, 100);

        // Handle Close Button
        const closeBtn = document.getElementById('closeBismillahBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent playing audio
                closeBismillah();
            });
        }

        // Play on click (to bypass autoplay policy)
        bismillahModal.addEventListener('click', () => {
            if (bismillahModal.classList.contains('closing')) return; // Prevent double clicks

            bismillahModal.classList.add('closing'); // Flag to prevent re-trigger

            if (bismillahAudio) {
                bismillahAudio.volume = 0.8;
                bismillahAudio.play().then(() => {
                    // Audio playing, wait for end or timeout
                    bismillahAudio.onended = closeBismillah;
                    // Backup timeout if audio is very long or fails event
                    setTimeout(closeBismillah, 4000);
                }).catch(err => {
                    console.log("Audio play failed:", err);
                    closeBismillah();
                });
            } else {
                closeBismillah();
            }
        });

        function closeBismillah() {
            bismillahModal.classList.remove('active');
            // Remove from DOM after transition to prevent blocking
            setTimeout(() => {
                bismillahModal.style.display = 'none';
            }, 500);
        }
    }

    // Load All Fatwas if on fatwa page
    if (window.location.pathname.includes('fatwa.html')) {
        loadAllFatwas();
    }

    // Load Fatwa Detail if on fatwa detail page
    if (window.location.pathname.includes('fatwa-detail.html')) {
        loadFatwaDetail();
    }

    // Load All Blogs if on blog page
    if (window.location.pathname.includes('blog.html') && !window.location.pathname.includes('blog-detail.html')) {
        loadAllBlogs();
    }

    // Load Blog Detail if on blog detail page
    if (window.location.pathname.includes('blog-detail.html')) {
        loadBlogDetail();
    }

    // Modal Event Listeners
    const authModal = document.getElementById('authModal');
    const vidModal = document.getElementById('videoModal');

    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeModal();
        });
    }

    if (vidModal) {
        vidModal.addEventListener('click', (e) => {
            if (e.target === vidModal) closeVideoModal();
        });
    }

    // Handle Login Form Submit
    const loginForm = document.querySelector('#loginForm form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performLogin();
        });
    }

    // Handle Register Form Submit
    const registerForm = document.querySelector('#registerForm form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performLogin(); // Simulating auto-login after register
        });
    }

    // Handle Google Buttons
    const googleBtns = document.querySelectorAll('.btn-google');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            performLogin();
        });
    });
});

// Authentication Functions
function performLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    closeModal();
    checkAuthState();
    // Show welcome message (optional)
    alert("Berhasil masuk! Semua akses kursus telah terbuka.");
}

function performLogout() {
    localStorage.removeItem('isLoggedIn');
    checkAuthState();
    window.location.reload(); // Reload to reset state
}

function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const body = document.body;

    if (isLoggedIn) {
        body.classList.add('logged-in');
        updateHeaderForLoggedIn();
        unlockCourseContent();
    } else {
        body.classList.remove('logged-in');
    }
}

function updateHeaderForLoggedIn() {
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerActions.innerHTML = `
            <div class="user-profile" style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="performLogout()">
                <span class="user-name" style="font-weight: 500;">Penuntut Ilmu</span>
                <img src="https://ui-avatars.com/api/?name=Penuntut+Ilmu&background=0D8ABC&color=fff" alt="User" style="width: 40px; height: 40px; border-radius: 50%;">
            </div>
        `;
    }
}

function unlockCourseContent() {
    // Unlock Sidebar Button
    const sidebarBtn = document.querySelector('.course-sidebar .btn-primary');
    if (sidebarBtn) {
        sidebarBtn.innerText = 'Lanjut Belajar';
        sidebarBtn.onclick = function () {
            document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' });
            // Open curriculum tab if not active
            openTab('curriculum');
        };
    }

    // Unlock Lessons (Change icons)
    const lockedIcons = document.querySelectorAll('.fa-lock');
    lockedIcons.forEach(icon => {
        icon.classList.remove('fa-lock', 'fas');
        icon.classList.add('fa-play-circle', 'far');
    });

    // Make free badges cleaner if logged in? (Optional)
}

// Modal Functions
function openModal(tab) {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        switchAuthTab(tab);
    }
}

function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginTabBtn');
    const registerBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    }
}

// Video Modal Functions
function openVideoModal() {
    const vModal = document.getElementById('videoModal');
    const vFrame = document.getElementById('introVideoFrame');
    const vSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    if (vModal && vFrame) {
        vModal.classList.add('active');
        vFrame.src = vSrc;
    }
}

function closeVideoModal() {
    const vModal = document.getElementById('videoModal');
    const vFrame = document.getElementById('introVideoFrame');

    if (vModal) vModal.classList.remove('active');

    if (vFrame) {
        setTimeout(() => {
            vFrame.src = "";
        }, 300);
    }
}

// Course Tabs (for detail page)
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].classList.remove("active");
    }
    var tabs = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
        targetTab.classList.add("active");
    }

    // Find the button that triggered this (if clicked)
    // NOTE: This relies on event.currentTarget which might not be present if called programmatically
    // We can manually highlight the button
    const activeBtn = document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`);
    if (activeBtn) activeBtn.classList.add("active");
}

// Lesson Player (for detail page)
function playLesson(element, videoSrc) {
    // Check if user is logged in for locked content (Optional, but user said "All open AFTER login")
    // But visualized as open. For now, let's allow playing but maybe warn if not logged in?
    // User request: "When registered and logged in, all courses open".
    // Implies: If NOT logged in, maybe they shouldn't open? 
    // Let's check login state.

    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // if (!isLoggedIn && element.querySelector('.fa-lock')) {
    //    openModal('login');
    //    return;
    // } 
    // Actually, user just said "make them open", didn't explicitly say "lock them otherwise", 
    // but the presence of locks implies it. I'll implement a soft check.

    const hasLock = element.querySelector('.fa-lock');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (hasLock && !isLoggedIn) {
        openModal('login');
        return;
    }

    const mainVideo = document.getElementById('mainCourseVideo');
    if (mainVideo) {
        mainVideo.src = videoSrc;
    }

    const allLessons = document.querySelectorAll('.lesson-item');
    allLessons.forEach(lesson => lesson.classList.remove('active'));

    if (element) {
        element.classList.add('active');
    }

    const videoWrapper = document.querySelector('.video-player-wrapper');
    if (videoWrapper) {
        videoWrapper.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle Password Function
// Toggle Password Logic (Event Delegation)
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('toggle-password')) {
        const icon = e.target;
        const group = icon.closest('.form-group');
        const input = group.querySelector('input');

        if (input) {
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        }
    }
});

// Load Course Detail Function
function loadCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'arab'; // Default to arab if no ID

    const course = coursesData[courseId];
    if (!course) return; // Handle invalid ID

    // Update Text Content
    document.title = course.title + " - Bincang Ilmu";
    const titleEl = document.querySelector('.course-main-title');
    if (titleEl) titleEl.innerText = course.title;

    const instructorNameEl = document.querySelector('.meta-item .value'); // Assumes first one
    if (instructorNameEl) instructorNameEl.innerText = course.instructor;

    // Update Instructor Image (First image in meta-item)
    const instructorImgEl = document.querySelector('.meta-item img');
    if (instructorImgEl) instructorImgEl.src = course.instructorImg;

    const categoryEl = document.querySelectorAll('.meta-item .value')[1];
    if (categoryEl) categoryEl.innerText = course.category;

    const ratingEl = document.querySelectorAll('.meta-item .value')[2];
    if (ratingEl) ratingEl.innerText = course.rating;

    // Update Description
    const descEl = document.querySelector('#overview p');
    if (descEl) descEl.innerText = course.description;

    // Update Learnings List
    const learningsList = document.querySelector('.check-list');
    if (learningsList) {
        learningsList.innerHTML = course.learnings.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('');
    }

    // Update Thumbnail in Sidebar
    const thumbEl = document.querySelector('.sidebar-thumb');
    if (thumbEl) thumbEl.src = course.image;

    // Update Curriculum
    const curriculumList = document.querySelector('.curriculum-list');
    if (curriculumList) {
        let curriculumHTML = '';
        course.curriculum.forEach((module, index) => {
            let lessonsHTML = module.lessons.map(lesson => {
                let iconClass = lesson.lock ? 'fas fa-lock' : 'far fa-play-circle';
                let badgeHTML = lesson.free ? '<span class="free-badge">Gratis</span>' : '';
                return `
                    <li class="lesson-item" onclick="playLesson(this, '${lesson.video}')">
                        <i class="${iconClass}"></i> ${lesson.title} ${badgeHTML}
                    </li>
                `;
            }).join('');

            curriculumHTML += `
                <div class="module-item">
                    <div class="module-header">
                        <span class="module-title">${module.title}</span>
                        <span class="module-duration">${module.duration}</span>
                    </div>
                    <ul class="lesson-list">
                        ${lessonsHTML}
                    </ul>
                </div>
            `;
        });
        curriculumList.innerHTML = curriculumHTML;
    }


    // Check auth state again to unlock content if needed
    checkAuthState();

    // Trigger Ad Popup if on courses page
    if (window.location.pathname.includes('courses.html')) {
        setTimeout(openAdModal, 2000); // Show after 2 seconds
    }
}

// Ad Modal Functions
function openAdModal() {
    // Check if valid to open (e.g. not already seen this session - optional, but user asked for it to appear)
    const adModal = document.getElementById('adModal');
    if (adModal) {
        adModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAdModal() {
    const adModal = document.getElementById('adModal');
    if (adModal) {
        adModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Load All Courses Function
function loadAllCourses() {
    const grid = document.getElementById('allCoursesGrid');
    if (!grid) return;

    let html = '';

    // Iterate over coursesData
    for (const [id, course] of Object.entries(coursesData)) {
        // Determine theme class based on ID or Category
        let themeClass = '';
        if (id === 'arab') themeClass = 'course-card-arab';
        else if (id === 'fiqih') themeClass = 'course-card-fiqih';
        else if (id === 'usym') themeClass = 'course-card-adab';
        else themeClass = 'course-card-arab'; // Default

        // Determine pill class
        let pillClass = '';
        if (id === 'arab') pillClass = 'tag-arab';
        else if (id === 'fiqih') pillClass = 'tag-fiqih';
        else if (id === 'usym') pillClass = 'tag-adab';

        const modCount = course.curriculum ? course.curriculum.length : 0;
        const studentCount = 1; // Mock data

        // Generate Star Rating HTML
        // Parse "5.0" from "5.0 (120 Review)"
        const ratingVal = parseFloat(course.rating.split(' ')[0]) || 5.0;
        let starHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= ratingVal) starHtml += '<i class="fas fa-star"></i>';
            else if (i - 0.5 <= ratingVal) starHtml += '<i class="fas fa-star-half-alt"></i>';
            else starHtml += '<i class="far fa-star"></i>'; // empty star if needed
        }

        html += `
            <div class="course-card ${themeClass}">
                <div class="course-thumb">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-content">
                    <span class="category-pill ${pillClass}">${course.category}</span>
                    
                    <h3 class="course-title"><a href="course-detail.html?id=${id}">${course.title}</a></h3>
                    
                    <div class="course-rating-row">
                        <span class="stars">${starHtml}</span>
                        <span class="rating-num">(${course.rating})</span>
                    </div>

                    <div class="course-instructor">
                        <img src="${course.instructorImg}" alt="Instructor">
                        <div class="instructor-info">
                            <span class="name">${course.instructor.split(',')[0]}</span> <!-- Shorten name often better -->
                            <span class="role">Instructor</span>
                        </div>
                    </div>

                    <div class="course-footer-meta">
                        <span><i class="far fa-file-alt"></i> ${modCount} Modul</span>
                        <span><i class="far fa-user"></i> ${studentCount} Siswa</span>
                    </div>
                </div>
            </div>
        `;
    }

    grid.innerHTML = html;
}

// Load All Blogs Function (Redesigned)
function loadAllBlogs() {
    const grid = document.getElementById('allBlogsGrid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear skeleton/loading

    Object.keys(blogsData).forEach(id => {
        const blog = blogsData[id];
        const card = document.createElement('div');
        card.className = 'blog-card';

        // Split date to get "12 JUL" format if needed, simplistic approach:
        const dateParts = blog.date.split(' '); // e.g., "18 Des 2025" -> ["18", "Des", "2025"]
        const shortDate = dateParts.slice(0, 2).join(' ');

        card.innerHTML = `
            <div class="blog-thumb">
                <img src="${blog.image}" alt="${blog.title}">
                <div class="blog-badge-category">${blog.category}</div>
            </div>
            <div class="blog-content">
                <div class="blog-author">
                    <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 10}.jpg" alt="Author">
                    <div class="blog-author-info">
                        <span class="author-name">By Educatex</span>
                        <span class="blog-date-text">${blog.date}</span>
                    </div>
                </div>
                
                <h3 class="blog-title"><a href="blog-detail.html?id=${id}">${blog.title}</a></h3>
                
                <a href="blog-detail.html?id=${id}" class="btn-blog-pill">
                    Lanjut Membaca <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadBlogDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    const blog = blogsData[blogId];

    if (!blog) {
        document.body.innerHTML = "<h1 class='text-center mt-5'>Artikel tidak ditemukan</h1>";
        return;
    }

    // Update Meta
    document.title = `${blog.title} - Bincang Ilmu`;

    // Populate Content
    const container = document.querySelector('.blog-detail-container'); // Need to ensure HTML has this class
    if (container) {
        // This assumes we have a specific structure in blog-detail.html 
        // For simplicity, let's target IDs if we set them, or injection points.
        // Based on blog-detail.html assumption:
        document.getElementById('blogTitle').textContent = blog.title;
        document.getElementById('blogDate').textContent = blog.date;
        document.getElementById('blogCategory').textContent = blog.category;
        document.getElementById('blogImage').src = blog.image;
        document.getElementById('blogContent').innerHTML = blog.content;
    }
}

// === Fatwa Functions ===
// === Fatwa Functions ===

function renderFatwaList(fatwaList) {
    const grid = document.getElementById('allFatwasGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (Object.keys(fatwaList).length === 0) {
        grid.innerHTML = '<p class="text-center" style="color: var(--text-light);">Tidak ada fatwa yang ditemukan.</p>';
        return;
    }

    Object.keys(fatwaList).forEach(id => {
        const fatwa = fatwaList[id];
        const card = document.createElement('div');
        card.className = 'fatwa-card'; // New Text-Only Card Style
        card.innerHTML = `
            <div class="fatwa-content">
                <div class="fatwa-meta">
                    <span class="fatwa-category">${fatwa.category}</span>
                    <span>•</span>
                    <span><i class="fas fa-calendar-alt"></i> ${fatwa.date}</span>
                </div>
                <h3 class="fatwa-title"><a href="fatwa-detail.html?id=${id}">${fatwa.title}</a></h3>
                <p style="color: var(--text-light); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
                    ${fatwa.excerpt}
                </p>
                <div class="">
                    <a href="fatwa-detail.html?id=${id}" class="btn-pill-glass">Baca Jawaban Lengkap <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderPopularFatwas() {
    const container = document.getElementById('popularFatwasList');
    if (!container) return;

    container.innerHTML = '';

    // Filter for popular items
    const popularItems = Object.entries(fatwasData).filter(([id, data]) => data.popular).slice(0, 5);

    popularItems.forEach(([id, fatwa], index) => {
        const item = document.createElement('div');
        item.className = 'popular-item';
        item.innerHTML = `
            <div class="popular-number">${index + 1}</div>
            <div class="popular-content">
                <h4><a href="fatwa-detail.html?id=${id}">${fatwa.title}</a></h4>
                <div style="font-size: 0.8rem; color: var(--text-light);">${fatwa.category}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function loadAllFatwas() {
    // Initial Render
    renderFatwaList(fatwasData);
    renderPopularFatwas();

    // Search Logic
    const searchInput = document.getElementById('fatwaSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = {};

            Object.keys(fatwasData).forEach(id => {
                const fatwa = fatwasData[id];
                if (fatwa.title.toLowerCase().includes(term) || fatwa.excerpt.toLowerCase().includes(term)) {
                    filtered[id] = fatwa;
                }
            });

            renderFatwaList(filtered);
        });
    }
}

// =========================================
// User Profile Logic (Global Helpers)
// =========================================

// Make these global so onclick attributes work reliably
// Make these global so onclick attributes work reliably
window.toggleProfileMenu = function (event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const dropdown = document.getElementById('profileDropdown');
    const isActive = dropdown.classList.contains('active');

    // Explicitly toggle
    if (isActive) {
        dropdown.classList.remove('active');
    } else {
        dropdown.classList.add('active');
    }

    console.log('Profile toggled manually. New state active:', !isActive);
}

window.openProfileModal = function (type) {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.remove('active');

    let modalId = '';
    if (type === 'settings') modalId = 'settingsModal';
    if (type === 'courses') modalId = 'coursesModal';
    if (type === 'certificates') modalId = 'certificatesModal';
    if (type === 'app-settings') modalId = 'appSettingsModal';

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

window.closeProfileModal = function (type) {
    let modalId = '';
    if (type === 'settings') modalId = 'settingsModal';
    if (type === 'courses') modalId = 'coursesModal';
    if (type === 'certificates') modalId = 'certificatesModal';
    if (type === 'app-settings') modalId = 'appSettingsModal';

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

window.handleLogout = function () {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}

window.checkLoginState = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userProfile = document.getElementById('userProfile');

    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (registerBtn) registerBtn.style.display = 'inline-flex';
        if (userProfile) userProfile.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkLoginState();

    // Close Dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('userProfile');
        const dropdown = document.getElementById('profileDropdown');
        if (wrapper && !wrapper.contains(e.target)) {
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        }
    });

    // Mock Login Action
    const loginForm = document.querySelector('#loginForm form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            if (typeof closeModal === 'function') closeModal(); // Ensure this exists from main script
            checkLoginState();
            alert("Login Berhasil! Selamat datang Abdullah.");
        });
    }
});

function loadFatwaDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const fatwaId = urlParams.get('id');
    const fatwa = fatwasData[fatwaId];

    if (!fatwa) {
        document.body.innerHTML = "<h1 class='text-center mt-5'>Fatwa tidak ditemukan</h1>";
        return;
    }

    document.title = `${fatwa.title} - Fatwa Bincang Ilmu`;

    // Using same IDs as blog for simplicity if we copied the file, or updated IDs
    // Let's assume we update IDs in fatwa-detail.html to match these or reuse blog IDs
    const titleEl = document.getElementById('fatwaTitle') || document.getElementById('blogTitle');
    const dateEl = document.getElementById('fatwaDate') || document.getElementById('blogDate');
    const catEl = document.getElementById('fatwaCategory') || document.getElementById('blogCategory');
    const imgEl = document.getElementById('fatwaImage') || document.getElementById('blogImage');
    const contentEl = document.getElementById('fatwaContent') || document.getElementById('blogContent');

    if (titleEl) titleEl.textContent = fatwa.title;
    if (dateEl) dateEl.textContent = fatwa.date;
    if (catEl) catEl.textContent = fatwa.category;
    if (imgEl) imgEl.src = fatwa.image;
    if (contentEl) contentEl.innerHTML = fatwa.content;
}

// =========================================
// Global Search Logic
// =========================================
window.openSearch = function () {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('active');
        const input = document.getElementById('globalSearchInput');
        if (input) setTimeout(() => input.focus(), 100);
    }
}

window.closeSearch = function () {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Global Slider Logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000); // Change image every 4 seconds
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    // ... existing content ...
});

// Close search on Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('searchOverlay');
        if (overlay && overlay.classList.contains('active')) {
            closeSearch();
        }
    }
});


// Radio Player Logic Removed
