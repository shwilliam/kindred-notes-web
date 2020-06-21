import {generateId} from '../utils'

const mockEmail = `${generateId('xxxx')}@mail.com`
const mockPassword = 'password'

describe('sign up', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('can sign up', () => {
    cy.get('[name="email"]').type(mockEmail).should('have.value', mockEmail)

    cy.get('[name="password"]')
      .type(mockPassword)
      .should('have.value', mockPassword)

    cy.get('[title="Create account"]').click()

    // FIXME: wait for el
    cy.get('[title="Terms and conditions"]', {timeout: 5000}).click()

    cy.get('[title="Accept terms and conditions"]').click()

    cy.get('[name="country"]').type('can{downarrow}{enter}').type('{enter}')

    cy.get('[name="country"]').should('have.value', 'Canada')

    cy.get('[name="city"]')
      .type('van')
      .wait(5000) // FIXME: wait for el
      .type('can{downarrow}{enter}')
      .type('{enter}')

    cy.get('[name="city"]').should('have.value', 'Vancouver')

    cy.get('[name="interests"]').type('tag1,')

    cy.get('[title="Sign up"]').click()

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
