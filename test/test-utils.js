const {jsdom} = require('jsdom');
const {mongoose, databaseUrl, options} = require('../database');


// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const connectDatabase = async () => {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
};

const disconnectDatabase = async () => {
   await mongoose.disconnect();
};

module.exports = {
  // buildItemObject,
  // seedItemToDatabase,
  parseTextFromHTML,
  connectDatabase,
  disconnectDatabase,
};
