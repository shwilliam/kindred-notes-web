import {firestore} from './index'

export async function addUser(user) {
  try {
    const newUser = await firestore.collection('users').add(user)
    return newUser
  } catch {
    return null
  }
}

export async function addNote(note) {
  try {
    const newNote = await firestore.collection('notes').add(note)
    return newNote
  } catch {
    return null
  }
}
