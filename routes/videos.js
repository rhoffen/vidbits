const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  if (!title) {
    res.body.title = '';
    res.send();
  }
  const newVideo = await new Video({title, description, videoUrl});
  await newVideo.save();
  res.render('/videos/show', {newVideo});
});

router.get('/videos/create', async (req, res, next) => {
  res.render('create');
});

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

module.exports = router;
