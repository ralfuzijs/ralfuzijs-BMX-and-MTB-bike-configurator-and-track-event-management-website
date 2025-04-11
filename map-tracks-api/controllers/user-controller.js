const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: userExists.email === email ? 'Email already in use' : 'Username already taken'
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      permissions: ['read'] // Default permission
    });

    // Generate token
    const token = generateToken(user._id);

    // Return user data (excluding password)
    return res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        permissions: user.permissions,
        token
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.error('Error in registerUser:', error);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password matches
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Record login with IP address and user agent
    await user.recordLogin(
      req.ip || 'unknown',
      req.headers['user-agent'] || 'unknown'
    );

    // Generate token
    const token = generateToken(user._id);

    // Return user data (excluding password)
    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        permissions: user.permissions,
        token
      }
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error in getUsers:', error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    // req.user should be set by auth middleware
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }
    
    console.error('Error in getUserById:', error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Update fields if provided in request
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;
    
    const updatedUser = await user.save();
    
    return res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        role: updatedUser.role,
        permissions: updatedUser.permissions
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.error('Error in updateUserProfile:', error);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update user by ID (admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Update fields if provided in request
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.role) user.role = req.body.role;
    if (req.body.permissions) user.permissions = req.body.permissions;
    if (req.body.password) user.password = req.body.password;
    if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;
    
    const updatedUser = await user.save();
    
    return res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        role: updatedUser.role,
        permissions: updatedUser.permissions
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    } else {
      console.error('Error in updateUser:', error);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Prevent deleting the last admin user
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete the last admin user'
        });
      }
    }
    
    await user.remove();
    
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    } else {
      console.error('Error in deleteUser:', error);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};