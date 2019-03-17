const {assert} = require('chai');
//const Video = require('../../models/video');
// const {const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabase, disconnectDatabase, seedItemToDatabase, findVideoElementBySource} = require('../test-utils')}

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

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

    it('renders it in the list', async () => {
      const seed = await seedItemToDatabase();
      browser.url('/');
      assert.include(browser.getText('body'), seed.title);
      assert.include(browser.getText('body'), seed.description);
      assert.equal($('iframe').getValue(), seed.videoUrl);
    });

    it('can navigate to a video', async () => {
      const seedUrl = generateRandomUrl(youtube);
      const seedVideo = await seedItemToDatabase(options.videoUrl = seedUrl);
      browser.url('/');
      //assert that videoUrl property on the landing page is dynamic
      assert.equal($('iframe').getValue(), seedUrl);
      browser.click(`button[id="go-to-video-${seedVideo._id}"]`);
      //assert that clicking the button for a specific video goes to the Video Show Page
      assert.include(browser.getText('body'),'Video Show Page');
      //assert that the seeded video title is displayed on the Video Show Page
      assert.include(browser.getText('body'), seedVideo.title);
    });


  });

});
