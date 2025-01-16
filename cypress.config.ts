import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    chromeWebSecurity: false, // Cross-Origin 제한 해제

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  }
});
