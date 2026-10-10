const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken } = require('../middleware/auth');

const db = getDB('ads');

// GET /api/ads – list semua
router.get('/', (req, res) => {
  try {
    const data = db.get('data').value();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ads/:id – detail satu
router.get('/:id', (req, res) => {
  try {
    const data = db.get('data').value();
    const item = data.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ads – buat baru
router.post('/', authenticateToken, (req, res) => {
  try {
    const newItem = {
      id: require('uuid').v4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.get('data').push(newItem).write();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/ads/:id – update
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const item = getDB('ads')
      .get('data')
      .find({ id: req.params.id })
      .assign({ ...req.body, updatedAt: new Date().toISOString() })
      .write();

    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/ads/:id – hapus
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const removed = getDB('ads')
      .get('data')
      .remove({ id: req.params.id })
      .write();

    if (removed.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;