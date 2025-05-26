/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      dragComponent(componentType: string): void
      selectComponent(componentId: string): void
    }
  }
} 