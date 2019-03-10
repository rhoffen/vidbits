const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const {jsdom} = require('jsdom');

const {connectDatabase, disconnectDatabase, parseTextFromHTML} = require('../test-utils');


describe('POST /videos',() => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('submits a video with title and description to the database', async () => {

    const seedItem = {
      title: 'Excited train guy, New York!',
      description: 'This guy is so into his trains',
      videoUrl: 'https://www.youtube.com/embed/6lutNECOZFw'
    };

    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(seedItem);

    const createdItem = await Video.findOne(seedItem);
    assert.isOk(createdItem, 'item is not in database');
  });

    it('does not save video when title is missing', async () => {
      const seedItem = {title: ''};

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(seedItem);

      const allVideos = await Video.find();
      assert.equal(allVideos.length, 0);
    });
});
