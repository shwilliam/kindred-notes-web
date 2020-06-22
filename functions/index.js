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
