const {db} = require('../../util/admin') 

const fetchAllNotices = async () => {
  const notices = await db
    .collection('notices')
    .get();
  return notices.docs.map(notice => notice.data());
}

const fetchNoticeById = async (_, {noticeId}) => {
  try {  
    return db.doc(`/notices/${noticeId}`).get()
      .then( doc => {
        let noticeData = doc.data()
        if(noticeData){
          let notice = {
            id: noticeData.noticeId,
            name: noticeData.name,
            user: noticeData.user,
            platformId: noticeData.platformId,
            createdAt: noticeData.createdAt
          }
          return notice
        } else {
          throw new Error('Notice not found')
        }
      })
  }
  catch (error){
    throw new Error(error)
  }
}

module.exports = {
  Query: {
    fetchAllNotices, 
    fetchNoticeById
  }
}