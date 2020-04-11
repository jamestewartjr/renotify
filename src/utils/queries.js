import gql from 'graphql-tag'

export const FETCH_NOTICES = gql`
{
  fetchAllNotices{
    id
    name
    platformId
    user
    createdAt
  }
}
`

export const FETCH_USER_NOTICES = gql`
{
  fetchNoticesByUsername
  {
    id
    name
    platformId
    user
    createdAt
  }
}`