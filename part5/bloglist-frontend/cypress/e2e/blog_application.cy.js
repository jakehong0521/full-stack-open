import { createBlog, loginWith } from './helper.cy.js'

const mockUser = {
  username: 'jake',
  name: 'Jake Hong',
  password: 'password',
}
const mockBlog = {
  title: 'E2E Testing Guide',
  author: 'Jake Hong',
  url: 'http://e2e-testing-guide.com',
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

  describe('When logged in', function () {
    beforeEach(function () {
      loginWith(mockUser.username, mockUser.password)
    })

    it('A blog can be created', function () {
      createBlog(mockBlog.title, mockBlog.author, mockBlog.url)
      cy.contains('A new blog').should('be.visible')
      cy.contains(`${mockBlog.title} - ${mockBlog.author}`).should('be.visible')

      cy.visit('/')
      cy.contains(`${mockBlog.title} - ${mockBlog.author}`).should('be.visible')
    })
  })
})
