const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User updating video',() => {
  const createdVideo = buildItemObject();

  it('changes the values', async () => {
    //Setup
    const editedTitle = "Edited title";
    browser.url('/videos/create');
    $("#title-input").setValue(createdVideo.title);
    $("#description-input").setValue(createdVideo.description);
    $("#videoUrl-input").setValue(createdVideo.title);
    await browser.click('button[type="submit"]');
    await browser.click('#edit');
    //Exercise
    $("#title-input").setValue(editedTitle);
    await browser.click('button[type="submit"]');
    //Verify
    assert.equal($('.video-title').getValue(), editedTitle);
  });

  it('does not create an additional video', async () => {
    browser.url('/')
    assert.notInclude(browser.getText('body'),createdVideo.title);
  });
});
