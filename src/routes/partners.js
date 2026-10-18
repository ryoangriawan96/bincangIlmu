const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const db = getDB('partners');

router.get('/', (req, res) => {
  try { res.json(db.getData()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const id = typeof req.body.id === 'string' ? req.body.id : require('uuid').v4();
    if (db.find(id)) return res.status(409).json({ error: 'ID mitra sudah digunakan.' });
    const now = new Date().toISOString();
    const item = { ...req.body, id, createdAt: now, updatedAt: now };
    db.push(item); db.write();
    res.status(201).json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const item = db.update(req.params.id, { ...req.body, id: req.params.id, updatedAt: new Date().toISOString() });
    if (!item) return res.status(404).json({ error: 'Mitra tidak ditemukan.' });
    db.write(); res.json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const removed = db.remove(req.params.id);
    if (!removed.length) return res.status(404).json({ error: 'Mitra tidak ditemukan.' });
    db.write(); res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
