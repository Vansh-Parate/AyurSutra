const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserService = require('../services/userService');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth Profile:', profile);
    const state = req.query.state;
    let role = 'PATIENT';
    if (state) {
      try {
        const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
        if (decodedState.role) {
          role = decodedState.role.toUpperCase();
        }
      } catch (error) {
        console.error('Error parsing state:', error);
      }
    }
    
    // Check if user exists with Google ID
    let user = await UserService.findByGoogleId(profile.id);
    
    if (user) {
      // Update last login
      await UserService.updateLastLogin(user.id);
      return done(null, user);
    }
    
    // Check if user exists with same email
    user = await UserService.findByEmail(profile.emails[0].value);
    
    if (user) {
      // Link Google account to existing user
      await UserService.updateUser(user.id, {
        googleId: profile.id,
        isEmailVerified: true,
        lastLogin: new Date()
      });
      return done(null, user);
    }
    
    // Create new user
    user = await UserService.createUser({
      googleId: profile.id,
      fullName: profile.displayName,
      email: profile.emails[0].value,
      password: 'google-oauth-' + Date.now(), // Temporary password
      role: role
    });
    
    // Update with additional Google data
    await UserService.updateUser(user.id, {
      isEmailVerified: true,
      lastLogin: new Date(),
      avatar: profile.photos[0]?.value
    });
    
    console.log('New user created via Google OAuth:', user.email);
    return done(null, user);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error, null);
  }
}));

module.exports = passport;
