const {db} = require('../../util/admin') 
const {firebaseAuth} = require('../../util/firebaseAuth')
const {AuthenticationError} = require('apollo-server-express')

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

const createNotice = async (_, {body}, context) => {
  try{
    let user = await firebaseAuth(context)
    const newNotice = {
      name: body,
      user: user.username,
      platformId: 'unknown',
      createdAt: new Date().toISOString(),
    };
    let doc = await db.collection('notices').add(newNotice)
    const notice = newNotice
    notice.id = doc.id
    return notice
  }
  catch(error)  {
    console.error('Create notice error: ',error)
    throw new Error ('Something went wrong. Please create a new notice')
  }
}

const deleteNotice = async (_, {noticeId}, context) => {
  const document =  db.doc(`/notices/${noticeId}`);
  const user = await firebaseAuth(context);
  try{
    let doc = await document.get()
    if (!doc.exists) {
      throw new Error ('Notice not found');
    }
    if (doc.data().user !== user.username) {
      throw new AuthenticationError('Unauthorized');
    } else {
      await document.delete();
      return 'Notice deleted successfully';
    }
  }
  catch(error) {
    console.error(error);
    throw new Error(error.code);
  };
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