const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['skatepark', 'pumptrack', 'bmx_track'],
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    }
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location queries
TrackSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Track', TrackSchema);