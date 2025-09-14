export default {
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      on('task', {
        async getVerificationToken(email) {
          // Make API call to backend to get verification token for the email
          try {
            const response = await fetch(`${config.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/get-verification-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
            const data = await response.json();
            return data.token || null;
          } catch (error) {
            console.error('Failed to get verification token:', error);
            return null;
          }
        },
        async getResetToken(email) {
          // Make API call to backend to get reset token for the email
          try {
            const response = await fetch(`${config.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/get-reset-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
            const data = await response.json();
            return data.token || null;
          } catch (error) {
            console.error('Failed to get reset token:', error);
            return null;
          }
        }
      });
    }
  },
};
