import {doSignIn, doSignUp, generateId} from '../utils'

const mockEmail = `${generateId('xxxx')}@mail.com`
const mockPassword = 'password'

describe('sign in', () => {
  before(() => {
    // ensure mock user account exists
    doSignUp(mockEmail, mockPassword)

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
