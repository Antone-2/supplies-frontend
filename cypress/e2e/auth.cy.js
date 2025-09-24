// Cypress E2E test for registration, email verification, and password reset

describe('User Registration, Email Verification, and Password Reset', () => {
    const testEmail = `testuser+cy${Date.now()}@example.com`;
    const testPassword = 'Password123!';

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('should register a new user and show verification message', () => {
        cy.visit('/register');
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
        cy.get('input[name="confirmPassword"]').type(testPassword);
        cy.get('input[id="terms"]').check();
        cy.get('button[type="submit"]').click();
        cy.contains('Registration successful! A verification link has been sent to your email. Please check your inbox and click the link to complete your registration.', { timeout: 15000 }).should('exist');
    });

    it('should verify the user account via email link', () => {
        // Wait for the user to be saved and token to be available
        cy.wait(1000);
        cy.task('getVerificationToken', testEmail).then((token) => {
            expect(token).to.exist;
            cy.visit(`/verify-email?token=${token}`);
            cy.contains('Account verified').should('exist');
        });
    });

    it('should allow password reset', () => {
        cy.visit('/forgot-password');
        cy.get('input[name="email"]').type(testEmail);
        cy.get('button[type="submit"]').click();
        cy.contains('Password reset email sent').should('exist');
        // Wait for the reset token to be available
        cy.wait(1000);
        cy.task('getResetToken', testEmail).then((token) => {
            expect(token).to.exist;
            cy.visit(`/reset-password?token=${token}`);
            cy.get('input[type="password"]').first().type('NewPassword123!');
            cy.get('input[type="password"]').last().type('NewPassword123!');
            cy.get('button[type="submit"]').click();
            cy.contains('Password reset successful').should('exist');
        });
    });

    it('should navigate to forgot password from login page', () => {
        cy.visit('/auth');
        cy.contains('Forgot password?').click();
        cy.url().should('include', '/forgot-password');
        cy.contains('Reset your password').should('exist');
    });

    it('should handle invalid email format in forgot password', () => {
        cy.visit('/forgot-password');
        cy.get('input[name="email"]').type('invalid-email-format');
        cy.get('button[type="submit"]').click();
        // Should show validation error or prevent submission
        cy.url().should('include', '/forgot-password');
    });

    it('should handle non-existent email for forgot password', () => {
        cy.visit('/forgot-password');
        cy.get('input[name="email"]').type('nonexistent@example.com');
        cy.get('button[type="submit"]').click();
        cy.contains('User not found').should('exist');
    });

    it('should validate password strength in reset password', () => {
        // First get a valid reset token
        cy.task('getResetToken', testEmail).then((token) => {
            cy.visit(`/reset-password?token=${token}`);

            // Test weak password
            cy.get('input[name="password"]').type('weak');
            cy.get('input[name="confirmPassword"]').type('weak');
            cy.get('button[type="submit"]').click();

            // Should show password strength error
            cy.contains('Password is too weak').should('exist');
        });
    });

    it('should handle password mismatch in reset password', () => {
        cy.task('getResetToken', testEmail).then((token) => {
            cy.visit(`/reset-password?token=${token}`);

            cy.get('input[name="password"]').type('StrongPassword123!');
            cy.get('input[name="confirmPassword"]').type('DifferentPassword123!');
            cy.get('button[type="submit"]').click();

            // Should show password mismatch error
            cy.contains('Passwords do not match').should('exist');
        });
    });

    it('should handle invalid reset token', () => {
        cy.visit('/reset-password?token=invalid-token-123');
        cy.get('input[name="password"]').type('NewPassword123!');
        cy.get('input[name="confirmPassword"]').type('NewPassword123!');
        cy.get('button[type="submit"]').click();

        // Should show invalid token error - wait for the error to appear
        cy.contains('Invalid reset token. Please request a new password reset.', { timeout: 15000 }).should('exist');
    });

    it('should handle expired reset token', () => {
        // This would require manipulating the database to expire a token
        // For now, we'll test with an invalid token
        cy.visit('/reset-password?token=expired-token-123');
        cy.get('input[name="password"]').type('NewPassword123!');
        cy.get('input[name="confirmPassword"]').type('NewPassword123!');
        cy.get('button[type="submit"]').click();

        cy.contains('Reset token has expired').should('exist');
    });

    it('should redirect to login after successful password reset', () => {
        cy.task('getResetToken', testEmail).then((token) => {
            // Add token validation checks
            expect(token).to.not.be.null;
            expect(token).to.not.be.undefined;
            expect(token).to.be.a('string');
            expect(token.length).to.be.greaterThan(0);

            cy.visit(`/reset-password?token=${token}`);
            cy.get('input[name="password"]').type('NewPassword123!');
            cy.get('input[name="confirmPassword"]').type('NewPassword123!');
            cy.get('button[type="submit"]').click();

            // Should redirect to login page after success
            cy.url({ timeout: 15000 }).should('include', '/auth');
        });
    });

    it('should show loading states during password reset request', () => {
        cy.visit('/forgot-password');
        cy.get('input[name="email"]').type(testEmail);
        cy.get('button[type="submit"]').click();

        // Should show loading state
        cy.get('button[type="submit"]').should('contain', 'Sending...');
    });

    it('should show loading states during password reset', () => {
        cy.task('getResetToken', testEmail).then((token) => {
            cy.visit(`/reset-password?token=${token}`);
            cy.get('input[name="password"]').type('NewPassword123!');
            cy.get('input[name="confirmPassword"]').type('NewPassword123!');
            cy.get('button[type="submit"]').click();

            // Should show loading state
            cy.get('button[type="submit"]').should('contain', 'Resetting...');
        });
    });
});
