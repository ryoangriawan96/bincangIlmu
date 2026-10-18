# 📚 Bincang Ilmu

Platform pembelajaran Islam digital yang menyediakan kursus, kitab, artikel, dan fatwa berdasarkan Al-Qur'an dan Sunnah, dengan backend API untuk manajemen data dan integrasi AI.

## ✨ Fitur

- 🎓 **Kursus Online** — Video pembelajaran dengan progress tracking
- 📖 **Perpustakaan Kitab** — Koleksi kitab digital lengkap
- ✍️ **Artikel & Blog** — Artikel ilmiah dengan kategori
- ⚖️ **Bank Fatwa** — Kumpulan fatwa dengan pencarian
- 🎙️ **Radio Islami** — Streaming radio 24/7
- 🌙 **Dark Mode** — Tema gelap/terang
- 👨‍💼 **Admin Dashboard** — Kelola semua konten
- 🤖 **AI Chatbot** — Endpoint antarmuka tersedia; layanan AI belum dikonfigurasi
- 💾 **Backend API** — REST API untuk login, pendaftaran, katalog, dan dashboard admin

## 🚀 Demo

Alamat demo publik belum dikonfigurasi.

## 🛠️ Teknologi

### Frontend
- HTML5 + CSS3 + Vanilla JavaScript
- Font Awesome Icons
- Google Fonts
- HTML/CSS/JavaScript vanilla; autentikasi memakai API dan sesi tab
- `api-config.js` menentukan alamat backend API

### Backend
- Node.js + Express.js
- JWT untuk autentikasi
- File JSON untuk data lokal; gunakan persistent disk pada deployment
- RESTful API design
- CORS dibatasi ke origin yang dikonfigurasi
- Static file serving

## 📂 Struktur

```
bincangilmu/
├─ index.html          # Beranda
├─ courses.html        # Daftar Kursus
├─ course-detail.html  # Detail Kursus
├─ course-player.html  # Pemutar Kursus
├─ kitab.html          # Perpustakaan Kitab
├─ books.html          # Detail Kitab
├─ blog.html           # Artikel
├─ blog-detail.html    # Detail Artikel
├─ fatwa.html          # Bank Fatwa
├─ fatwa-detail.html   # Detail Fatwa
├─ about.html          # Tentang Kami
├─ admin.html          # Dashboard Admin
├─ style.css           # Stylesheet utama
├─ admin.css           # Stylesheet admin
├─ script.js           # Logic utama
├─ admin.js            # Logic admin
├─ kitab_logic.js      # Logic kitab
├─ kitabData_generated.js # Data kitab statis
├─ package.json        # Backend dependencies
├─ README.md           # Dokumentasi ini
├─ .env.example        # Contoh environment variables
└─ src/                # Source code backend
   ├─ server.js        # Entry point aplikasi
   ├─ routes/
   │  ├─ auth.js       # Autentikasi (register/login)
   │  ├─ ai.js         # Chatbot AI endpoint
   │  ├─ courses.js    # CRUD kursus
   │  ├─ kitab.js      # CRUD kitab
   │  ├─ blogs.js      # CRUD artikel
   │  ├─ fatwas.js     # CRUD fatwa
   │  ├─ ads.js        # CRUD iklan
   │  └─ users.js      # CRUD pengguna (management)
   ├─ middleware/
   │  └─ auth.js       # JWT verification middleware
   ├─ utils/
   │  └─ db.js         # LowDB wrapper
   └─ data/
      ├─ courses.json   # Data kursus
      ├─ kitab.json     # Data kitab
      ├─ blogs.json     # Data artikel
      ├─ fatwas.json    # Data fatwa
      ├─ ads.json       # Data iklan
      └─ users.json     # Data pengguna
```

## 🔧 Backend Setup

1. Install dependensi backend:
   ```bash
   npm install
   ```

2. Salin `.env.example` ke `.env` dan isi `JWT_SECRET` serta `ADMIN_BOOTSTRAP_TOKEN` dengan nilai acak yang kuat dan berbeda (masing-masing minimal 32 karakter; misalnya `openssl rand -hex 32`):
   ```bash
   cp .env.example .env
   ```

3. Jalankan backend secara lokal:
   ```bash
   npm run dev
   ```
   Backend akan berjalan di `http://localhost:5000`

4. Buat akun admin pertama dengan mengirim `POST /api/auth/bootstrap-admin` berisi `name`, `email`, dan `password` (minimal 12 karakter), serta header `x-admin-bootstrap-token` yang nilainya sama dengan `ADMIN_BOOTSTRAP_TOKEN`. Endpoint ini hanya aktif jika belum ada akun Admin. Hapus token bootstrap dari konfigurasi setelah akun admin dibuat.

5. Untuk deploy ke Render:
   - Buat akun di [render.com](https://render.com)
   - Klik "New" → "Web Service"
   - Hubungkan repositori GitHub Anda
   - Atur:
     - Runtime: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Tambahkan `JWT_SECRET` dan `ADMIN_BOOTSTRAP_TOKEN` dengan nilai acak yang berbeda, masing-masing minimal 32 karakter
   - Tambahkan `FRONTEND_ORIGIN` berisi origin frontend yang tepat (tanpa wildcard)
   - Tambahkan persistent disk dan atur `DATA_DIR` sama dengan mount path disk, misalnya `/var/data`
   - Jalankan satu instance backend bila menggunakan penyimpanan file JSON
   - Jika frontend dan backend berada di host berbeda, atur `window.API_BASE` pada `api-config.js` ke URL backend yang berakhiran `/api`; pastikan `FRONTEND_ORIGIN` cocok dengan origin frontend
   - Setelah deployment, buat akun admin pertama memakai endpoint bootstrap di atas, lalu hapus `ADMIN_BOOTSTRAP_TOKEN` dari environment
   - Login dilakukan lewat API. Tidak ada akun admin atau kata sandi demo bawaan lagi
   - Klik "Create Web Service"

## 📄 Lisensi

© 2025 Bincang Ilmu. All rights reserved.
