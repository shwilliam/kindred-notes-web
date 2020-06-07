const firebase = require('@firebase/app').default
require('@firebase/firestore')

try {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_ID,
  })
} catch (err) {
  if (/already exists/.test(err.message))
    console.log('Firebase already initialized')
  else console.error('Firebase initialization error', err.stack)
}

const firestore = firebase.firestore()

export {firebase, firestore}
