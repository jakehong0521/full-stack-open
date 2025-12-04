describe('Blog application', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.visit('/')
    cy.contains('username').should('be.visible')
    cy.contains('password').should('be.visible')
  })
})
