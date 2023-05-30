require('dotenv').config();
var PORT = process.env.PORT;
var MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.NODE_ENV === 'development'
        ? process.env.DEV_MONGODB_URI
        : process.env.MONGODB_URI;
module.exports = {
    PORT: PORT,
    MONGODB_URI: MONGODB_URI,
};
