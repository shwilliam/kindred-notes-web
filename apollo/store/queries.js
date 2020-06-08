import {firestore} from './index'

export const getUserById = async id => {
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
