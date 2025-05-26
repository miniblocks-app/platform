/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      dragComponent(componentType: string): Chainable<void>
      selectComponent(componentId: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('dragComponent', (componentType: string) => {
  cy.get(`[data-component-type="${componentType}"]`).trigger('mousedown', { which: 1 })
  cy.get('.mobile-canvas').trigger('mousemove', { clientX: 200, clientY: 200 })
  cy.get('.mobile-canvas').trigger('mouseup')
})

Cypress.Commands.add('selectComponent', (componentId: string) => {
  cy.get(`[data-component-id="${componentId}"]`).click()
}) 