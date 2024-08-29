// https://on.cypress.io/api

describe('Looks a ver si funciona', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('a', 'Listado')
  })

  it('checks un botón a ver si lo manda to another URL', () => {
    cy.visit('/')
    cy.get('table').within(() => {
      cy.get('button').contains('Editar').click()
    })
    cy.url().should('include', '/users')
  })

  it('checks for a specific element on the about page', () => {
    cy.visit('/about')
    cy.contains('h1', 'Lorem Ipsum')
  })

  it('fills out and submits a formulario', () => {
    cy.visit('/create')
    cy.get('[id^=nombre]').type('aaa')
    cy.get('[id^=apellidos]').type('123')
    cy.get('[id^=anno]').type('1999')
    cy.get('form').submit()
    cy.contains('div', 'User aaa 123 created.')
  })

  it('deletes an element and checks for the deleted notification', () => {
    cy.visit('/')
    cy.get('table').within(() => {
      cy.get('button').contains('Borrar').click()
    })
    cy.contains('div', 'deleted successfully')
  })
})