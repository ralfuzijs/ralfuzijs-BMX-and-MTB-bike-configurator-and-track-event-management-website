const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const LoginHistorySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in query results by default
  },
  profilePicture: {
    type: String,
    default: '/images/default-profile.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  permissions: [{
    type: String,
    enum: ['read', 'create', 'update', 'delete']
  }],
  lastLogin: {
    type: Date
  },
  loginHistory: [LoginHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the "updatedAt" field on each save
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored hash
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to record login history
UserSchema.methods.recordLogin = function(ipAddress, userAgent) {
  this.lastLogin = Date.now();
  this.loginHistory.push({ 
    timestamp: this.lastLogin, 
    ipAddress, 
    userAgent 
  });
  
  // Keep only the last 10 login records
  if (this.loginHistory.length > 10) {
    this.loginHistory = this.loginHistory.slice(-10);
  }
  
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);