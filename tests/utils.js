export const doSignIn = (email, password) => {
  cy.visit('http://localhost:3000/signin')

  cy.get('[name="email"]').type(email).should('have.value', email)

  cy.get('[name="password"]').type(password).should('have.value', password)

  cy.get('[title="Log in"]').click()

  cy.wait(5000)
}

export const doSignUp = (
  email,
  password,
  countryQuery = 'can',
  cityQuery = 'van',
  tags = ['tag1'],
) => {
  cy.visit('/signup')

  cy.get('[name="email"]').type(email).should('have.value', email)

  cy.get('[name="password"]').type(password).should('have.value', password)

  cy.get('[title="Create account"]').click()

  // FIXME: wait for el
  cy.get('[title="Terms and conditions"]', {timeout: 5000}).click()

  cy.get('[title="Accept terms and conditions"]').click()

  cy.get('[name="country"]')
    .type(`${countryQuery}{downarrow}{enter}`)
    .type('{enter}')

  cy.get('[name="city"]')
    .type(cityQuery)
    .wait(5000) // FIXME: wait for el
    .type('{downarrow}{enter}')

  cy.get('[name="interests"]').type(`${tags.join(',')},`)

  cy.get('[title="Sign up"]').click()
}

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
export const generateId = (pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') =>
  pattern.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
