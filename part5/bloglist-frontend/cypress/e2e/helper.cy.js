export const createBlog = (title, author, url) => {
  cy.contains('create new blog').click()
  cy.get('input[name="title"]').type(title)
  cy.get('input[name="author"]').type(author)
  cy.get('input[name="url"]').type(url)
  cy.get('button[type="submit"]').click()
}

export const loginWith = (username, password) => {
  cy.get('input[name="Username"]').type(username)
  cy.get('input[name="Password"]').type(password)
  cy.get('button[type="submit"]').click()
}
