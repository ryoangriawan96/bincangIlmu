const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const coursesRoutes = require('./routes/courses');
const kitabRoutes = require('./routes/kitab');
const blogsRoutes = require('./routes/blogs');
const fatwasRoutes = require('./routes/fatwas');
const adsRoutes = require('./routes/ads');
const usersRoutes = require('./routes/users');

const app = express();

// Middleware global
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/kitab', kitabRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/fatwas', fatwasRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/users', usersRoutes);

// Serve static frontend files
const path = require('path');
const frontendPath = path.resolve(__dirname, '../');
// The repository root also contains private backend code and JSON databases.
app.use('/src', (req, res) => res.sendStatus(404));
app.use(express.static(frontendPath));

// Fallback ke index.html untuk SPA-like routing (opsional)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
