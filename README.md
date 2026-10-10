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
- 🤖 **AI Chatbot** — Asisten virtual untuk menanya-jawab tentang materi
- 💾 **Backend API** — RESTful API untuk manajemen data terpusat

## 🚀 Demo

Kunjungi: [https://USERNAME.github.io/bincangilmu](https://USERNAME.github.io/bincangilmu)

## 🛠️ Teknologi

### Frontend
- HTML5 + CSS3 + Vanilla JavaScript
- Font Awesome Icons
- Google Fonts
- LocalStorage untuk penyimpanan data (frontend)

### Backend
- Node.js + Express.js
- JWT untuk autentikasi
- LowDB (JSON database) - bisa diganti dengan PostgreSQL
- RESTful API design
- CORS enabled
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

2. Salin `.env.example` ke `.env` dan isi nilai yang sesuai:
   ```bash
   cp .env.example .env
   ```

3. Jalankan backend secara lokal:
   ```bash
   npm run dev
   ```
   Backend akan berjalan di `http://localhost:5000`

4. Untuk deploy ke Render:
   - Buat akun di [render.com](https://render.com)
   - Klik "New" → "Web Service"
   - Hubungkan repositori GitHub Anda
   - Atur:
     - Runtime: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Tambahkan environment variables di bagian "Environment"
   - (Opsional) Tambahkan PostgreSQL sebagai Add-on
   - Klik "Create Web Service"

## 📄 Lisensi

© 2025 Bincang Ilmu. All rights reserved.