import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {useMutation} from 'react-query'
import {signUpRequest} from '../../lib'
import {SignupAuthForm, SignupDetailsForm, SignupTerms} from './index'

export const SignupForm = () => {
  const router = useRouter()
  const [signUp] = useMutation(signUpRequest)
  const [formValues, setFormValues] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const [activeStep, setActiveStep] = useState(0)
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)

  // TODO: focus visible input on view transition/fix keyboard nav

  const handleSubmit = async ({nickname, avatar, city, country, interests}) => {
    event.preventDefault()

    setIsSubmitting(true)

    const signUpResponse = await signUp({
      email: formValues.email,
      password: formValues.password,
      interests,
      nickname,
      avatar,
      country,
      city: city.name,
      coords: [city.coords.lng, city.coords.lat],
    })

    if (!signUpResponse) {
      setErrorMsg('Unable to create account. Please try again.')
    } else {
      setActiveStep(0)
      setTimeout(() => {
        router.push('/signin')
      }, 250)
    }

    setIsSubmitting(false)
  }

  const nextForm = (formValues = {}) => {
    setFormValues(s => ({...s, ...formValues}))
    setActiveStep(s => s + 1)
  }

  const agreeToTerms = () => {
    setHasAgreedToTerms(true)
    setActiveStep(s => s + 1)
  }

  const toggleTerms = () => setActiveStep(s => s + 1)

  return (
    <>
      {/* FIXME: live region */}
      <section aria-hidden={activeStep !== 0}>
        <SignupAuthForm onSubmit={nextForm} />
      </section>

      <section
        aria-hidden={activeStep !== 0}
        className={`fill offscreen ${activeStep !== 0 ? '-show' : ''}`}
      >
        <SignupDetailsForm
          className="footer-pad"
          onSubmit={handleSubmit}
          onToggleTerms={toggleTerms}
          isSubmitting={isSubmitting}
          formError={errorMsg}
          hasAgreedToTerms={hasAgreedToTerms}
        />
      </section>

      <section
        aria-hidden={activeStep !== 2}
        className={`fill offscreen ${activeStep === 2 ? '-show' : ''}`}
      >
        <SignupTerms onAccept={agreeToTerms} />
      </section>

      <p className="wave-pad -small">
        Already have an account?{' '}
        <Link href="signin">
          <a className="link -no-ul">Sign in</a>
        </Link>
      </p>
    </>
  )
}
