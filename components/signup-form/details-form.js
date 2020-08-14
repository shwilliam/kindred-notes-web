import {useState} from 'react'
import {AvatarSelect, DropdownCombobox, Field} from '../../components'
import {useCitiesSearch, useCountriesSearch} from '../../hooks'
import {formatCitiesSelectItems, formatCountriesSelectItems} from '../../lib'
import {PopularTagsSelect} from '../popular-tags-select'

export const SignupDetailsForm = ({
  isSubmitting = false,
  onSubmit,
  onToggleTerms,
  hasAgreedToTerms = false,
  formError,
  className = '',
}) => {
  // TODO: use a reducer
  const [errorMsg, setErrorMsg] = useState()
  const [interests, setInterests] = useState([])
  const [avatar, setAvatar] = useState(1)
  const [nickname, setNickname] = useState('')
  const [city, setCity] = useState()
  const [cityQuery, setCitiesQuery] = useState('')
  const {
    country,
    setCountry,
    countryResults,
    handleCountryInputChange,
  } = useCountriesSearch()
  const citiesSearchResults = useCitiesSearch(cityQuery, country)
  const handleNicknameChange = e => setNickname(e.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    if (hasAgreedToTerms) {
      if (!city || !country) {
        setErrorMsg('Please add some location information')
        return
      }
      if (!interests.length) {
        setErrorMsg('Add at least one interest')
        return
      }

      onSubmit({avatar, city, country, interests, nickname})
    } else {
      onToggleTerms()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="title -small -center">Select your Avatar</div>
      <AvatarSelect value={avatar} onChange={setAvatar} />

      <Field
        value={nickname}
        onChange={handleNicknameChange}
        name="nickname"
        placeholder="rainbowsurfer"
        label="Nickname"
      />

      <DropdownCombobox
        label="Country"
        name="country"
        items={formatCountriesSelectItems(countryResults)}
        onChange={handleCountryInputChange}
        onSelect={setCountry}
      />

      <DropdownCombobox
        label="City"
        name="city"
        items={formatCitiesSelectItems(citiesSearchResults)}
        onChange={setCitiesQuery}
        onSelect={setCity}
        disabled={!country}
      />

      <PopularTagsSelect onChange={setInterests} title="Topics of Interest" />

      {(formError || errorMsg) && (
        <p className="error">{formError || errorMsg}</p>
      )}

      {hasAgreedToTerms ? (
        <button
          title="Sign up"
          disabled={isSubmitting}
          className="button -full"
          type="submit"
        >
          Sign up
        </button>
      ) : (
        <button
          title="Terms and conditions"
          className="button -full -secondary"
          type="submit"
        >
          Terms and conditions
        </button>
      )}
    </form>
  )
}
