const express = require('express');
const passport = require('passport');
const { authenticateToken } = require('../middleware/auth');
const { 
  signupValidation, 
  signinValidation 
} = require('../middleware/validation');
const {
  signup,
  signin,
  getMe,
  logout,
  googleCallback,
  refreshToken
} = require('../controllers/authController');

const router = express.Router();

// Public routes
// router.post('/signup', signupValidation, signup);
router.post('/signup', signup);
router.post('/signin', signinValidation, signin);
router.post('/refresh-token', refreshToken);

// Google OAuth routes
router.get('/google', (req, res, next) => {
  const state = req.query.state;
  const authenticator = passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: state
  });
  authenticator(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  googleCallback
);

// Protected routes
router.get('/me', authenticateToken, getMe);
router.post('/logout', authenticateToken, logout);

module.exports = router;
