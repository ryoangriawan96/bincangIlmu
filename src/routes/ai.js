const express = require('express');
const router = express.Router();

// Placeholder route - akan diganti dengan integrasi AI nyata
router.post('/', (req, res) => {
  const { prompt } = req.body;
  
  // Respons placeholder sambil menunggu integrasi AI
  res.json({
    reply: `<div class="ai-message system-message"><div class="message-content">Ini adalah respons placeholder dari backend. Integrasi AI akan ditambahkan segera.</div></div>`,
    suggestions: [
      { text: 'Lihat semua kursus', url: 'courses.html' },
      { text: 'Lihat semua kitab', url: 'kitab.html' }
    ]
  });
});

module.exports = router;