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
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Mutation {
    register(registerInput: RegisterInput): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`