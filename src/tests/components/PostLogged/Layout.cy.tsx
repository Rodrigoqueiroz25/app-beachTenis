import { PostLogged } from 'components/PostLogged'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

describe('<PostLogged.LayoutPage.Layout />', () => {
  
  beforeEach(() => {
    cy.mount(<BrowserRouter><PostLogged.LayoutPage.Layout header={<p id='header'>header</p>} main={<p id='main'>main</p>}/></BrowserRouter>)
  })
  
  it('renders', () => {
  
  })

  it('has a footer fixed render', () => {
    cy.get('[class*=footer]').should('be.visible');
  })

  it('display a div passed by prop header', () => {
    cy.get('[id=header]').should('be.visible');
  })

  it('display a div passed by prop main', () => {
    cy.get('[id=main]').should('be.visible');
  })

})

describe('Test Visual <PostLogged.LayoutPage.Layout />', () => {
  
  beforeEach(() => {
    cy.mount(<BrowserRouter><PostLogged.LayoutPage.Layout header main/></BrowserRouter>)
  })
  
  it('has the margins 0rem 1rem auto 1rem in main', () => {
    cy.get('[class*=main]').should('have.css','margin','0px 16px auto')
  })

  it('has the font-weight 500 in main', () => {
    cy.get('[class*=main]').should('have.css','font-weight','500')
  })

  it('has the padding 1rem 1rem 0rem 1rem in header', () => {
    cy.get('[class*=header]').should('have.css','padding','16px 16px 0px')
  })

  it('has the box-shadow and filter in header', () => {
    cy.get('[class*=header]').should('have.css','box-shadow','rgba(0, 0, 0, 0.25) 0px -3.2px 6.4px 0px')
    cy.get('[class*=header]').should('have.css','filter','drop-shadow(rgba(0, 0, 0, 0.25) 0px 0px 0px)')
  })

  it('visual is ok', () => {
    cy.get('[class*=wrapper]').compareSnapshot('layout', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

})