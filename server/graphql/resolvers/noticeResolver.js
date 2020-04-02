const {db} = require('../../util/admin') 
const {firebaseAuth} = require('../../util/firebaseAuth')

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

const createNotice = (_, {body}, context) => {
  return firebaseAuth(context)
    .then( user => {   
      const newNotice = {
        name: body,
        user: user.username,
        platformId: 'unknown',
        createdAt: new Date().toISOString(),
      };
      db.collection('notices')
        .add(newNotice)
        .then(doc => {
          //TODO: need to update CreateNotice to return new notice information
          const notice = newNotice
          notice.noticeId = doc.id
          // console.log(notice)
          return notice
        })
        .catch(error => {
          console.error('Create notice error: ',error)
          throw new Error ('Something went wrong. Please create a new notice')
        })
    })
    .catch( error => {
      throw new Error('Something went wrong. Try again')
    })




}

const deleteNotice = async (_, {noticeId}, context) => {

}

module.exports = {
  Query: {
    fetchAllNotices, 
    fetchNoticeById
  },
  Mutation: {
    createNotice,
    deleteNotice
  }
}