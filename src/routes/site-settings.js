const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const db = getDB('site-settings');
const DEFAULT_SETTINGS = {
  id: 'global', enabled: false, mode: 'maintenance',
  title: 'Kami sedang melakukan pemeliharaan',
  message: 'Bincang Ilmu sedang diperbarui agar layanan belajar lebih nyaman. Silakan kunjungi kembali sebentar lagi.'
};

router.get('/', (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    res.json({ ...DEFAULT_SETTINGS, ...(db.find('global') || {}) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const mode = req.body.mode === 'comingSoon' ? 'comingSoon' : 'maintenance';
    const title = String(req.body.title || '').trim().slice(0, 120);
    const message = String(req.body.message || '').trim().slice(0, 500);
    if (!title || !message) return res.status(400).json({ error: 'Judul dan pesan wajib diisi.' });
    const value = { ...DEFAULT_SETTINGS, enabled: req.body.enabled === true, mode, title, message, updatedAt: new Date().toISOString() };
    const saved = db.find('global') ? db.update('global', value) : db.push(value);
    db.write();
    res.set('Cache-Control', 'no-store');
    res.json(saved);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
