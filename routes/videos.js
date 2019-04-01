const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;

  const newVideo = await new Video({title, description, videoUrl});

  newVideo.validateSync();

  if (newVideo.errors) {
    if (newVideo.errors.title) {
      newVideo.errors.title.message = 'could not find title input';
    } else if (newVideo.errors.videoUrl) {
      newVideo.errors.videoUrl.message = 'Video URL required';
    }
    res.status(400).render('create', { newVideo });
  } else {
    const video = await newVideo.save();
    res.status(302).render('videos/show', {video});
  }
});

router.get('/videos/create', async (req, res, next) => {
  res.render('create');
});

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.get('/videos/:id', async (req, res, next) => {
  const newVideo = await Video.findById(req.params.id);
  res.render('videos/show', {newVideo});
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const videoToEdit = await Video.findById(req.params.id);
  res.render('videos/edit', {videoToEdit});
});

router.post('/videos/:id/updates', async (req, res, next) => {
  // console.log('post request id: ' + req.params.id);

  const {title, videoUrl, description} = req.body;

  const updatedVideo = await Video.findOne({_id: req.params.id});
    updatedVideo.title = title;
    updatedVideo.videoUrl = videoUrl;
    updatedVideo.description = description;

  updatedVideo.validateSync();

    if (updatedVideo.errors) {
      // console.log(`errors: ${JSON.stringify(updatedVideo.errors)}`);
      const videoToEdit = updatedVideo;
      res.status(400).render('videos/edit', { videoToEdit });
    } else {
      // console.log('debug 2')
      await updatedVideo.save();
      // res.status(302).redirect(`/videos/show`);
      res.status(302).redirect(`/videos/${updatedVideo._id}`);
    }
});

router.post('/videos/:id/deletions', async (req, res, next) => {
  console.log(':id = ' + req.params.id);
   await Video.deleteOne({ _id: req.params.id});
   res.redirect('/');
});

module.exports = router;
