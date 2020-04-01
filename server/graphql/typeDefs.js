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
    id: ID
    email: String
    token: String
    username: String
    createdAt: String
  }
  input RegisterInput{
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query{
    fetchAllNotices: [Notices]
  }z
  type AuthPayload {
    token: String
    user: User
  }
  type Mutation {
    register( username: String!, email: String!, password: String!,confirmPassword: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`