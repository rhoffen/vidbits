const {assert} = require('chai');

describe('User visits landing page', () => {
  describe('with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'),'');
    });
  });

  it('can navigate to add a video', () => {
    browser.url('/');
    browser.click('a[href="./videos/create.html"]');
    assert.include(browser.getText('body'),'Save a video');
  });
});
