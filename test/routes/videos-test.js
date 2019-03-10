const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const app = require('../../app');
const Video = require('../../models/video');
const {parseTextFromHTML, seedItemToDatabase, connectDatabaseAndDropData, disconnectDatabase} = require('../test-utils');

// const findVideoElementBySource = (htmlAsString, src) => {
//   const video = jsdom(htmlAsString).querySelector(`video[src="${src}"]`);
//   if (video !== null) {
//     return video;
//   } else {
//     throw new Error(`Video with src "${src}" not found in HTML string`);
//   }
// };

describe('Server path: /videos', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders an item with a title', async () => {
      const video = await seedItemToDatabase();
      console.log('got seeded? ' + video.title);
      //const isSeeded = await Video.findOne(video);
      //console.log('got seeded? ' + isSeeded.title);
      const response = await request(app)
      .get('/');

      assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
      //const videoElement = findVideoElementBySource(response.text, video.videoUrl);
      //assert.equal(videoElement.src, video.imageUrl);
    });

    it('renders all items from the database', async () => {
      const firstItem = await seedItemToDatabase({title: 'Item1'});
      const secondItem = await seedItemToDatabase({title: 'Item2'});

      const response = await request(app)
        .get(`/`);

      assert.include(parseTextFromHTML(response.text, '.video-title'), firstItem.title);
      assert.include(parseTextFromHTML(response.text, '.video-title'), secondItem.title);
    });
  });
});
