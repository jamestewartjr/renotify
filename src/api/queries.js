import gql from 'graphql-tag'

export const FETCH_NOTICES = gql`
{
  fetchAllNotices{
    noticeId
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
    noticeId
    name
    platformId
    user
    createdAt
  }
}`