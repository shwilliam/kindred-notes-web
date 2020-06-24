import {ApolloError} from 'apollo-client'
import {firestore} from '../index'

export const getAggregateStatistics = async () => {
  try {
    const dataSnapshot = await firestore.collection('admin').get()

    let data = {}
    dataSnapshot.forEach(doc => (data = {...data, ...doc.data()}))

    return data
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching aggregate statistics')
  }
}

export const getUserById = async id => {
  try {
    const user = await firestore.collection('users').doc(id).get()
    return user.data()
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching active user')
  }
}

export const getUserByEmail = async email => {
  const usersSnapshot = await firestore
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()

  let user
  usersSnapshot.forEach(doc => (user = doc.data()))

  return user
}

export const getBookmarks = async user => {
  try {
    const bookmarks = []

    if (user?.bookmarks) {
      await Promise.all(
        user.bookmarks.map(async noteId => {
          const noteDoc = await firestore.collection('notes').doc(noteId).get()

          const note = noteDoc.data()
          bookmarks.push(note)
        }),
      )
    }

    return bookmarks
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching bookmarks')
  }
}

export const getRecentNotes = async () => {
  try {
    const notesSnapshot = await firestore
      .collection('notes')
      .orderBy('createdAt', 'desc')
      // TODO: `.limit()`
      .get()
    const notes = []
    notesSnapshot.forEach(doc => {
      const note = doc.data()
      notes.push(note)
    })

    return notes
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching recent notes')
  }
}

export const getNotesInbox = async user => {
  try {
    const notesSnapshot = await firestore
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .get()
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
    const notesSnapshot = await firestore
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .get()
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
    const noteDoc = await firestore.collection('notes').doc(id).get()
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

    const chronologicalReplies = replies.sort(
      (replyA, replyB) => replyB.createdAt - replyA.createdAt,
    )

    return {...note, replies: chronologicalReplies}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error fetching note')
  }
}
