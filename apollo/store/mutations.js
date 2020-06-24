const firebase = require('@firebase/app').default
import {ApolloError} from 'apollo-server-micro'
import {createReply, firestore} from '../index'

export const addUser = async user => {
  try {
    const newUser = await firestore.collection('users').doc(user.id).set(user)
    return newUser
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error adding new user')
  }
}

export const addNote = async note => {
  try {
    const newNote = await firestore.collection('notes').doc(note.id).set(note)
    return newNote
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error sending note')
  }
}

export const addReply = async (id, input) => {
  try {
    const noteDoc = await firestore.collection('notes').doc(input.noteId).get()

    const reply = createReply({...input, author: id})

    const batch = firestore.batch()

    // add reply to subcollection
    batch.set(noteDoc.collection('replies').doc(reply.id), reply)

    // add reply doc id to note replies field
    batch.update(noteDoc, {
      replies: firebase.firestore.FieldValue.arrayUnion(reply.id),
    })

    await batch.commit()

    return {reply}
  } catch {
    throw new ApolloError('Error sending reply')
  }
}

export const addBookmark = async (id, input) => {
  try {
    const userDoc = await firestore.collection('users').doc(id).get()
    userDoc.ref.update({
      bookmarks: firebase.firestore.FieldValue.arrayUnion(input.noteId),
    })

    return {isBookmarked: true}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error bookmarking note')
  }
}

export const removeBookmark = async (id, input) => {
  try {
    const userDoc = await firestore.collection('users').doc(id).get()
    userDoc.ref.update({
      bookmarks: firebase.firestore.FieldValue.arrayRemove(input.noteId),
    })
    return {isBookmarked: false}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error removing bookmark')
  }
}

export const viewNote = async (id, input) => {
  try {
    const noteDoc = await firestore.collection('notes').doc(input.noteId).get()

    if (noteDoc.data().author === id) return {isViewed: false}

    noteDoc.ref.update({
      viewedBy: firebase.firestore.FieldValue.arrayUnion(id),
    })

    return {isViewed: true}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error marking note as viewed')
  }
}

export const updateInterests = async (id, input) => {
  try {
    const userDoc = await firestore.collection('users').doc(id).get()
    userDoc.ref.update({
      interests: input.interests,
    })
    return {interests: input.interests}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error updating interests')
  }
}
