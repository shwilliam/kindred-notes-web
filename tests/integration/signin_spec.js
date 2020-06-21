import {doSignIn} from '../utils'

// FIXME: expects user to exist
const mockEmail = 'mail@mail.com'
const mockPassword = 'password'

describe('sign in', () => {
  before(() => {
    // ensure mock user account exists
    cy.visit('/signup')

    cy.get('[name="email"]').type(mockEmail).should('have.value', mockEmail)
    cy.get('[name="password"]')
      .type(mockPassword)
      .should('have.value', mockPassword)

    cy.get('[title="Create account"]').click()

    cy.get('.error', {timeout: 20000})
      .should('contain', 'email')
      .should('contain', 'exists')

    cy.visit('/signin')
  })

  it('can sign in', () => {
    doSignIn(mockEmail, mockPassword)

    // FIXME: check network response
    cy.location('pathname').should('equal', '/')
  })

  it('can sign out', () => {
    doSignIn(mockEmail, mockPassword)

    cy.visit('/profile')

    cy.get('[title="Sign out"]').click()

    // FIXME: check network response
    cy.location('pathname').should('equal', '/signout')
  })
})
