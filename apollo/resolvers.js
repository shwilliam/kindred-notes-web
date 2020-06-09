const firebase = require('@firebase/app').default
import {AuthenticationError, UserInputError} from 'apollo-server-micro'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import {
  addNote,
  addUser,
  createNote,
  createReply,
  createUser,
  firestore,
  getUserByEmail,
  getUserById,
} from './store'

// TODO: handle errors

const {JWT_SECRET} = getConfig().serverRuntimeConfig

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.hashedPassword)

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
    async bookmarks(_parent, _args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        const bookmarks = []
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          const user = await getUserById(id)

          await Promise.all(
            user.bookmarks.map(async noteId => {
              const noteSnapshot = await firestore
                .collection('notes')
                .where('id', '==', noteId)
                .get()

              let noteDoc
              noteSnapshot.forEach(doc => {
                noteDoc = doc
              })

              const note = noteDoc.data()
              bookmarks.push(note)
            }),
          )
        } catch {}
        return bookmarks
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

          const notesSnapshot = await firestore.collection('notes').get()
          notesSnapshot.forEach(doc => {
            const note = doc.data()

            if (note.author === id) {
              notes.push(note)
            }
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

          let noteDoc
          noteSnapshot.forEach(doc => {
            noteDoc = doc
          })

          const note = noteDoc.data()

          const replies = []

          if (note.replies) {
            await Promise.all(
              note.replies.map(async replyId => {
                const repliesSnapshot = await noteDoc.ref
                  .collection('replies')
                  .doc(replyId)
                  .get()

                const reply = repliesSnapshot.data()

                replies.push(reply)
              }),
            )
          }

          return {...note, replies}
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
    async createReply(_parent, args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)

          const noteSnapshot = await firestore
            .collection('notes')
            .where('id', '==', args.input.noteId)
            .get()

          const reply = createReply({...args.input, author: id})

          const batch = firestore.batch()

          let noteRef
          noteSnapshot.forEach(async doc => {
            noteRef = doc.ref
          })

          // add reply to subcollection
          batch.set(noteRef.collection('replies').doc(reply.id), reply)

          // add reply doc id to note replies field
          batch.update(noteRef, {
            replies: firebase.firestore.FieldValue.arrayUnion(reply.id),
          })

          await batch.commit()

          return {reply}
        } catch {}
      }
    },
    async bookmarkNote(_parent, args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          let userDoc
          const usersSnapshot = await firestore
            .collection('users')
            .where('id', '==', id)
            .get()
          usersSnapshot.forEach(doc => (userDoc = doc))
          userDoc.ref.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(
              args.input.noteId,
            ),
          })
        } catch {}

        return {isBookmarked: true}
      }
    },
    async unbookmarkNote(_parent, args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          let userDoc
          const usersSnapshot = await firestore
            .collection('users')
            .where('id', '==', id)
            .get()
          usersSnapshot.forEach(doc => (userDoc = doc))
          userDoc.ref.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(
              args.input.noteId,
            ),
          })
        } catch {}

        return {isBookmarked: false}
      }
    },
    async updateInterests(_parent, args, context, _info) {
      const {token} = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const {id} = jwt.verify(token, JWT_SECRET)
          let userDoc
          const usersSnapshot = await firestore
            .collection('users')
            .where('id', '==', id)
            .get()
          usersSnapshot.forEach(doc => (userDoc = doc))
          userDoc.ref.update({
            interests: args.input.interests,
          })
        } catch (e) {console.log(e)}

        return {interests: args.input.interests}
      }
    },
  },
}
