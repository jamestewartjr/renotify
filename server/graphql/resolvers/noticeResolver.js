const {db} = require('../../config/admin') 

module.exports = {

  Query: {
    async fetchAllNotices() {
      const notices = await db
        .collection('notices')
        .get();
      return notices.docs.map(notice => notice.data());
    }
  }
}