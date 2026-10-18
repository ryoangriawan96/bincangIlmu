const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const db = getDB('fatwas');

// GET /api/fatwas – list semua
router.get('/', (req, res) => {
  try {
    const data = db.getData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/fatwas/:id – detail satu
router.get('/:id', (req, res) => {
  try {
    const data = db.getData();
    const item = data.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/fatwas – buat baru
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const newItem = {
      ...req.body,
      id: typeof req.body.id === 'string' ? req.body.id : require('uuid').v4(),
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

// PUT /api/fatwas/:id – update
router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const item = db.update(req.params.id, { ...req.body, id: req.params.id, updatedAt: new Date().toISOString() });
    if (item) db.write();

    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/fatwas/:id – hapus
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const removed = db.remove(req.params.id);
    if (removed.length) db.write();

    if (removed.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
