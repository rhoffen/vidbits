const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const app = require('../../app');
const Video = require('../../models/video');
const {parseTextFromHTML, seedItemToDatabase, connectDatabase, disconnectDatabase, findVideoElementBySource} = require('../test-utils');

describe('GET /videos', () => {


    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('renders existing Videos', async () => {
      const firstItem = await seedItemToDatabase({title: 'Item1', videoUrl: 'http://youtube/3.14'});
      const secondItem = await seedItemToDatabase({title: 'Item2', videoUrl: 'http://vimeo/2.71'});

      const response = await request(app)
        .get('/');
        //.get('/videos');

      assert.include(parseTextFromHTML(response.text, `#video-${firstItem._id} .video-title`), firstItem.title);
      assert.ok(findVideoElementBySource(response.text, firstItem.videoUrl));
      assert.include(parseTextFromHTML(response.text, `#video-${secondItem._id} .video-title`), secondItem.title);
      assert.ok(findVideoElementBySource(response.text, secondItem.videoUrl));

    });

});

describe('GET /videos/:id', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('renders the Video', async () => {
    const videoItem = await seedItemToDatabase({title: 'Item1', description: 'test item description', videoUrl: 'https://test.item.com'});

    const response = await request(app)
      .get(`/videos/${videoItem._id}`);

    assert.include(parseTextFromHTML(response.text, `.video-title`), videoItem.title);
    assert.include(parseTextFromHTML(response.text, `.video-description`), videoItem.description);
    assert.ok(findVideoElementBySource(response.text, videoItem.videoUrl));
    //assert.deepInclude(response.text, {videoItem});
  });
});
