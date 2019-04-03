const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', { videos });
});

router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/show', {video});
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/edit', {video});
});

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;

  const newVideo = await new Video({title, description, videoUrl});

  newVideo.validateSync();

  if (newVideo.errors) {
    if (newVideo.errors.title) {
      newVideo.errors.title.message = 'Title is required.';
    } else if (newVideo.errors.videoUrl) {
      newVideo.errors.videoUrl.message = 'Video URL is required';
    }
    res.status(400).render('videos/create', { newVideo });
  } else {
    const video = await newVideo.save();
    res.status(302).render('videos/show', {video});
  }
});

router.post('/videos/:id/edit', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const video = await Video.findById(req.params.id);
    video.title = title;
    video.videoUrl = videoUrl;
    video.description = description;

  const updatedVideo = await new Video({title, description, videoUrl});
  updatedVideo.validateSync();

    if (updatedVideo.errors) {
      if (updatedVideo.errors.title) {
          updatedVideo.errors.title.message = "Title is required";
          video.title = "";
          video.description = description;
          video.videoUrl = videoUrl;
      }
      if (updatedVideo.errors.url) {
          video.title = title;
          video.description = description;
          video.url = ""
          updatedVideo.errors.videoUrl.message = "URL is required";
      }

      res.status(400).render('videos/edit', { updatedVideo, video });
    } else {
      await video.save({_id: req.params.id});
      res.status(302).redirect(`/videos/${req.params.id}`);
    }
});

router.post('/videos/:id/deletions', async (req, res, next) => {
   await Video.deleteOne({ _id: req.params.id});
   res.redirect('/');
});

module.exports = router;
