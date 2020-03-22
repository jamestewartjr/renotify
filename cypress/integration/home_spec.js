/// <reference types="Cypress" />


describe('Home', function() {
  it('Visits Renotify home page', function() {
    cy.visit('http://localhost:3000/')
    cy.contains('Notices')
  })
})