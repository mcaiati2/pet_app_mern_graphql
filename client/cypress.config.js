import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Update this to match your development server URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    // Add proxy configuration
    proxy: {
      '/graphql': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{js,ts,jsx,tsx}', // Add the spec pattern for component tests
  },
});