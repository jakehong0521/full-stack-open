export const loginWith = (username, password) => {
  cy.get('input[name="Username"]').type(username)
  cy.get('input[name="Password"]').type(password)
  cy.get('button[type="submit"]').click()
}
