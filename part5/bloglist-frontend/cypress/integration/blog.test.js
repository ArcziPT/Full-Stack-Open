describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        // create here a user to backend
        cy.request('POST', 'http://localhost:3000/api/users', {username: "user", password:"pass"})
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.get('.loginForm')
    })
  
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('user')
            cy.get('#password').type('pass')
            cy.get('.loginForm').contains('login').click()
            cy.contains('user is logged in')
        })
  
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('user123')
            cy.get('#password').type('pass123')
            cy.get('.loginForm').contains('login').click()
            cy.contains('user is logged in').should('not.exist')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('#username').type('user')
            cy.get('#password').type('pass')
            cy.get('.loginForm').contains('login').click()
        })
    
        it('A blog can be created', function() {
             cy.contains('new blog').click()
             cy.get('#title').type('new title')
             cy.get('#author').type('new author')
             cy.get('#url').type('http://newbook.com')
             cy.get('.blogForm').contains('CREATE').click()

             cy.get('.blog')
        })
    })
})