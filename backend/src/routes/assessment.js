const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { authenticateToken } = require('../middleware/auth');

// Assessment routes
router.post('/score', assessmentController.scoreAssessment);
router.post('/', authenticateToken, assessmentController.saveAssessment);
router.get('/history', authenticateToken, assessmentController.getAssessmentHistory);
router.get('/latest', authenticateToken, assessmentController.getLatestAssessment);

module.exports = router;
