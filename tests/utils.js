export const doSignIn = (email, password) => {
  cy.visit('http://localhost:3000/signin')

  cy.get('[name="email"]').type(email).should('have.value', email)

  cy.get('[name="password"]').type(password).should('have.value', password)

  cy.get('[title="Log in"]').click()

  cy.wait(5000)
}

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
export const generateId = (pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') =>
  pattern.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
