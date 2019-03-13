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
    describe('when the title is missing', () => {
      it('does not save video', async () => {
        const seedItem = {title: '', description:'test description'};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        const allVideos = await Video.find();
        assert.equal(allVideos.length, 0);
      });

      it('responds with a 400', async () => {
        const seedItem = {title: '', description:'test description'};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        //const allVideos = await Video.find();
        assert.equal(response.status, 400);
      });

      it('renders the video form', async () => {
        const seedItem = {title: '', description:'test description'};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        const errorMessage = parseTextFromHTML(response.text,'span[class="error"]');
        assert.equal(errorMessage, 'could not find title input');
      });
    });

});
