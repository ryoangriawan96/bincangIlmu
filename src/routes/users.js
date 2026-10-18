const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { v4: uuid } = require('uuid');
const { hashPassword } = require('../utils/password');

const db = getDB('users');

router.use(authenticateToken, requireAdmin);

router.get('/', (req, res) => {
  const safeData = db.getData().map(({ password, ...user }) => user);
  res.json(safeData);
});

router.get('/:id', (req, res) => {
  const item = db.find(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  const { password, ...safeItem } = item;
  res.json(safeItem);
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || !name.trim() || !email.trim() || password.length < 8) {
    return res.status(400).json({ error: 'Name, valid email, and password (at least 8 characters) are required' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (db.findByEmail(normalizedEmail)) return res.status(409).json({ error: 'Email already exists' });
  const newUser = {
    id: uuid(), name: name.trim(), email: normalizedEmail,
    password: hashPassword(password), role: 'Siswa', createdAt: new Date().toISOString()
  };
  db.push(newUser);
  db.write();
  const { password: omitted, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

router.put('/:id', (req, res) => {
  const { name, email, password } = req.body;
  const item = db.find(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (email && db.getData().some(user => user.id !== item.id && user.email === String(email).trim().toLowerCase())) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  const changes = { updatedAt: new Date().toISOString() };
  if (typeof name === 'string' && name.trim()) changes.name = name.trim();
  if (typeof email === 'string' && email.trim()) changes.email = email.trim().toLowerCase();
  if (typeof password === 'string' && password.length >= 8) changes.password = hashPassword(password);
  db.update(req.params.id, changes);
  db.write();
  const { password: omitted, ...safeItem } = item;
  res.json(safeItem);
});

router.delete('/:id', (req, res) => {
  const removed = db.remove(req.params.id);
  if (!removed.length) return res.status(404).json({ error: 'Not found' });
  db.write();
  res.json({ message: 'Deleted' });
});

module.exports = router;
