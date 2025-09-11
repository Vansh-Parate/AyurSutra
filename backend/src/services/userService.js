const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');

class UserService {
  // Create a new user
  static async createUser(userData) {
    const { fullName, email, password, role = 'PATIENT' } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    return await prisma.user.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role
      }
    });
  }

  // Find user by email
  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
  }

  // Find user by ID
  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  // Find user by Google ID
  static async findByGoogleId(googleId) {
    return await prisma.user.findUnique({
      where: { googleId }
    });
  }

  // Update user
  static async updateUser(id, updateData) {
    return await prisma.user.update({
      where: { id },
      data: updateData
    });
  }

  // Update last login
  static async updateLastLogin(id) {
    return await prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() }
    });
  }

  // Get all users with pagination
  static async getAllUsers(options = {}) {
    const { page = 1, limit = 10, role, search } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          avatar: true,
          isEmailVerified: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    };
  }

  // Compare password
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user status
  static async updateUserStatus(id, isActive) {
    return await prisma.user.update({
      where: { id },
      data: { isActive }
    });
  }

  // Delete user (soft delete by setting isActive to false)
  static async deleteUser(id) {
    return await prisma.user.update({
      where: { id },
      data: { isActive: false }
    });
  }

  // Get user profile (without sensitive data)
  static async getUserProfile(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        avatar: true,
        isEmailVerified: true,
        profile: true,
        preferences: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  // Update user profile
  static async updateProfile(id, profileData) {
    return await prisma.user.update({
      where: { id },
      data: profileData,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        avatar: true,
        isEmailVerified: true,
        profile: true,
        preferences: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  // Change password
  static async changePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    return await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });
  }
}

module.exports = UserService;
