const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken } = require('../middleware/auth');

const db = getDB('users');

// GET /api/users – list semua (hanya untuk admin)
router.get('/', authenticateToken, (req, res) => {
  try {
    const data = db.get('data').value();
    // Don't send passwords in response
    const safeData = data.map(({ password, ...user }) => user);
    res.json(safeData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id – detail satu
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const data = db.get('data').value();
    const item = data.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    // Don't send password
    const { password, ...safeItem } = item;
    res.json(safeItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users – buat baru (hanya untuk admin)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, email, password, role = 'Siswa' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, password required' });
    }
    const exists = db.get('data').find({ email }).value();
    if (exists) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const newUser = {
      id: require('uuid').v4(),
      name,
      email,
      password, // ⚠️ dalam produksi gunakan hash!
      role,
      createdAt: new Date().toISOString()
    };
    db.get('data').push(newUser).write();
    // Don't send password in response
    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id – update
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const updateData = { 
      name, 
      email, 
      role,
      ...(password && { password }) // Only update password if provided
    };
    
    const item = getDB('users')
      .get('data')
      .find({ id: req.params.id })
      .assign({ ...updateData, updatedAt: new Date().toISOString() })
      .write();

    if (!item) return res.status(404).json({ error: 'Not found' });
    // Don't send password in response
    const { password: _, ...safeItem } = item;
    res.json(safeItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id – hapus
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const removed = getDB('users')
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