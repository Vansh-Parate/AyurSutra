const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const {
  getPatientDashboard,
  getPractitionerDashboard,
  getAdminDashboard,
  getAnalytics
} = require('../controllers/dashboardController');

const router = express.Router();

// All dashboard routes require authentication
router.use(authenticateToken);

// Patient dashboard
router.get('/patient', requireRole(['PATIENT']), getPatientDashboard);

// Practitioner dashboard
router.get('/practitioner', requireRole(['PRACTITIONER']), getPractitionerDashboard);

// Admin dashboard
router.get('/admin', requireRole(['ADMIN']), getAdminDashboard);

// Analytics (admin only)
router.get('/analytics', requireRole(['ADMIN']), getAnalytics);

module.exports = router;
