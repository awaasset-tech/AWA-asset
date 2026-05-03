// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const otpRoutes = require('./routes/otp');
const partnerRoutes = require('./routes/partner');
const documentRoutes = require('./routes/documents');

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for frontend
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy (required for rate limiting on Render)
app.set('trust proxy', 1);

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname, 'build')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AWA Asset Management API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/otp', otpRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/documents', documentRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'AWA Asset Management Partner Enrollment API',
    version: '2.0.0',
    endpoints: {
      otp: {
        send: 'POST /api/otp/send',
        verify: 'POST /api/otp/verify'
      },
      partner: {
        enroll: 'POST /api/partner/enroll',
        status: 'GET /api/partner/:partnerId/status'
      },
      documents: {
        upload: 'POST /api/documents/upload'
      }
    }
  });
});

// Serve React app for all non-API routes (CHANGE THIS)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    res.status(404).json({
      success: false,
      error: 'API endpoint not found'
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 AWA Asset Management - Partner Enrollment API    ║
║                                                        ║
║   Server running on port ${PORT}                       ║
║   Environment: ${process.env.NODE_ENV || 'development'}                     ║
║                                                        ║
║   API Endpoints:                                       ║
║   • POST /api/otp/send                                 ║
║   • POST /api/otp/verify                               ║
║   • POST /api/documents/upload                         ║
║   • POST /api/partner/enroll                           ║
║   • GET  /api/partner/:id/status                       ║
║                                                        ║
║   Health Check: GET /health                            ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
