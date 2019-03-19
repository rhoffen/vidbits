const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const app = require('../../app');
const Video = require('../../models/video');
const {parseTextFromHTML, buildItemObject, seedItemToDatabase, connectDatabase, disconnectDatabase, findVideoElementBySource} = require('../test-utils');

describe('User updating video',() => {
  const createdVideo = buildItemObject();
  it('changes the values', async () => {
    // const createdVideo = buildItemObject();
    const editedTitle = "Edited title";
    browser.url('/create');
    $("#title-input").setValue(createdVideo.title);
    $("#description-input").setValue(createdVideo.description);
    $("#videoUrl-input").setValue(createdVideo.title);
    await browser.click('button[type="submit"]');
    await browser.click('#edit');
    $("#title-input").setValue(editedTitle);
    assert.equal($('.video-title').getValue(), editedTitle);

  });
  it('does not create an additional video', async () => {
    browser.url('/')
    assert.notInclude(browser.getText('body'),createdVideo.title);
  });
});
