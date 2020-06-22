import gql from 'graphql-tag'

// TODO: DRY up notes queries
export const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    email: String!
    interests: [String]!
    bookmarks: [String]
    avatar: Int!
    country: String!
    city: String!
    coords: [String]!
    createdAt: DateTime!
  }

  type Reply {
    id: ID!
    content: String!
    author: String!
    avatar: Int!
    coords: [String]!
    createdAt: DateTime!
  }

  type Note {
    id: ID!
    author: String!
    content: String!
    color: String!
    style: String!
    font: String!
    viewedBy: [String]
    createdAt: DateTime!
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
    interests: [String]!
    password: String!
    avatar: Int!
    country: String!
    city: String!
    coords: [String]!
  }

  type SignUpPayload {
    user: User
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignInPayload {
    user: User!
  }

  input CreateNoteInput {
    content: String!
    tags: [String]!
    color: String!
    style: String!
    font: String!
  }

  type CreateNotePayload {
    note: Note!
  }

  input CreateReplyInput {
    content: String!
    noteId: String!
    avatar: Int!
    coords: [String]!
  }

  type CreateReplyPayload {
    reply: Reply!
  }

  input BookmarkNoteInput {
    noteId: String!
  }

  type BookmarkNotePayload {
    isBookmarked: Boolean!
  }

  input ViewNoteInput {
    noteId: String!
  }

  type ViewNotePayload {
    isViewed: Boolean!
  }

  input UpdateInterestsInput {
    interests: [String]!
  }

  type UpdateInterestsPayload {
    interests: [String]!
  }

  type UserExistsPayload {
    exists: Boolean!
  }

  type Query {
    viewer: User
    userExists(email: String!): UserExistsPayload!
    bookmarks: [Note]
    recentNotes: [Note]
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
    viewNote(input: ViewNoteInput!): ViewNotePayload!
    updateInterests(input: UpdateInterestsInput!): UpdateInterestsPayload!
  }
`
