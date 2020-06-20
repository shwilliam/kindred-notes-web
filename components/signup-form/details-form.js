import {useState} from 'react'
import {AvatarSelect, DropdownCombobox, Tag, TagsInput} from '../../components'
import {useCitiesSearch, useCountriesSearch} from '../../hooks'
import {formatCitiesSelectItems, formatCountriesSelectItems} from '../../lib'

export const SignupDetailsForm = ({
  isSubmitting = false,
  onSubmit,
  onToggleTerms,
  hasAgreedToTerms = false,
  formError,
  className=''
}) => {
  const [errorMsg, setErrorMsg] = useState()
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
  const citiesSearchResults = useCitiesSearch(cityQuery, country)

  const handleInterestClick = idx => {
    setInterests(s => {
      const interests = [...s]
      interests.splice(idx, 1)
      return interests
    })
  }

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

      onSubmit({avatar, city, country, interests})
    } else {
      onToggleTerms()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
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

      {(formError || errorMsg) && (
        <p className="error">{formError || errorMsg}</p>
      )}

      {hasAgreedToTerms ? (
        <button disabled={isSubmitting} className="button -full" type="submit">
          Sign up
        </button>
      ) : (
        <button className="button -full -secondary" type="submit">
          Terms and conditions
        </button>
      )}
    </form>
  )
}
