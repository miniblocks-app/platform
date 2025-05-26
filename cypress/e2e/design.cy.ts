describe('Design Tab', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('sr@gmail.com')
    cy.get('input[name="password"]').type('sr')
    cy.get('button[type="submit"]').click()
    cy.url({ timeout: 10000 }).should('not.include', '/login')
    cy.visit('/canvas/1')
    cy.wait(2000)
  })

  it('should display the Button palette item', () => {
    cy.get('span').contains('Button', { timeout: 10000 }).should('be.visible')
  })
}) 