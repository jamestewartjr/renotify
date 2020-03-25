const { ApolloServer} = require('apollo-server');
const graphql = require('graphql-tag');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://renotify-cfa59.firebaseio.com"
});
            
// const db = admin.database(); //RTD connection
const db = admin.firestore(); //Firestore connection

const typeDefs  = graphql`
  type Notices{
    id: ID
    name: String
    user: String
    platformId: String
    createdAt: String
  
  }
  type Query{
    fetchAllNotices: [Notices]
  }
`

const resolvers = {
  // Query: {  //Query for RTD read
  //   async fetchAllNotices() {
  //     let ref = db.ref("notice");
  //     try{
  //       const notices = await ref.once("value")
  //         .then(snapshot => snapshot.val()) 
  //         .then(val => Object.keys(val)
  //           .map(key => val[key]))
  //       return notices;
  //     }
  //     catch(error){
  //       throw new Error(error)
  //     }
  //   }
  // }
  Query: {
    async fetchAllNotices() { //Query for Firestore read
      const notices = await db
        .collection('notices')
        .get();
      return notices.docs.map(notice => notice.data());
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port:3100})
  .then(response => {
    console.info(`Server running at ${response.url}`)
  })
