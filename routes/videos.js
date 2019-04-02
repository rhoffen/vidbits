const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  // const videos = await Video.find({});
  // res.render('videos/index', {videos});
  res.redirect('/videos');
});

router.get('/videos', async (req, res, next) => {
  console.log('debug 1');
  const videos = await Video.find({});
  console.log('videos.length = ' + videos.length);
  res.render('videos/index', { videos });
});

router.get('/videos/create', async (req, res, next) => {
  //solution has lines 17 and 18.  I don't understand why.
  // const videos = await Video.find({});
  // res.render("videos/create", { videos });
  res.render('videos/create');
});

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  //Solution has line 25:
  // const video = await Video.findById({ _id: req.params.id });
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
      newVideo.errors.title.message = 'could not find title input';
    } else if (newVideo.errors.videoUrl) {
      newVideo.errors.videoUrl.message = 'Video URL required';
    }
    res.status(400).render('videos/create', { newVideo });
  } else {
    const video = await newVideo.save();
    // await newVideo.save();
    // const video = await Video.findById(newVideo._id);
    res.status(302).render('videos/show', {video});
  }
});

// router.post('/videos/:id/edit', async (req, res, next) => {
//   // console.log('post request id: ' + req.params.id);
//
//   const {title, description, videoUrl} = req.body;
//   const video = await Video.findOne({_id: req.params.id});
//   //Solution says:
//   // const videoId = req.params.id;
//   // const video = await Video.findById({ _id: videoId });
//     //Lines 65-67 are my code, in the method suggested by the documentation.
//     // videoToEdit.title = title;
//     // videoToEdit.videoUrl = videoUrl;
//     // videoToEdit.description = description;
//   //Solution updates with new Video:
//   const updatedVideo = new Video({
//     title,
//     description,
//     url
//   });
//   await updatedVideo.validateSync();
//
//     if (updatedVideo.errors) {
//       if (updatedVideo.errors.title) {
//           video.title = ""
//       }
//       if (updatedVideo.errors.url) {
//           video.url = ""
//       }
//       res.status(400).render('videos/edit', { updatedVideo, video });
//     } else {
//       //Line 85 - my code
//       // await videoToEdit.save();
//       //Solution code:
//       await Video.findOneAndUpdate({ _id: req.params.id }, req.body, (error) => {
//       if (error) return res.send(error);
//       res.status(302).redirect(`/videos/${req.params.id}`);
//       });
//       // const newVideo = await Video.findById(videoToEdit._id)
//       // res.status(302).redirect(`/videos/${videoToEdit._id}`);
//
//       // res.status(302).render('videos/show', {newVideo});
//     }
// });
router.post('/videos/:id/edit', async (req, res, next) => {
    const videoId = req.params.id;
    const video = await Video.findById({ _id: videoId });
    const { title, description, videoUrl } = req.body;

    const updatedVideo = new Video({
        title,
        description,
        videoUrl
    });

    updatedVideo.validateSync();

    if (updatedVideo.errors) {
        if (updatedVideo.errors.title) {
            video.title = ""
        }
        if (updatedVideo.errors.videoUrl) {
            video.videoUrl = ""
        }
        res.status(400).render("videos/edit", { updatedVideo, video });
    } else {
        await Video.findOneAndUpdate({ _id: videoId }, req.body, (error) => {
            if (error) return res.send(error);
            res.redirect(`/videos/${videoId}`);
            // res.redirect(`/${videoId}`);
        });
    }
});

router.post('/videos/:id/deletions', async (req, res, next) => {
  // console.log(':id = ' + req.params.id);
   await Video.deleteOne({ _id: req.params.id});
   res.redirect('/');
});

module.exports = router;
