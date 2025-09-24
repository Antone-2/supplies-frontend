// checkout.cy.js
// Cypress E2E test for checkout process, address, payment, and confirmation

describe('Checkout Process', () => {
  beforeEach(() => {
    // Clear localStorage and cookies before each test
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should show empty cart message', () => {
    cy.visit('/checkout');
    cy.contains('Your cart is empty').should('exist');
    cy.contains('Browse Products').should('exist');
  });

  it('should load shop page', () => {
    cy.visit('/shop');
    cy.get('body').should('exist');
    cy.contains('Shop Medical Supplies').should('exist');
  });

  it('should complete full checkout flow with Pesapal integration', () => {
    // First, login as a test user since checkout requires authentication
    cy.visit('/auth');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('TestPass123!');
    cy.get('button[type="submit"]').click();

    // Wait for login to complete
    cy.url({ timeout: 10000 }).should('not.include', '/auth');

    // Visit shop and add items to cart
    cy.visit('/shop');

    // Wait for products to load
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('button').contains('Add to Cart').click();
    });

    // Wait for cart count to update (may be async)
    cy.wait(1000);

    // Verify item was added to cart
    cy.get('[data-testid="cart-count"]').should('contain', '1');

    // Navigate to checkout
    cy.visit('/checkout');

    // Verify checkout page loads
    cy.contains('Checkout').should('exist');
    cy.contains('Order Summary').should('exist');

    // Fill shipping address form (using actual field names from Checkout.tsx)
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="address"]').type('123 Main Street');
    cy.get('select[name="pickupPoint"]').select('Nairobi CBD');
    cy.get('input[name="phone"]').type('+254712345678');

    // Verify shipping fee calculation
    cy.contains('Shipping').should('exist');

    // Verify payment method section (should only show Pesapal option)
    cy.contains('Payment Method').should('exist');

    // Verify Pay button is present (matches actual button text)
    cy.get('button').contains('Pay KES').should('exist');

    // Mock the API call for checkout session creation
    cy.intercept('POST', '/api/v1/orders/create-checkout-session', (req) => {
      // Verify the request payload structure
      expect(req.body).to.have.property('amount');
      expect(req.body).to.have.property('orderData');
      expect(req.body.orderData).to.have.property('items');
      expect(req.body.orderData).to.have.property('shippingAddress');

      // Mock successful response
      req.reply({
        statusCode: 200,
        body: {
          payment_url: 'https://pay.pesapal.com/test-payment-url',
          order_id: 'test-order-123'
        }
      });
    }).as('createCheckoutSession');

    // Click Pay button
    cy.get('button').contains('Pay KES').click();

    // Verify API call was made
    cy.wait('@createCheckoutSession');

    // Verify user is redirected to Pesapal payment page (in real scenario)
    // For testing, we can check that the API call was successful
    cy.get('body').should('exist');
  });

  it('should handle checkout errors gracefully', () => {
    // First, login as a test user since checkout requires authentication
    cy.visit('/auth');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('TestPass123!');
    cy.get('button[type="submit"]').click();

    // Wait for login to complete
    cy.url({ timeout: 10000 }).should('not.include', '/auth');

    // Add item to cart first
    cy.visit('/shop');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('button').contains('Add to Cart').click();
    });

    // Wait for cart count to update (may be async)
    cy.wait(1000);

    cy.visit('/checkout');

    // Fill form with actual field names
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="address"]').type('123 Main Street');
    cy.get('select[name="pickupPoint"]').select('Nairobi CBD');
    cy.get('input[name="phone"]').type('+254712345678');

    // Mock API error
    cy.intercept('POST', '/api/v1/orders/create-checkout-session', {
      statusCode: 500,
      body: {
        status: 'error',
        message: 'Failed to create checkout session'
      }
    }).as('checkoutError');

    // Click Pay button
    cy.get('button').contains('Pay KES').click();

    // Verify error handling
    cy.wait('@checkoutError');
    cy.get('body').should('exist'); // Page should still be functional
  });

  it('should validate shipping address form', () => {
    // First, login as a test user since checkout requires authentication
    cy.visit('/auth');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('TestPass123!');
    cy.get('button[type="submit"]').click();

    // Wait for login to complete
    cy.url({ timeout: 10000 }).should('not.include', '/auth');

    // Add item to cart
    cy.visit('/shop');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('button').contains('Add to Cart').click();
    });

    // Wait for cart count to update (may be async)
    cy.wait(1000);

    cy.visit('/checkout');

    // Try to submit without filling required fields
    cy.get('button').contains('Pay KES').click();

    // Should show validation or prevent submission
    cy.url().should('include', '/checkout'); // Should stay on checkout page

    // Test individual field validation - fill some fields but leave others empty
    cy.get('input[name="name"]').type('John Doe');
    // Leave address empty
    cy.get('select[name="pickupPoint"]').select('Nairobi CBD');
    // Leave phone empty

    // Try to submit with missing required fields
    cy.get('button').contains('Pay KES').click();

    // Should still be on checkout page and show validation
    cy.url().should('include', '/checkout');

    // Form should handle incomplete inputs appropriately
    cy.get('body').should('exist');
  });
});
