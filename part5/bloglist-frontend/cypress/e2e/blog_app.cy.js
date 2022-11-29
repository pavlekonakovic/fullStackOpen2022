describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testinguser',
      name: 'Test User',
      password: 'passwordtest'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.get('form')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testinguser')
      cy.get('#password').type('passwordtest')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testinguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('wrong username')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('contain', 'error: wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testinguser', password: 'passwordtest' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Author Test')
      cy.get('#url').type('sample.com')
      cy.get('#create-button').click()

      cy.contains('Test Title Author Test')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Another Title',
          author: 'Someone Else',
          url: 'test.com',
        })
      })

      it('it can be liked', function() {
        cy.contains('Another Title').parent().find('button').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by the user who created it', function() {
        cy.contains('Another Title').parent().find('button').click()
        cy.contains('delete').click()

        cy.contains('Blog removed')
        cy.get('html').should('not.contain', 'Another Title Someone Else')
      })

      it('it can not be deleted by other users', function() {
        cy.contains('logout').click()
        const anotherUser = {
          username: 'anotheruser',
          name: 'Another User',
          password: 'pass'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
        cy.visit('http://localhost:3000')

        cy.login({ username: anotherUser.username, password: anotherUser.password })

        cy.contains('Another Title').parent().find('button').click()
        cy.get('html').should('not.contain', 'delete')
      })

      it('blogs are sorted by number of likes', function() {
        cy.createBlog({
          title: 'Most liked blog',
          author: 'Author Second',
          url: 'test.com',
        })

        cy.createBlog({
          title: 'Second blog',
          author: 'Author Third',
          url: 'test.com',
        })

        cy.contains('Most liked blog').parent().find('button').click()
        cy.get('.like-button').click().wait(200).click()
        cy.contains('hide').click()

        cy.contains('Second blog').parent().find('button').click()
        cy.get('.like-button').click()
        cy.contains('hide').click()

        cy.get('.blog').eq(0).should('contain', 'Most liked blog')
        cy.get('.blog').eq(1).should('contain', 'Second blog')
        cy.get('.blog').eq(2).should('contain', 'Another Title')
      })
    })
  })
})