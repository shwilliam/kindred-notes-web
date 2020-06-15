import {useRef} from 'react'

export const Modal = ({onDismiss, children}) => {
  const shimRef = useRef()

  const dismiss = e => {
    if (onDismiss && shimRef.current === e.target) onDismiss()
  }

  return (
    <div ref={shimRef} onClick={dismiss} className="modal__bg">
      <div className="modal">{children}</div>
    </div>
  )
}
