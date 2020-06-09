import {ApolloError} from 'apollo-server-micro'
import {firestore} from './index'

export const addUser = async user => {
  try {
    const newUser = await firestore.collection('users').add(user)
    return newUser
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error adding new user')
  }
}

export const addNote = async note => {
  try {
    const newNote = await firestore.collection('notes').add(note)
    return newNote
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error sending note')
  }
}

export const addReply = async (id, input) => {
  try {
    const noteSnapshot = await firestore
      .collection('notes')
      .where('id', '==', input.noteId)
      .get()

    const reply = createReply({...input, author: id})

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
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error sending reply')
  }
}

export const addBookmark = async (id, input) => {
  try {
    const usersSnapshot = await firestore
      .collection('users')
      .where('id', '==', id)
      .get()
    let userDoc
    usersSnapshot.forEach(doc => (userDoc = doc))
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
    let userDoc
    const usersSnapshot = await firestore
      .collection('users')
      .where('id', '==', id)
      .get()
    usersSnapshot.forEach(doc => (userDoc = doc))
    userDoc.ref.update({
      bookmarks: firebase.firestore.FieldValue.arrayRemove(input.noteId),
    })
    return {isBookmarked: false}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error removing bookmark')
  }
}

export const updateInterests = async (id, input) => {
  try {
    const usersSnapshot = await firestore
      .collection('users')
      .where('id', '==', id)
      .get()
    let userDoc
    usersSnapshot.forEach(doc => (userDoc = doc))
    userDoc.ref.update({
      interests: input.interests,
    })
    return {interests: input.interests}
  } catch (error) {
    console.error(error)
    throw new ApolloError('Error updating interests')
  }
}
