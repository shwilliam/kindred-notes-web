import {AuthenticationError, UserInputError} from 'apollo-server-micro'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import {
  addNote,
  addUser,
  createNote,
  createUser,
  firestore,
  getUserByEmail,
  getUserById,
} from './store'

// TODO: handle errors

const {JWT_SECRET} = getConfig().serverRuntimeConfig

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.hashedPassword)
}

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          const user = await getUserById(id)

          return user
        } catch {
          throw new AuthenticationError(
            'Authentication token is invalid, please log in',
          )
        }
      }
    },
    async notes(_parent, _args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      let notes = []
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          const user = await getUserById(id)

          const notesSnapshot = await firestore.collection('notes').get()
          notesSnapshot.forEach(doc => {
            const note = doc.data()

            if (
              note.author !== id &&
              note.tags.some(tag => user.interests.includes(tag))
            )
              notes.push(note)
          })
        } catch {}

        return notes
      }
    },
    async sentNotes(_parent, _args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      let notes = []
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          const user = await getUserById(id)

          const notesSnapshot = await firestore.collection('notes').get()
          notesSnapshot.forEach(doc => {
            const note = doc.data()

            if (note.author === id) notes.push(note)
          })
        } catch {}

        return notes
      }
    },
    async note(_parent, args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')

      if (token) {
        try {
          jwt.verify(token, JWT_SECRET)
          const noteSnapshot = await firestore
            .collection('notes')
            .where('id', '==', args.id)
            .get()

          let note
          noteSnapshot.forEach(doc => {
            note = doc.data()
          })

          return note
        } catch {}
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = createUser(args.input)

      addUser(user)

      return {user}
    },

    async signIn(_parent, args, context, _info) {
      const user = await getUserByEmail(args.input.email)

      if (user && validPassword(user, args.input.password)) {
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
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          const note = createNote({...args.input, author: id})

          addNote(note)

          return {note}
        } catch {}
      }
    },
  },
}
