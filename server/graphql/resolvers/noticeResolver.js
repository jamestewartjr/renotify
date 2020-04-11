const {db} = require('../../util/admin') 
const {firebaseAuth} = require('../../util/firebaseAuth')
const {AuthenticationError} = require('apollo-server-express')

const fetchAllNotices = async (_, {body}, context) => {
  const notices = await db
    .collection('notices')
    .get();
  return notices.docs.map(notice => notice.data());
}

const fetchNoticesByUsername = async (_, args, context) => {
  try {
    let user = await firebaseAuth(context)
    const notices = await db
      .collection('notices')
      .where('user', '==', user.username)
      .get();
    return notices.docs.map(notice => notice.data());
  }
  catch (error){
    throw new Error(error)
  }
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

const createNotice = async (_, args, context) => {
  try{
    let user = await firebaseAuth(context)
    const newNotice = {
      name: args.body,
      user: user.username,
      platformId: args.platformId || 'unknown',
      createdAt: new Date().toISOString(),
    };
    let doc = await db.collection('notices').add(newNotice)
    const notice = newNotice
    notice.id = doc.id
    return notice
  }
  catch(error)  {
    console.error('Create notice error: ',error)
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
    fetchNoticesByUsername,
    fetchNoticeById
  },
  Mutation: {
    createNotice,
    deleteNotice
  }
}