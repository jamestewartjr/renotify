import gql from 'graphql-tag'

export const CREATE_NOTICE = gql`
mutation createNotice($body:String!){
  createNotice(body:$body){
    id noticeId name createdAt user platformId
  }
}
`

export const DELETE_NOTICE = gql`
mutation deleteNotice($noticeId: String!) {
  deleteNotice(noticeId: $noticeId)
}
`