const {assert} = require('chai');
const {connectDatabase, disconnectDatabase, seedItemToDatabase} = require('../test-utils')}

describe('User deleting video',() => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  it('removes the Video from the list', () => {
    const videoToDelete =  seedItemToDatabase();
    browser.url(`/videos/${videoToDelete._id}`);
    browser.click('#delete');
    assert.notInclude(browser.getText('body'), videoToDelete.title);
  });
});
