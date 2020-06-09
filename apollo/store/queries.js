import {ApolloError} from 'apollo-client'
import {firestore} from './index'

export const getUserById = async id => {
  try {
    const usersSnapshot = await firestore
      .collection('users')
      .where('id', '==', id)
      .get()

    let user
    usersSnapshot.forEach(doc => (user = doc.data()))

    return user
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching active user')
  }
}

export const getUserByEmail = async email => {
  let user
  try {
    const usersSnapshot = await firestore
      .collection('users')
      .where('email', '==', email)
      .get()

    usersSnapshot.forEach(doc => (user = doc.data()))
  } catch {}
  return user
}

export const getBookmarks = async user => {
  try {
    const bookmarks = []

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

    return bookmarks
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching bookmarks')
  }
}

export const getNotesInbox = async user => {
  try {
    const notesSnapshot = await firestore.collection('notes').get()
    const notes = []
    notesSnapshot.forEach(doc => {
      const note = doc.data()

      if (
        note.author !== user.id &&
        note.tags.some(tag => user.interests.includes(tag))
      )
        notes.push(note)
    })

    return notes
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching notes')
  }
}

export const getNotesOutbox = async user => {
  try {
    const notesSnapshot = await firestore.collection('notes').get()
    const notes = []
    notesSnapshot.forEach(doc => {
      const note = doc.data()

      if (note.author === user.id) {
        notes.push(note)
      }
    })

    return notes
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching notes')
  }
}

export const getNote = async (user, id) => {
  try {
    const noteSnapshot = await firestore
      .collection('notes')
      .where('id', '==', id)
      .get()

    let noteDoc
    noteSnapshot.forEach(doc => {
      noteDoc = doc
    })

    const note = noteDoc.data()

    const replies = []

    if (note.replies && note.author === user.id) {
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
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching note')
  }
}
