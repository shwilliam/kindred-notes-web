import {UserInputError} from 'apollo-server-micro'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import {
  addBookmark,
  addNote,
  addReply,
  addUser,
  createNote,
  createUser,
  getBookmarks,
  getNote,
  getNotesInbox,
  getNotesOutbox,
  getUserByEmail,
  getUserById,
  removeBookmark,
  updateInterests,
  viewNote,
} from './index'

const {JWT_SECRET} = getConfig().serverRuntimeConfig

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.hashedPassword)

const validateUser = async headers => {
  const {token} = cookie.parse(headers.cookie ?? '')

  if (!token) throw new AuthenticationError('Authentication failed')

  try {
    const {id} = jwt.verify(token, JWT_SECRET)
    return id
  } catch (error) {
    console.error(error)
    throw new AuthenticationError('Authentication failed')
  }
}

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const user = await getUserById(id)

        return user
      } catch {
        return null
      }
    },
    async userExists(_parent, args, _context, _info) {
      try {
        const user = await getUserByEmail(args.email)
        return {exists: !!user}
      } catch {
        // if unexpected error assume email is available
        // email is validated again on sign up
        return {exists: false}
      }
    },
    async bookmarks(_parent, _args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const user = await getUserById(id)
        const bookmarks = await getBookmarks(user)

        return bookmarks
      } catch {
        return []
      }
    },
    async notes(_parent, _args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const user = await getUserById(id)
        const notes = await getNotesInbox({...user, id})

        return notes
      } catch {
        return []
      }
    },
    async sentNotes(_parent, _args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const user = await getUserById(id)
        const notes = await getNotesOutbox({...user, id})

        return notes
      } catch {
        return []
      }
    },
    async note(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const user = await getUserById(id)
        const note = await getNote({...user, id}, args.id)

        return note
      } catch {
        return null
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = createUser(args.input)
      const existingUser = await getUserByEmail(args.input.email)

      if (existingUser)
        throw new UserInputError('Signup failed', {
          validationErrors: {
            email: 'A user with that email already exists',
          },
        })

      await addUser(user)
      return {user}
    },
    async signIn(_parent, args, context, _info) {
      const user = await getUserByEmail(args.input.email)
      const existingUser = await getUserByEmail(args.input.email)

      if (user && isValidPassword(user, args.input.password)) {
        const token = jwt.sign(
          {email: user.email, id: user.id, time: new Date()},
          JWT_SECRET,
          {
            expiresIn: '6h',
          },
        )

        context.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )

        return {user}
      }

      throw new UserInputError('Invalid email and password combination')
    },
    async signOut(_parent, _args, context, _info) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        }),
      )

      return true
    },
    async createNote(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const note = createNote({...args.input, author: id})
        addNote(note)

        return {note}
      } catch {
        return null
      }
    },
    async createReply(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const reply = await addReply(id, args.input)
        return reply
      } catch {
        return null
      }
    },
    async bookmarkNote(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const isBookmarked = addBookmark(id, args.input)
        return isBookmarked
      } catch {
        return null
      }
    },
    async unbookmarkNote(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const isBookmarked = removeBookmark(id, args.input)
        return isBookmarked
      } catch {
        return null
      }
    },
    async viewNote(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const isViewed = await viewNote(id, args.input)
        return isViewed
      } catch {
        return null
      }
    },
    async updateInterests(_parent, args, context, _info) {
      try {
        const id = await validateUser(context.req.headers)
        const interests = updateInterests(id, args.input)
        return interests
      } catch {
        return null
      }
    },
  },
}
