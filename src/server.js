const express = require('express');
const cors = require('cors');
require('dotenv').config();

if (process.env.NODE_ENV === 'production' && !process.env.DATA_DIR) {
  throw new Error('DATA_DIR must point to persistent storage in production');
}
if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  throw new Error('JWT_SECRET must be configured with at least 32 characters in production');
}

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const coursesRoutes = require('./routes/courses');
const kitabRoutes = require('./routes/kitab');
const blogsRoutes = require('./routes/blogs');
const fatwasRoutes = require('./routes/fatwas');
const adsRoutes = require('./routes/ads');
const partnersRoutes = require('./routes/partners');
const siteSettingsRoutes = require('./routes/site-settings');
const usersRoutes = require('./routes/users');

const app = express();
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

// Middleware global
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',').map(origin => origin.trim()).filter(Boolean);
app.use((req, res, next) => {
  const origin = req.get('origin');
  const ownOrigin = `${req.protocol}://${req.get('host')}`;
  if (!origin || origin === ownOrigin) return next();
  if (allowedOrigins.includes(origin) || (process.env.NODE_ENV !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))) {
    return cors({ origin, optionsSuccessStatus: 204 })(req, res, next);
  }
  return res.status(403).json({ error: 'Origin is not allowed by CORS' });
});
app.use(express.json({ limit: '1mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/kitab', kitabRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/fatwas', fatwasRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', (req, res) => res.status(404).json({ error: 'API endpoint not found' }));

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
