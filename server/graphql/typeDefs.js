const {gql} = require('apollo-server');

module.exports = gql`
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