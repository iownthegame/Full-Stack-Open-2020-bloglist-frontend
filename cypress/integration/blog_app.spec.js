describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3002')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('title 123')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()

      cy.contains('title 123')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'first url' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'second url' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'third url' })
      })

      it('it can be liked', function () {
        cy.contains('second blog').parent().find('.viewButton').click()
        cy.contains('second blog').parent().find('.likeButton').click()
        cy.contains('second blog').parent().should('contain', 'likes 1')
      })

      it('it can be deleted by the created user', function () {
        cy.contains('second blog').parent().find('.viewButton').click()
        cy.contains('second blog').parent().find('.removeButton').click()
        cy.on('window:confirm', () => true)
        cy.get('html').should('not.contain', 'second blog')
      })

      it('it can be deleted by the created user', function () {
        cy.contains('second blog').parent().find('.viewButton').click()
        cy.contains('second blog').parent().find('.removeButton').click()
        cy.on('window:confirm', () => true)
        cy.get('html').should('not.contain', 'second blog')
      })

      it('it cannot be deleted by other users', function () {
        const user = {
          name: 'New User',
          username: 'new user',
          password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login({ username: 'new user', password: 'password' })
        cy.contains('second blog').parent().find('.viewButton').click()
        cy.contains('second blog').parent().find('.removeButton').should('not.exist')
      })

      it('blogs are ordered by most like numbers', function () {
        cy.contains('third blog').parent().find('.viewButton').click()
        cy.contains('third blog').parent().find('.likeButton').click()
        cy.contains('third blog').parent().find('.likeButton').click()
        cy.contains('third blog').parent().find('.likeButton').click()

        cy.contains('second blog').parent().find('.viewButton').click()
        cy.contains('second blog').parent().find('.likeButton').click()
        cy.contains('second blog').parent().find('.likeButton').click()

        cy.contains('first blog').parent().find('.viewButton').click()
        cy.contains('first blog').parent().find('.likeButton').click()

        cy.get('.blog .title').then(blogs => {
          let blog_lists = []
          for (let i = 0; i < blogs.length; i++) {
            blog_lists.push(blogs[i].textContent)
          }
          expect(blog_lists).to.have.ordered.members(['third blog', 'second blog', 'first blog'])
        })
      })
    })
  })
})
