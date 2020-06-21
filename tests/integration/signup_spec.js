import {doSignUp, generateId} from '../utils'

const mockEmail = `${generateId('xxxx')}@mail.com`
const mockPassword = 'password'

describe('sign up', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('can sign up', () => {
    // TODO: remove user on cleanup

    doSignUp(mockEmail, mockPassword)

    // FIXME: check network response
    cy.location('pathname').should('equal', '/signin')
  })

  it('notifies if email exists', () => {
    cy.get('[name="email"]').type(mockEmail).should('have.value', mockEmail)

    cy.get('[name="password"]')
      .type(mockPassword)
      .should('have.value', mockPassword)

    cy.get('[title="Create account"]').click()

    cy.get('.error', {timeout: 10000}) // FIXME: wait for el
      .should('contain', 'email')
      .should('contain', 'exists')
  })
})
