const {assert} = require('chai');
//const Video = require('../../models/video');
// const {const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabase, disconnectDatabase, seedItemToDatabase, findVideoElementBySource} = require('../test-utils');}

describe('User visits landing page', () => {
  describe('with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'),'');
    });
  });

  it('can navigate to add a video', () => {
    browser.url('/');
    browser.click('a[href="./videos/create"]');
    assert.include(browser.getText('body'),'Save a video');
  });

  describe('with an existing video',() => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('renders it in the list', () => {
      const seed = seedItemToDatabase();
      browser.url('/');
      assert.include(browser.getText('body'), seed.title);
      assert.include(browser.getText('body'), seed.description);
      assert.equal($('iframe').getValue(), seed.videoUrl);
    });

    it('can navigate to a video', async () => {

    });


  });

});
