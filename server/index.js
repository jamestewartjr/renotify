const app = require('express')();
const {
  ApolloServer,
  AuthenticationError,
} = require('apollo-server-express') 

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = 3100;

// const server = new ApolloServer({typeDefs, resolvers});
// server.listen({port:3100})
//   .then(response => {
//     console.info(`Server running at ${response.url}`)
//   })

const context = ({ request }) => {
  console.log(request)
  try {
    const auth = request.headers.authorization || null;
    return auth
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in'
    )
  }
}

// const server = new ApolloServer({ typeDefs, resolvers, context })
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app, path: "/", cors: true  })
app.listen(PORT, () =>
  console.log(
    `🔥🔥🔥 GraphQL + Express listening on PORT ${PORT}!`,
  ),
)
