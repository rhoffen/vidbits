const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.MONGODB_URI || `mongodb://localhost/gather_${env}`;
const options= {
  useMongoClient: true,
};

module.exports = {
  mongoose,
  databaseUrl,
  options,
};
