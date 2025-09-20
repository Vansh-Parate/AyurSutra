const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const { generateTokenPair } = require('../utils/jwt');

// Sign up
const signup = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { fullName, email, phoneNumber, password, role } = req.body;
    
    // Convert role to uppercase for database storage
    const dbRole = role.toUpperCase();

    // Check if user already exists
    const existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists',
        message: 'An account with this email already exists'
      });
    }

    // Create new user
    const user = await UserService.createUser({
      fullName,
      email,
      phoneNumber,
      password,
      role: dbRole
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokenPair(user);

    // Update last login
    await UserService.updateLastLogin(user.id);

    res.status(201).json({
      message: 'User created successfully',
      token: accessToken,
      refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to create account'
    });
  }
};

// Sign in
const signin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(400).json({ 
        error: 'Account deactivated',
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Compare password
    const isMatch = await UserService.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokenPair(user);

    // Update last login
    await UserService.updateLastLogin(user.id);

    res.json({
      message: 'Login successful',
      token: accessToken,
      refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to authenticate'
    });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User account not found'
      });
    }

    res.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        profile: user.profile,
        preferences: user.preferences,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to get user information'
    });
  }
};

// Logout (client-side token removal, but we can log it)
const logout = async (req, res) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    // For now, we'll just return success since JWT is stateless
    res.json({ 
      message: 'Logout successful',
      note: 'Please remove the token from client storage'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to logout'
    });
  }
};

// Google OAuth callback
const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/signin?error=google_auth_failed`);
    }

    // Generate tokens for the authenticated user
    const { accessToken, refreshToken } = generateTokenPair(req.user);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/google-success?token=${accessToken}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth/signin?error=google_auth_failed`);
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ 
        error: 'Refresh token required',
        message: 'Please provide a refresh token'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Get user
    const user = await UserService.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        error: 'Invalid refresh token',
        message: 'User not found or inactive'
      });
    }

    // Generate new token pair
    const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(user);

    res.json({
      message: 'Token refreshed successfully',
      token: accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      error: 'Invalid refresh token',
      message: 'Failed to refresh token'
    });
  }
};

module.exports = {
  signup,
  signin,
  getMe,
  logout,
  googleCallback,
  refreshToken
};
