import allCities from 'cities.json'

export const formatCitiesSelectItems = citiesArr =>
  citiesArr.map(({name, lat, lng}) => ({
    label: name,
    value: {name, coords: {lat, lng}},
  }))

export const filterCitiesByCountry = countryCode => ({country}) =>
  countryCode ? country === countryCode : []

export const cities = allCities
