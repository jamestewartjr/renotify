const app = require('express')();
const { ApolloServer } = require('apollo-server-express') 

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = 3100;
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) })

server.applyMiddleware({ app, path: "/", cors: true  })
app.listen(PORT, () =>
  console.log(
    `GraphQL + Express listening on PORT ${PORT}!`,
  ),
)
