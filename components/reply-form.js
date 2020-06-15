import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useState} from 'react'
import {getErrorMessage} from '../lib'
import {Field} from './index'

export const ReplyForm = ({id, avatar, onSubmit}) => {
  const [errorMsg, setErrorMsg] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [createReply] = useMutation(CreateReplyMutation)

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
          variables: {
            content: contentValue,
            noteId: id,
            avatar,
          },
        })

        onSubmit()
      } catch (error) {
        setErrorMsg(getErrorMessage(error))
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

const CreateReplyMutation = gql`
  mutation CreateReplyMutation(
    $content: String!
    $noteId: String!
    $avatar: Int!
  ) {
    createReply(input: {content: $content, noteId: $noteId, avatar: $avatar}) {
      reply {
        content
      }
    }
  }
`
