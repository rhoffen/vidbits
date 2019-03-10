const {assert} = require('chai');

describe('user visiting new video page', () => {
  it('can save a video', () => {
    const seedItem = {
      title: 'Excited train guy, New York!',
      videoUrl: 'https://www.youtube.com/embed/6lutNECOZFw',
      description: 'This guy is so into his trains'
    };

    browser.url('/videos/create');
    assert.include(browser.getText('body'),'Save a video');
    browser.setValue('input#title-input', seedItem.title);
    browser.setValue('input#videoUrl-input', seedItem.videoUrl);
    browser.setValue('input#description-input', seedItem.decription);
    browser.click('button[type="submit"]');
    browser.url('/videos');
    assert.include(browser.getText('body'),seedItem.title);
    assert.include(browser.getText('body'),seedItem.description);
  });
});
