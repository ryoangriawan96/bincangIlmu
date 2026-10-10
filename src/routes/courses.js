const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken } = require('../middleware/auth');

const db = getDB('courses');

// GET /api/courses – list semua
router.get('/', (req, res) => {
  try {
    res.json(db.getData());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:id – detail satu
router.get('/:id', (req, res) => {
  try {
    const item = db.find(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/courses – buat baru
router.post('/', authenticateToken, (req, res) => {
  try {
    const newItem = {
      id: require('uuid').v4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.push(newItem);
    db.write();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/courses/:id – update
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const item = db.find(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    
    // Update item dengan data yang diterima
    Object.assign(item, req.body, { updatedAt: new Date().toISOString() });
    
    db.write();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/courses/:id – hapus
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const removed = db.remove(req.params.id);
    if (removed.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;