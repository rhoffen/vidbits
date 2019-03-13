const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const app = require('../../app');
const Video = require('../../models/video');
const {parseTextFromHTML, seedItemToDatabase, connectDatabase, disconnectDatabase} = require('../test-utils');

// const findVideoElementBySource = (htmlAsString, src) => {
//   const video = jsdom(htmlAsString).querySelector(`video[src="${src}"]`);
//   if (video !== null) {
//     return video;
//   } else {
//     throw new Error(`Video with src "${src}" not found in HTML string`);
//   }
// };

describe('Server path: /videos', () => {

  describe('GET', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);
    it('renders an item with a title', async () => {
      const video = await seedItemToDatabase({});
      const response = await request(app)
        //.get('/videos');
        .get('/');

      assert.include(parseTextFromHTML(response.text, `#video-${video._id} .video-title`), video.title);
      //const videoElement = findVideoElementBySource(response.text, video.videoUrl);
      //assert.equal(videoElement.src, video.imageUrl);
    });

    it('renders all items from the database', async () => {
      const firstItem = await seedItemToDatabase({title: 'Item1'});
      const secondItem = await seedItemToDatabase({title: 'Item2'});

      const response = await request(app)
        .get('/');
        //.get('/videos');

      assert.include(parseTextFromHTML(response.text, `#video-${firstItem._id} .video-title`), firstItem.title);
      assert.include(parseTextFromHTML(response.text, `#video-${secondItem._id} .video-title`), secondItem.title);
    });
  });
});
