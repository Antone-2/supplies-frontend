// user.cy.js
// Cypress E2E test for user registration, login, and account workflows

describe('User Registration and Login', () => {
  let uniqueEmail;
  const password = 'Password123!';

  before(() => {
    uniqueEmail = `testuser+cy${Date.now()}@example.com`;
  });

  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.contains('Registration successful! A verification link has been sent to your email. Please check your inbox and click the link to complete your registration.').should('exist');
  });

  it('should login an existing user', () => {
    cy.visit('/auth');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(3000); // Wait for navigation and state updates
    cy.url().should('not.include', '/auth'); // Should not be on auth page anymore
    cy.contains('MEDHELM').should('exist'); // Check for header logo
  });

  it('should show error for wrong password', () => {
    cy.visit('/auth');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('WrongPassword!');
    cy.get('button[type="submit"]').click();
    cy.wait(3000);
    // Check that we're still on the auth page (login failed)
    cy.url().should('include', '/auth');
    // Check that the login form is still visible
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });
});