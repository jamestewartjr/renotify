const noticeResolvers = require('./noticeResolver');
const userResolvers = require('./userResolver');

module.exports = {
  Query: {
    ...noticeResolvers.Query
  }
}