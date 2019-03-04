const router = require('express').Router();
const Video = require('../models/video');

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const newVideo = await new Video({title, description, videoUrl});
  await newVideo.save();
  const html = `
  <h1>${newVideo.title}</h1>
  <p>${newVideo.description}</p>
`;
  // await res.render('/', (err,html) => {
    res.status(201).send(html);
  // });
});
module.exports = router;
