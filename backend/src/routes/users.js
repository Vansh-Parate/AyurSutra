const express = require('express');
const { authenticateToken, requireRole, requireOwnershipOrAdmin } = require('../middleware/auth');
const { profileUpdateValidation, passwordChangeValidation } = require('../middleware/validation');
const UserService = require('../services/userService');

const router = express.Router();

// All user routes require authentication
router.use(authenticateToken);

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.user.id);
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch profile'
    });
  }
});

// Update user profile
router.put('/profile', profileUpdateValidation, async (req, res) => {
  try {
    const { fullName, profile, preferences } = req.body;
    
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (profile) updateData.profile = { ...req.user.profile, ...profile };
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

    const user = await UserService.updateProfile(req.user.id, updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to update profile'
    });
  }
});

// Change password
router.put('/change-password', passwordChangeValidation, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await UserService.findById(req.user.id);
    
    // Verify current password
    const isMatch = await UserService.comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: 'Invalid password',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    await UserService.changePassword(req.user.id, newPassword);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to change password'
    });
  }
});

// Get all users (admin only)
router.get('/', requireRole(['ADMIN']), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    const result = await UserService.getAllUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      role,
      search
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch users'
    });
  }
});

// Get user by ID (admin only)
router.get('/:id', requireRole(['ADMIN']), async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch user'
    });
  }
});

// Update user status (admin only)
router.put('/:id/status', requireRole(['ADMIN']), async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const user = await UserService.updateUserStatus(req.params.id, isActive);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to update user status'
    });
  }
});

module.exports = router;
