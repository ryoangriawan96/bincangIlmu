const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = getDB('users');

// Registrasi
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'Siswa' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, password required' });
    }
    const exists = db.find(email); // Mencari berdasarkan email
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
    db.push(newUser);
    db.write();
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Don't send password in response
    const { password: _, ...safeUser } = newUser;
    res.status(201).json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = db.find(email); // Mencari berdasarkan email
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Don't send password in response
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;