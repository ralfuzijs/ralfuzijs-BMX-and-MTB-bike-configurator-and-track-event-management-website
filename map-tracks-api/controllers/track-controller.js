const Track = require('../models/track');

// @desc    Get all tracks
// @route   GET /api/tracks
// @access  Public
exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    return res.status(200).json({
      success: true,
      count: tracks.length,
      data: tracks
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single track by ID
// @route   GET /api/tracks/:id
// @access  Public
exports.getTrackById = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    
    if (!track) {
      return res.status(404).json({
        success: false,
        error: 'Track not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: track
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid track ID'
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create a track
// @route   POST /api/tracks
// @access  Public (would typically be Private with auth)
exports.addTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    return res.status(201).json({
      success: true,
      data: track
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update a track
// @route   PUT /api/tracks/:id
// @access  Public (would typically be Private with auth)
exports.updateTrack = async (req, res) => {
  try {
    // Find track and update it, return the updated document
    const track = await Track.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true,           // Return the updated document
        runValidators: true  // Validate the update against the schema
      }
    );
    
    if (!track) {
      return res.status(404).json({
        success: false,
        error: 'Track not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: track
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
        error: 'Invalid track ID'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete a track
// @route   DELETE /api/tracks/:id
// @access  Public (would typically be Private with auth)
exports.deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    
    if (!track) {
      return res.status(404).json({
        success: false,
        error: 'Track not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid track ID'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};