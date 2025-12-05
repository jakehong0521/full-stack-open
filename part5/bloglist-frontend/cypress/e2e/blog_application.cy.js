import { loginWith } from './helper.cy.js'

const mockUser = {
  username: 'jake',
  name: 'Jake Hong',
  password: 'password',
}

describe('Blog application', function () {
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset')
    cy.request('POST', '/api/users/', mockUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.visit('/')
    cy.contains('username').should('be.visible')
    cy.contains('password').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      loginWith(mockUser.username, mockUser.password)
      cy.contains(`${mockUser.name} logged in`).should('be.visible')
    })

    it('fails with wrong credentials', function () {
      loginWith(mockUser.username, 'wrongpassword')
      cy.contains('Failed to login', { exact: false }).should('be.visible')
    })
  })
})
