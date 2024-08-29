// https://on.cypress.io/api

describe('Page up?', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('a', 'Autores')
  })

  it('Check edit redirect', () => {
    cy.visit('/')
    cy.get('table').within(() => {
      cy.get('button').contains('Editar').click()
    })
    cy.url().should('include', '/author')
  })

  it('Check secondary page', () => {
    cy.visit('/about')
    cy.contains('h1', 'Lorem Ipsum')
  })

  it('Fill out a form and check for creation confirmation', () => {
    cy.visit('/create-author')
    cy.get('[id^=nombre]').type('aaa')
    cy.get('[id^=apellidos]').type('123')
    cy.get('[id^=anno]').type('1999')
    cy.get('form').submit()
    cy.contains('div', 'Author aaa 123 created.')
  })

  it('Delete an element and check for the deleted notification', () => {
    cy.visit('/')
    cy.get('table').within(() => {
      cy.get('button').contains('Borrar').click()
    })
    cy.contains('div', 'deleted successfully')
  })
})