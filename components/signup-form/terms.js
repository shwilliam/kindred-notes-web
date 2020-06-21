import {TermsAndConditions} from '../../components'

export const SignupTerms = ({onAccept}) => {
  const handleAcceptTerms = () => {
    onAccept()
  }

  return (
    <>
      <TermsAndConditions />

      <button
        title="Accept terms and conditions"
        onClick={handleAcceptTerms}
        className="button -full wave-pad"
        type="button"
      >
        Agree
      </button>
    </>
  )
}