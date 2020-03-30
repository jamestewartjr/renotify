const {gql} = require('apollo-server-express');

module.exports = gql`
  type Notices{
    id: ID
    name: String
    user: String
    platformId: String
    createdAt: String

  }
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query{
    fetchAllNotices: [Notices]
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`