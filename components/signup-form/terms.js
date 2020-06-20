import {TermsAndConditions} from '../../components'

export const SignupTerms = ({onAccept}) => {
  const handleAcceptTerms = () => {
    onAccept()
  }

  return (
    <>
      <TermsAndConditions />

      <button
        onClick={handleAcceptTerms}
        className="button -full wave-pad"
        type="button"
      >
        Agree
      </button>
    </>
  )
}
