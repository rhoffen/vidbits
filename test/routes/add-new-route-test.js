const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const {jsdom} = require('jsdom');

const {connectDatabase, disconnectDatabase, parseTextFromHTML} = require('../test-utils');


describe('POST /videos',() => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('responds with a 302 status code', async () => {
    const seedItem = {
      title: 'Excited train guy, New York!',
      description: 'This guy is so into his trains',
      videoUrl: 'https://www.youtube.com/embed/6lutNECOZFw'
    };

    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(seedItem);

    assert.equal(response.status, 302);
  });

  it('redirects to the video show page', async () => {
    const seedItem = {
      title: 'Excited train guy, New York!',
      description: 'This guy is so into his trains',
      videoUrl: 'https://www.youtube.com/embed/6lutNECOZFw'
    };

    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(seedItem);

    const textOnShowPage = 'Video Show Page'
    assert.equal(parseTextFromHTML(response.text,'h1'), textOnShowPage);
  });

  it('saves a Video document', async () => {

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
    assert.equal(createdItem.videoUrl, seedItem.videoUrl);
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

        assert.equal(response.status, 400);
      });

      it('renders the video form', async () => {
        const seedItem = {title: '', description:'test description'};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        const createPageText = parseTextFromHTML(response.text,'button[type="submit"]');
        assert.equal(createPageText, 'Save a video');
      });

      it('renders the validation error message', async () => {
        const seedItem = {title: '', description:'test description'};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        const errorMessage = parseTextFromHTML(response.text,'span[class="error"]');
        assert.equal(errorMessage, 'Title is required.');
      });

      it('preserves the other field values', async () => {
        const seedItem = {title: '', description:'test description', videoUrl: 'https://some.url.com'};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        const descriptionTest = parseTextFromHTML(response.text, '#description-input');
        const videoUrlTest = jsdom(response.text).querySelector(`#videoUrl-input[value="${seedItem.videoUrl}"]`);

        assert.equal(descriptionTest, seedItem.description);
        assert.ok(videoUrlTest);
      });
    });

    describe('when the URL is missing', () => {
      it('renders the validation error message', async () => {
        const missingUrlItem = {title: 'Best video'}

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(missingUrlItem);

        const errorMessage = parseTextFromHTML(response.text,'span[class="url-error"]');
        assert.equal(errorMessage, 'Video URL is required');
      });

      it('preserves the other field values', async () => {
        const seedItem = {title: 'test title', description:'test description', videoUrl: ''};

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(seedItem);

        const descriptionTest = parseTextFromHTML(response.text, '#description-input');
        const titleTest = jsdom(response.text).querySelector(`#title-input[value="${seedItem.title}"]`);

        assert.equal(descriptionTest, seedItem.description);
        assert.ok(titleTest);
      });
    });

});
