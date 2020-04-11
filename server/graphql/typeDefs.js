const {gql} = require('apollo-server-express');

module.exports = gql`
  type Notice{
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
    fetchAllNotices: [Notice],
    fetchNoticesByUsername: [Notice],
    fetchNoticeById(noticeId: String!): Notice
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Mutation {
    register(registerInput: RegisterInput): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createNotice(body: String!): Notice
    deleteNotice(noticeId: ID!): String
  }
`