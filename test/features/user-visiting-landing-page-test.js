const {assert} = require('chai');
//const Video = require('../../models/video');
// const {const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabase, disconnectDatabase, seedItemToDatabase} = require('../test-utils');}

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

  it('renders existing videos in the database', () => {
    connectDatabase;
    const seed = seedItemToDatabase();
    browser.url('/');
    assert.include(browser.getText('body'), seed.title);
    assert.include(browser.getText('body'), seed.description);
    disconnectDatabase;
  })
});
