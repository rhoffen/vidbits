const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const newVideo = await new Video({title, description, videoUrl});
  await newVideo.save();
  await res.send(`
  <h1>${newVideo.title}</h1>
  <p>${newVideo.description}</p>
`);
});

module.exports = router;
