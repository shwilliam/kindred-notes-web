import {firestore} from './index'

export const addUser = async user => {
  try {
    const newUser = await firestore.collection('users').add(user)
    return newUser
  } catch {
    return null
  }
}

export const addNote = async note => {
  try {
    const newNote = await firestore.collection('notes').add(note)
    return newNote
  } catch {
    return null
  }
}
