import {TermsAndConditions} from '../../components'

export const SignupTerms = ({onAccept, termsAndConditionsCopy}) => {
  const handleAcceptTerms = () => {
    onAccept()
  }

  return (
    <div className="wave-pad">
      <TermsAndConditions>{termsAndConditionsCopy}</TermsAndConditions>

      <button
        title="Accept terms and conditions"
        onClick={handleAcceptTerms}
        className="button -full wave-pad"
        type="button"
      >
        Agree
      </button>
    </div>
  )
}
