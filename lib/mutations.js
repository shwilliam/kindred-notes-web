import gql from 'graphql-tag'

export const CreateReplyMutation = gql`
  mutation CreateReplyMutation(
    $content: String!
    $noteId: String!
    $avatar: Int!
  ) {
    createReply(input: {content: $content, noteId: $noteId, avatar: $avatar}) {
      reply {
        content
      }
    }
  }
`
