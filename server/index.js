const { ApolloServer} = require('apollo-server');
const graphql = require('graphql-tag');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://renotify-cfa59.firebaseio.com"
});
            
const db = admin.database();

const typeDefs  = graphql`
  type Query{
    task: String
  }
`

const resolvers = {
  Query: {
    task: () => "Hello World"
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port:3100})
  .then(response => {
    console.info(`Server running at ${response.url}`)
  })

let ref = db.ref("/notice");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});