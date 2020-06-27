import {useMutation} from 'react-query'
import {useState} from 'react'
import {Field} from './index'

const createReplyRequest = async data => {
  const response = await fetch('/api/notes/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.note
}

export const ReplyForm = ({id, onSubmit}) => {
  const [errorMsg, setErrorMsg] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [createReply] = useMutation(createReplyRequest)

  const handleSubmit = async event => {
    setIsSubmitting(true)
    event.preventDefault()

    const contentElement = event.currentTarget.elements.content
    const contentValue = contentElement.value.trim()
    contentElement.value = contentValue

    if (event.currentTarget.checkValidity()) {
      try {
        setErrorMsg()
        await createReply({
          content: contentValue,
          noteId: id,
        })

        onSubmit()
      } catch (error) {
        setErrorMsg(error.message)
      }
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="wrapper">
      <Field
        name="content"
        type="text"
        required
        label="Reply"
        placeholder="Write a response"
      />
      {errorMsg && <p className="error">{errorMsg}</p>}
      <button disabled={isSubmitting} className="button -full" type="submit">
        Send
      </button>
    </form>
  )
}
