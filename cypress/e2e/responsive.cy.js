// responsive.cy.js
// Cypress E2E test for mobile/responsive UI and navigation

describe('Mobile Responsiveness', () => {
  const mobileSizes = [
    { device: 'iPhone X', width: 375, height: 812 },
    { device: 'Pixel 2', width: 411, height: 731 },
    { device: 'iPad Mini', width: 768, height: 1024 }
  ];

  mobileSizes.forEach(({ device, width, height }) => {
    it(`should display homepage and navigation correctly on ${device}`, () => {
      cy.viewport(width, height);
      cy.visit('/');
      cy.get('nav').should('exist');
      cy.get('button.menu-toggle, .mobile-nav').should('exist');
    });

    it(`should open and close mobile menu on ${device}`, () => {
      cy.viewport(width, height);
      cy.visit('/');
      cy.get('[data-cy="mobile-menu-toggle"]').click({ force: true });
      cy.get('.mobile-nav').should('be.visible');
      cy.get('[data-cy="mobile-menu-toggle"]').click({ force: true });
      cy.get('.mobile-nav').should('not.be.visible');
    });
  });
});
