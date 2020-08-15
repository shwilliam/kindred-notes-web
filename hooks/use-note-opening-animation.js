import {useState} from 'react'
import {useMount} from 'react-use'

export const useNoteOpeningAnimation = (disabled = false) => {
  const [state, setState] = useState('CLOSED')

  useMount(() => {
    if (disabled) return

    setTimeout(() => {
      setState('OPENING')
      setTimeout(() => {
        setState('OPEN')
        setTimeout(() => {
          setState('EXPANDED')
          setTimeout(() => {
            setState('REMOVED')
          }, 400)
        }, 600)
      }, 600)
    }, 300)
  })

  return state
}
