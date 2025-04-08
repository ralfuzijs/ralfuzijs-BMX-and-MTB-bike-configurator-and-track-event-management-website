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