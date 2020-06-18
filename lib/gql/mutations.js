import gql from 'graphql-tag'

export const ViewNoteMutation = gql`
  mutation ViewNoteMutation($noteId: String!) {
    viewNote(input: {noteId: $noteId}) {
      isViewed
    }
  }
`
