const Video = require('../../models/video');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabase, disconnectDatabase} = require('../test-utils');

describe('Video model',() => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  it('has a title of type String',() => {

    const createdVideo = new Video({
      title: 5
    });
    assert.strictEqual(createdVideo.title, '5')

  });
});
