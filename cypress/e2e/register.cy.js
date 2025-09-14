// cypress/e2e/register.cy.js

describe('User Registration', () => {
    it('should register a new user and show verification message', () => {
        const random = Math.floor(Math.random() * 100000);
        const email = `testuser${random}@example.com`;
        cy.visit('/register');
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type('Test1234!');
        cy.get('input[name="confirmPassword"]').type('Test1234!');
        cy.get('input[id="terms"]').check(); // Accept terms
        cy.get('form').submit();
        cy.contains('Registration successful! A verification link has been sent to your email. Please check your inbox and click the link to complete your registration.', { timeout: 10000 }).should('be.visible');
    });
});
