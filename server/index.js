const { ApolloServer} = require('apollo-server');
const graphql = require('graphql-tag');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://renotify-cfa59.firebaseio.com"
});
            
const db = admin.database();

const typeDefs  = graphql`
  type Notices{
    id: ID
    name: String
    sender: String
    sourceName: String
    receivedTime: String
  
  }
  type Query{
    fetchAllNotices: [Notices]
  }
`

const resolvers = {
  Query: {
    async fetchAllNotices() {
      let ref = db.ref("notice");
      try{
        const notices = await ref.once("value")
          .then(snapshot => snapshot.val()) 
          .then(val => Object.keys(val)
            .map(key => val[key]))
        console.log('notices: ', notices)
        return notices;
      }
      catch(error){
        throw new Error(error)
      }
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port:3100})
  .then(response => {
    console.info(`Server running at ${response.url}`)
  })
