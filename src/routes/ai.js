const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { prompt } = req.body;
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 4000) {
    return res.status(400).json({ error: 'Prompt harus berisi 1–4000 karakter' });
  }
  return res.status(503).json({ error: 'Layanan AI belum dikonfigurasi.' });
});

module.exports = router;
