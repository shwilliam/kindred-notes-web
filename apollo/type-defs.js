import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    interests: [String]!
    bookmarks: [String]
  }

  type Reply {
    id: ID!
    content: String!
    author: String!
  }

  type Note {
    id: ID!
    author: String!
    content: String!
    color: String!
    style: String!
    font: String!
  }

  type NoteWithReplies {
    id: ID!
    author: String!
    content: String!
    color: String!
    style: String!
    font: String!
    replies: [Reply]
  }

  input SignUpInput {
    email: String!
    interests: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input CreateNoteInput {
    content: String!
    tags: [String]!
    color: String!
    style: String!
    font: String!
  }

  input CreateReplyInput {
    content: String!
    noteId: String!
  }

  input BookmarkNoteInput {
    noteId: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type CreateNotePayload {
    note: Note!
  }

  type CreateReplyPayload {
    reply: Reply!
  }

  type BookmarkNotePayload {
    isBookmarked: Boolean!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    bookmarks: [Note]
    notes: [Note]
    sentNotes: [Note]
    note(id: String!): NoteWithReplies!
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    createNote(input: CreateNoteInput!): CreateNotePayload!
    createReply(input: CreateReplyInput!): CreateReplyPayload!
    bookmarkNote(input: BookmarkNoteInput!): BookmarkNotePayload!
    unbookmarkNote(input: BookmarkNoteInput!): BookmarkNotePayload!
  }
`
