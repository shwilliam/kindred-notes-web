import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import {
  AuthLayout,
  AvatarSelect,
  DropdownCombobox,
  Field,
  Head,
  Tag,
  TagsInput,
  TermsAndConditions,
} from '../components'
import {useCitiesSearch, useCountriesSearch} from '../hooks'
import {
  formatCitiesSelectItems,
  formatCountriesSelectItems,
  getErrorMessage,
} from '../lib'

const SignUp = () => {
  const router = useRouter()
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState('INITIAL')
  const [interests, setInterests] = useState([])
  const [avatar, setAvatar] = useState(1)
  const [city, setCity] = useState()
  const [cityQuery, setCitiesQuery] = useState('')
  const {
    country,
    setCountry,
    countryResults,
    handleCountryInputChange,
  } = useCountriesSearch()
  const citiesSearchResults = useCitiesSearch(cityQuery, country) // this can be huge
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)

  const toggleDetails = event => {
    const emailIsValid = event.currentTarget
      .closest('form')
      .elements.email.reportValidity()
    const passwordIsValid = event.currentTarget
      .closest('form')
      .elements.password.reportValidity()

    if (emailIsValid && passwordIsValid) {
      setStep('DETAILS')
      event.currentTarget.closest('form').elements.interests.focus()
    }
  }
  const toggleTerms = () => setStep('TERMS')
  const agreeToTerms = () => {
    setHasAgreedToTerms(true)
    setStep('DETAILS')
  }

  const handleKeyPress = event => {
    event.persist()

    // TODO: focus visible input on view transition/fix keyboard nav
    if (event.key === 'Enter') {
      switch (step) {
        case 'INITIAL':
          // TODO: validate email (check if unique)
          toggleDetails(event)
          break
        case 'DETAILS':
          if (!hasAgreedToTerms) toggleTerms()
          else if (!interests.length) {
            setErrorMsg('Add at least one interest') && console.log('ok??')
            event.preventDefault()
          }
          break
        case 'TERMS':
          agreeToTerms()
          break
        default:
      }
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    if (!city) {
      setErrorMsg('Please add some location information')
    } else if (!interests.length) {
      setErrorMsg('Add at least one interest')
    } else if (
      emailElement.value.trim().length &&
      passwordElement.value.trim().length
    ) {
      setIsSubmitting(true)
      try {
        // TODO: ensure unique email
        await signUp({
          variables: {
            email: emailElement.value,
            interests,
            password: passwordElement.value,
            avatar,
            country,
            city: city.name,
            coords: [city.coords.lat, city.coords.lng],
          },
        })

        setStep('INITIAL')
        setTimeout(() => {
          router.push('/signin')
        }, 250)
      } catch (error) {
        setErrorMsg(getErrorMessage(error))
      }
      setIsSubmitting(false)
    }
  }

  const handleInterestClick = idx => {
    setInterests(s => {
      const interests = [...s]
      interests.splice(idx, 1)
      return interests
    })
  }

  return (
    <AuthLayout>
      <Head title="Sign up" description="Sign up for a Kindred Notes account" />
      <h2 className="sr-only">Sign Up</h2>
      <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <section aria-hidden={step !== 'INITIAL'}>
          <Field
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            label="Email"
          />
          <Field
            name="password"
            type="password"
            autoComplete="password"
            placeholder="Password"
            required
            label="Password"
          />
          {/* TODO: confirm password field */}

          <button
            onClick={toggleDetails}
            className="button -full"
            type="button"
          >
            Create account
          </button>
        </section>

        <section
          aria-hidden={step !== 'DETAILS'}
          className={`fill offscreen ${
            ['DETAILS', 'TERMS'].includes(step) ? '-show' : ''
          }`}
        >
          <div className="title -small -center">Select your Avatar</div>
          <AvatarSelect value={avatar} onChange={setAvatar} />

          <DropdownCombobox
            label="Country"
            items={formatCountriesSelectItems(countryResults)}
            onChange={handleCountryInputChange}
            onSelect={setCountry}
          />

          <DropdownCombobox
            label="City"
            items={formatCitiesSelectItems(citiesSearchResults)}
            onChange={setCitiesQuery}
            onSelect={setCity}
            disabled={!country}
          />

          <label>
            <div className="title -small -center">Topics of Interest</div>
            <TagsInput
              name="interests"
              className="input note__input"
              value={interests}
              onChange={setInterests}
            />
          </label>

          <ul className="tags">
            {interests?.map((topic, idx) => (
              <li key={idx}>
                <Tag idx={idx} topic={topic} onClick={handleInterestClick} />
              </li>
            ))}
          </ul>

          {errorMsg && <p className="error">{errorMsg}</p>}

          {hasAgreedToTerms ? (
            <button
              disabled={isSubmitting}
              className="button -full"
              type="submit"
            >
              Sign up
            </button>
          ) : (
            <button
              onClick={toggleTerms}
              className="button -full -secondary"
              type="button"
            >
              Terms and conditions
            </button>
          )}
        </section>

        <section
          aria-hidden={step !== 'TERMS'}
          className={`fill offscreen ${step === 'TERMS' ? '-show' : ''}`}
        >
          <TermsAndConditions />

          <button
            onClick={agreeToTerms}
            className="button -full wave-pad"
            type="button"
          >
            Agree
          </button>
        </section>

        <p className="wave-pad -small">
          Already have an account?{' '}
          <Link href="signin">
            <a className="link -no-ul">Sign in</a>
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

const SignUpMutation = gql`
  mutation SignUpMutation(
    $email: String!
    $interests: [String]!
    $password: String!
    $avatar: Int!
    $country: String!
    $city: String!
    $coords: [String]!
  ) {
    signUp(
      input: {
        email: $email
        interests: $interests
        password: $password
        avatar: $avatar
        country: $country
        city: $city
        coords: $coords
      }
    ) {
      user {
        id
        email
      }
    }
  }
`

export default withApollo(SignUp)
