const jwt = require('jsonwebtoken');
const { getDB } = require('../utils/db');
require('dotenv').config();
const userDB = getDB('users');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'], issuer: 'bincangilmu' }, (err, user) => {
    if (err) return res.sendStatus(403);
    const persistedUser = userDB.find(user.id);
    if (!persistedUser) return res.sendStatus(403);
    req.user = { id: persistedUser.id, email: persistedUser.email, role: persistedUser.role };
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user || userDB.find(req.user.id)?.role !== 'Admin') return res.sendStatus(403);
  next();
}

module.exports = { authenticateToken, requireAdmin };
