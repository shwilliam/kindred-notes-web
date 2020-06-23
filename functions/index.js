const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.calculateAggregateNoteData = functions.firestore
  .document('notes/{noteId}')
  .onCreate(async (snap, context) => {
    let notesSnapshot
    try {
      notesSnapshot = await admin.firestore().collection('notes').get()
    } catch (error) {
      console.error(
        'Unable to fetch notes while calculating aggregate note data.',
      )
      return null
    }

    const notes = []
    notesSnapshot.forEach(doc => {
      const note = doc.data()
      notes.push(note)
    })

    const totalNotes = notes.length
    const totalOpenedNotes = notes.reduce(
      (total, note) =>
        note.viewedBy && note.viewedBy.length
          ? total + note.viewedBy.length
          : total,
      0,
    )

    try {
      await admin
        .firestore()
        .collection('admin')
        .doc('notes')
        .set({totalNotes, totalOpenedNotes})
    } catch (error) {
      console.error('Error calculating aggregate note data')
      return null
    }
    console.log('Aggregate note data updated.')
    return null
  })

// TODO: trigger on user create
exports.calculateAggregateUserData = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (snap, context) => {
    let usersSnapshot
    try {
      usersSnapshot = await admin.firestore().collection('users').get()
    } catch (error) {
      console.error(
        'Unable to fetch users while calculating aggregate user data.',
      )
      return null
    }

    const users = []
    usersSnapshot.forEach(doc => {
      const user = doc.data()
      users.push(user)
    })

    const totalUsers = users.length
    // TODO: clean up (use `Set`?)
    const uniqueCountries = users.reduce((uniqueCountries, user) => {
      if (!uniqueCountries.includes(user.country))
        return [...uniqueCountries, user.country]
      return uniqueCountries
    }, [])
    const totalCountries = uniqueCountries.length
    const interestsCount = users.reduce(
      (interestsCount, user) =>
        user.interests
          ? user.interests.reduce(
              (updatedInterestsCount, interest) =>
                updatedInterestsCount[interest]
                  ? {
                      ...updatedInterestsCount,
                      [interest]: updatedInterestsCount[interest] + 1,
                    }
                  : {...updatedInterestsCount, [interest]: 1},
              {...interestsCount},
            )
          : interestsCount,
      {},
    )
    const interestsByPopularity = Object.entries(interestsCount)
      .sort((interestA, interestB) => interestB[1] - interestA[1])
      .map(([interest]) => interest)
    const mostPopularInterests = interestsByPopularity.slice(0, 20)

    try {
      await admin.firestore().collection('admin').doc('users').set({
        totalUsers,
        totalCountries,
        popularInterests: mostPopularInterests,
      })
    } catch (error) {
      console.error('Error calculating aggregate user data')
      return null
    }

    console.log('Aggregate user data updated.')
    return null
  })
