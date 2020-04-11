import gql from 'graphql-tag'

export const DELETE_NOTICE = gql`
mutation deleteNotice($noticeId: String!) {
  deleteNotice(noticeId: $noticeId)
}
`