import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import {AuthLayout, Field, TagsInput} from '../components'
import {getErrorMessage} from '../lib/form'

const TermsAndConditions = () => (
  <section>
    <p>
      Aliquam imperdiet dolor et ex pellentesque, sit amet rutrum orci semper.
      Sed sagittis velit quis dignissim faucibus. Sed sapien magna, dignissim ac
      dolor ut, ultricies consectetur ex. Vestibulum malesuada, mauris a
      ultricies elementum, odio libero posuere felis, a tempus magna nulla at
      nibh. Ut nulla sapien, porttitor id porttitor ac, finibus sit amet neque.
      Vivamus sit amet tellus non quam faucibus iaculis sed eleifend tortor.
      Maecenas sit amet tempus urna. Mauris sed leo gravida orci vestibulum
      egestas.
    </p>
    <br />

    <p>
      Proin condimentum justo nec dignissim bibendum. Nam tristique ullamcorper
      lacus, id tristique sapien. Proin ac dolor eleifend, gravida eros at,
      eleifend massa. Pellentesque quam dui, vehicula vel fermentum nec, rhoncus
      nec nibh. Donec vel fermentum purus, at lacinia tortor. Suspendisse id
      ullamcorper ex. Praesent tincidunt tempor nunc. Praesent quis elit
      bibendum diam convallis hendrerit vel et est. Integer ac nisl rhoncus ante
      fringilla lacinia eget non erat. Nulla egestas lacinia odio, id
      ullamcorper sapien volutpat id. In maximus velit non orci vehicula
      dapibus. Maecenas ex libero, placerat in dui et, cursus suscipit libero.
      In quam est, ultricies eget velit a, bibendum ullamcorper diam. In
      eleifend porttitor placerat.
    </p>
    <br />

    <p>
      Pellentesque tincidunt rhoncus magna, at pretium lectus maximus nec. Nulla
      posuere faucibus nisl ac volutpat. Integer libero sapien, vulputate vitae
      gravida quis, dictum quis nunc. Praesent fermentum faucibus libero, et
      elementum tortor interdum et. In posuere ut erat quis imperdiet. Donec
      sollicitudin eu erat at fermentum. Nulla facilisi. Suspendisse porta
      placerat ex, porttitor porta lacus aliquet in. Praesent ac enim rutrum,
      bibendum arcu a, cursus ex. Aenean in finibus ante, vitae finibus ipsum.
    </p>
    <br />

    <p>
      Suspendisse accumsan tristique purus vel consectetur. Aliquam id tincidunt
      tellus. Maecenas iaculis neque ut ullamcorper ultrices. Morbi interdum
      suscipit arcu, id eleifend enim hendrerit quis. Nunc aliquet, diam eget
      semper aliquet, nibh dui consequat nibh, vel mattis sem enim vitae purus.
      Cras molestie, augue ac ultrices efficitur, odio mi ultrices magna, at
      vulputate libero quam vel sapien. Phasellus non consectetur orci, et
      rutrum massa.
    </p>
    <br />

    <p>
      In sagittis venenatis felis, sed tincidunt sapien congue ac. Pellentesque
      habitant morbi tristique senectus et netus et malesuada fames ac turpis
      egestas. Vestibulum cursus, nisi tincidunt varius rhoncus, libero nisi
      lacinia nibh, sit amet sagittis nibh lorem id est. Sed sem arcu,
      scelerisque eget urna ac, aliquam scelerisque magna. Nulla quis ante
      hendrerit, auctor diam vitae, malesuada libero. Curabitur id tempor arcu.
      Nunc faucibus finibus odio, sit amet dapibus leo. Aliquam rutrum
      consectetur dolor, non interdum risus facilisis et. Sed ut lectus
      efficitur, consequat mi sit amet, efficitur purus. Praesent imperdiet sem
      id mi molestie, in pretium mi egestas. Nunc ac elit sed odio tincidunt
      vulputate id in urna. Mauris at justo tempus, viverra ex vitae, congue
      augue. Sed dapibus magna nec turpis rhoncus, eu ultricies dui maximus.
      Donec elementum, elit vestibulum posuere sollicitudin, urna tellus pretium
      felis, sit amet laoreet nisl nisl eu est.
    </p>
  </section>
)

const SignUpMutation = gql`
  mutation SignUpMutation(
    $email: String!
    $interests: [String]!
    $password: String!
  ) {
    signUp(input: {email: $email, interests: $interests, password: $password}) {
      user {
        id
        email
      }
    }
  }
`

const SignUp = () => {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const [step, setStep] = useState('INITIAL')
  const [interests, setInterests] = useState([])
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)
  const router = useRouter()

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

    if (event.key === 'Enter') {
      switch (step) {
        case 'INITIAL':
          // TODO: validate email (check if unique)
          toggleDetails(event)
          break
        case 'DETAILS':
          if (!hasAgreedToTerms) toggleTerms()
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

    if (
      emailElement.value.trim().length &&
      passwordElement.value.trim().length &&
      interests.length
    ) {
      try {
        await signUp({
          variables: {
            email: emailElement.value,
            interests,
            password: passwordElement.value,
          },
        })

        router.push('/signin')
      } catch (error) {
        setErrorMsg(getErrorMessage(error))
      }
    }
  }

  const handleInterestClick = ({target}) => {
    setInterests(s => {
      const interests = [...s]
      interests.splice(target.dataset.idx, 1)
      return interests
    })
  }

  return (
    <AuthLayout>
      <h2 className="sr-only">Sign Up</h2>
      <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        {errorMsg && <p>{errorMsg}</p>}

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
          <label>
            <div className="title -small -center">Topics of Interest</div>
            <TagsInput
              name="interests"
              className="input note__input"
              value={interests}
              onChange={setInterests}
              placeholder="Anxiety, stress..."
            />
          </label>

          <ul className="tags">
            {interests?.map((topic, idx) => (
              <li
                key={idx}
                data-idx={idx}
                className="tag"
                onClick={handleInterestClick}
              >
                {topic}&nbsp;&nbsp;&nbsp;✕
              </li>
            ))}
          </ul>

          {hasAgreedToTerms ? (
            <button className="button -full" type="submit">
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

export default withApollo(SignUp)
