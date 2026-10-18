const express = require('express');
const router = express.Router();
const { timingSafeEqual } = require('crypto');
const { getDB } = require('../utils/db');
const { hashPassword, verifyPassword } = require('../utils/password');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const db = getDB('users');
function issueToken(user) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be configured with a private random value of at least 32 characters');
  }
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function safeUser(user) {
  const { password, ...result } = user;
  return result;
}

// Public registration always creates a learner. Role assignment is never accepted from the client.
router.post('/register', (req, res) => {
  try {
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
    const token = issueToken(newUser);
    db.push(newUser);
    db.write();
    res.status(201).json({ token, user: safeUser(newUser) });
  } catch (err) {
    res.status(500).json({ error: 'Unable to register user' });
  }
});

// One-time admin bootstrap, enabled only when a deployment secret is configured and no admin exists.
router.post('/bootstrap-admin', (req, res) => {
  try {
    const configuredToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
    const providedToken = req.get('x-admin-bootstrap-token');
    if (!configuredToken || configuredToken.length < 32 || !providedToken) return res.sendStatus(404);
    const expected = Buffer.from(configuredToken);
    const actual = Buffer.from(providedToken);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return res.sendStatus(403);
    if (db.getData().some(user => user.role === 'Admin')) return res.status(409).json({ error: 'Admin is already configured' });

    const { name, email, password } = req.body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || !name.trim() || !email.trim() || password.length < 12) {
      return res.status(400).json({ error: 'Name, valid email, and password (at least 12 characters) are required' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (db.findByEmail(normalizedEmail)) return res.status(409).json({ error: 'Email already exists' });
    const admin = { id: uuid(), name: name.trim(), email: normalizedEmail, password: hashPassword(password), role: 'Admin', createdAt: new Date().toISOString() };
    db.push(admin);
    db.write();
    res.status(201).json({ user: safeUser(admin) });
  } catch (err) {
    res.status(500).json({ error: 'Unable to configure admin' });
  }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = db.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = verifyPassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = issueToken(user);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Unable to log in' });
  }
});

module.exports = router;
