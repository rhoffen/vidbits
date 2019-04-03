const Video = require('../../models/video');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabase, disconnectDatabase} = require('../test-utils');

describe('Video',() => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('#title',() => {
    it('is a String', async () => {
      const createdVideo = await new Video({
        title: 5
      });
      assert.strictEqual(createdVideo.title, '5')
    });

    it('is required', async () => {
      createdVideo = await new Video({
        title: '',
        videoUrl: 'some.url.com'
      });
      await createdVideo.validateSync();
      const errMsg = await createdVideo.errors.title.message;
      assert.equal(errMsg, 'Path `title` is required.');
    });
  });

describe('#url',() => {
  it('is a String', async () => {
    const createdVideo = await new Video({
      videoUrl: 5
    });
    assert.strictEqual(createdVideo.videoUrl, '5');
  });
  it('is required', async () => {
    createdVideo = await new Video({
      title: 'some title',
      videoUrl: ''
    });
    await createdVideo.validateSync();
    const errMsg = await createdVideo.errors.videoUrl.message;
    assert.equal(errMsg, 'Path `videoUrl` is required.');
    });
  });
});
