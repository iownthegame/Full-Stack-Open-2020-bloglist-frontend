describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3002')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
})
