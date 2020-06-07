import {firestore} from './index'

export async function getUserById(id) {
  let user
  try {
    const usersSnapshot = await firestore
      .collection('users')
      .where('id', '==', id)
      .get()

    usersSnapshot.forEach(doc => (user = doc.data()))
  } catch {}
  return user
}

export async function getUserByEmail(email) {
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
