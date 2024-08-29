// https://on.cypress.io/api

describe('Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('a', 'Listado')
  })

  it('checks for a button in a table and navigates to another URL', () => {
    cy.visit('/')
    cy.get('table').within(() => {
      cy.get('button').contains('Editar').click()
    })
    cy.url().should('include', '/users')
  })

  it('checks for a specific element on the new page', () => {
    cy.visit('/about')
    cy.contains('h1', 'Lorem Ipsum')
  })

  // it('fills out and submits a form', () => {
  //   cy.visit('/create')
  //   cy.get('input').first().type('aaa')

  //   cy.get('Nombre').find('input').type('aaa')
  //   cy.get('Apellidos').find('input').type('123')
  //   cy.get('Año').find('input').type('1999')

  //   cy.get('input[name="Apellidos"]').type('123')
  //   cy.get('input[name="Año"]').type('1999')
  //   cy.get('form').submit()
  //   cy.contains('div', 'User aaa created')
  // })

  // it('checks for an element that appears after an AJAX call', () => {
  //   cy.visit('/ajax-page')
  //   cy.contains('button', 'Load Data').click()
  //   cy.get('.data-loaded').should('be.visible')
  // })
})