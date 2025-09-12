const { score_assessment } = require('../services/doshaScoring');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Assessment controller for handling dosha assessment requests
const assessmentController = {
  // Score assessment data using Python model
  async scoreAssessment(req, res) {
    try {
      const { body, skin, digestion, energy, sleep, climate, mind } = req.body;
      
      // Prepare data for Python scoring model
      const assessmentData = {
        body_frame: body,
        skin_hair: skin,
        digestion: digestion,
        energy: energy,
        sleep: sleep,
        climate: climate,
        mind: mind
      };
      
      // Call Python scoring function
      const analysis = await score_assessment(assessmentData);
      
      res.json({
        success: true,
        analysis: analysis
      });
    } catch (error) {
      console.error('Assessment scoring error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to score assessment'
      });
    }
  },

  // Save assessment results to database
  async saveAssessment(req, res) {
    try {
      const userId = req.user.id;
      const { body, skin, digestion, energy, sleep, climate, mind } = req.body;
      
      // Prepare data for Python scoring model
      const assessmentData = {
        body_frame: body,
        skin_hair: skin,
        digestion: digestion,
        energy: energy,
        sleep: sleep,
        climate: climate,
        mind: mind
      };
      
      // Get dosha analysis
      const analysis = await score_assessment(assessmentData);
      
      // Save to database
      const assessment = await prisma.assessment.create({
        data: {
          userId: userId,
          bodyFrame: body,
          skinHair: skin,
          digestion: digestion,
          energy: energy,
          sleep: sleep,
          climate: climate,
          mind: mind,
          vataScore: analysis.scores.vata,
          pittaScore: analysis.scores.pitta,
          kaphaScore: analysis.scores.kapha,
          dominantDosha: analysis.dominant_dosha,
          balanceStatus: analysis.balance_status,
          recommendations: analysis.recommendations
        }
      });
      
      res.json({
        success: true,
        assessment: assessment,
        analysis: analysis
      });
    } catch (error) {
      console.error('Assessment save error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save assessment'
      });
    }
  },

  // Get user's assessment history
  async getAssessmentHistory(req, res) {
    try {
      const userId = req.user.id;
      
      const assessments = await prisma.assessment.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json({
        success: true,
        assessments: assessments
      });
    } catch (error) {
      console.error('Assessment history error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch assessment history'
      });
    }
  },

  // Get latest assessment for user
  async getLatestAssessment(req, res) {
    try {
      const userId = req.user.id;
      
      const assessment = await prisma.assessment.findFirst({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' }
      });
      
      if (!assessment) {
        return res.json({
          success: true,
          assessment: null
        });
      }
      
      res.json({
        success: true,
        assessment: assessment
      });
    } catch (error) {
      console.error('Latest assessment error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch latest assessment'
      });
    }
  }
};

module.exports = assessmentController;
