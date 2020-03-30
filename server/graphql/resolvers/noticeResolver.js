const {db} = require('../../util/admin') 

const fetchAllNotices = async () => {
  const notices = await db
    .collection('notices')
    .get();
  return notices.docs.map(notice => notice.data());
    
}

module.exports = {
  Query: {
    fetchAllNotices, 
  }
}