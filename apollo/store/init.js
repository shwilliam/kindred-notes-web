const firebase = require('@firebase/app').default
require('@firebase/firestore')
import getConfig from 'next/config'

const {
  FIREBASE_KEY,
  FIREBASE_DOMAIN,
  FIREBASE_ID,
} = getConfig().serverRuntimeConfig

try {
  firebase.initializeApp({
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_DOMAIN,
    projectId: FIREBASE_ID,
  })
} catch (err) {
  if (/already exists/.test(err.message))
    console.log('Firebase already initialized')
  else console.error('Firebase initialization error', err.stack)
}

const firestore = firebase.firestore()

export {firebase, firestore}
