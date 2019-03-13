const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;

  const newVideo = await new Video({title, description, videoUrl});

  newVideo.validateSync();

  if (newVideo.errors) {
    // console.log('errors object: ' + JSON.stringify(newVideo.errors));
    newVideo.errors.title.message = 'could not find title input';
    // console.log('errors object reset message: ' + JSON.stringify(newVideo.errors));
    res.status(400).render('create', { newVideo });
  } else {
    const video = await newVideo.save();
    res.status(201).render('videos/show', {video});
  }
});

router.get('/videos/create', async (req, res, next) => {
  res.render('create');
});

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

module.exports = router;
