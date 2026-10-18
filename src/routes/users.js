const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { v4: uuid } = require('uuid');
const { hashPassword } = require('../utils/password');

const db = getDB('users');
const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
const safeUser = ({ password, ...user }) => user;

router.use(authenticateToken, requireAdmin);

router.get('/', (req, res) => {
  const safeData = db.getData().map(safeUser);
  res.json(safeData);
});

router.get('/:id', (req, res) => {
  const item = db.find(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(safeUser(item));
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || !name.trim() || name.trim().length > 100 || !validEmail(email.trim()) || password.length < 8 || password.length > 256) {
    return res.status(400).json({ error: 'Name, valid email, and password (at least 8 characters) are required' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (db.findByEmail(normalizedEmail)) return res.status(409).json({ error: 'Email already exists' });
  const newUser = {
    id: uuid(), name: name.trim(), email: normalizedEmail,
    password: hashPassword(password), role: req.body.role === 'Pengajar' ? 'Pengajar' : 'Siswa', createdAt: new Date().toISOString()
  };
  db.push(newUser);
  db.write();
  res.status(201).json(safeUser(newUser));
});

router.put('/:id', (req, res) => {
  const { name, email, password, role } = req.body;
  const item = db.find(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (typeof name === 'string' && (!name.trim() || name.trim().length > 100)) return res.status(400).json({ error: 'Name tidak valid' });
  if (typeof email === 'string' && (!validEmail(email.trim()) || db.getData().some(user => user.id !== item.id && user.email === email.trim().toLowerCase()))) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  if (typeof password === 'string' && password && (password.length < 8 || password.length > 256)) return res.status(400).json({ error: 'Password harus berisi 8–256 karakter' });
  const changes = { updatedAt: new Date().toISOString() };
  if (typeof name === 'string' && name.trim()) changes.name = name.trim();
  if (typeof email === 'string' && email.trim()) changes.email = email.trim().toLowerCase();
  if (typeof password === 'string' && password) changes.password = hashPassword(password);
  if (role === 'Siswa' || role === 'Pengajar') changes.role = role;
  db.update(req.params.id, changes);
  db.write();
  res.json(safeUser(item));
});

router.delete('/:id', (req, res) => {
  const existing = db.find(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  if (existing.role === 'Admin') return res.status(403).json({ error: 'Akun admin tidak dapat dihapus melalui endpoint ini' });
  const removed = db.remove(req.params.id);
  db.write();
  res.json({ message: 'Deleted' });
});

module.exports = router;
