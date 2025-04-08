const express = require('express');
const router = express.Router();
const { getTracks, addTrack } = require('../controllers/track-controller');

router
  .route('/')
  .get(getTracks)
  .post(addTrack);

module.exports = router;