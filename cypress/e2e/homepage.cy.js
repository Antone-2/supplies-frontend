// homepage.cy.js
// Cypress E2E test for homepage, navigation, and basic UI

describe('Homepage and Navigation', () => {
  it('should load the homepage and display key elements', () => {
    cy.visit('/')
    cy.contains('MEDHELM').should('exist')
    cy.get('nav').should('exist')
    cy.get('a').contains('Home').should('exist')
    cy.get('a').contains('Products').should('exist')
    cy.get('a').contains('About').should('exist')
    cy.get('a').contains('Contact').should('exist')
    cy.get('a').contains('Account').should('exist')
  })

  it('should navigate to the product list page', () => {
    cy.visit('/')
    cy.get('a').contains('Products').click()
    cy.url().should('include', '/#products')
    // The ProductList component shows loading state initially or products
    cy.get('body').then($body => {
      if ($body.text().includes('Loading products...')) {
        cy.contains('Loading products...').should('exist')
      } else {
        cy.contains('Add to Cart').should('exist')
      }
    })
  })

  it('should navigate to the login/account page', () => {
    cy.visit('/')
    cy.get('a').contains('Account').click()
    cy.url().should('include', '/auth')
    cy.contains('Sign In').should('exist')
  })

  it('should navigate to the about page', () => {
    cy.visit('/')
    cy.get('a').contains('About').click()
    cy.url().should('include', '/about')
    cy.contains('About').should('exist')
  })

  it('should navigate to the contact page', () => {
    cy.visit('/')
    cy.get('a').contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.contains('Contact').should('exist')
  })
});