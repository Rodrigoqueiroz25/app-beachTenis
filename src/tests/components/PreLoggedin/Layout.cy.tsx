import React from 'react'
import { Layout } from 'components/PreLoggedin/LayoutPage/Layout/Layout'

describe('Test Visuals <Layout />', () => {

  beforeEach(() => {
    cy.mount(<Layout header={<p id='header'>header</p>} main={<p id='main'>main</p>}/>)
  })

  it('has the margins 6rem 2.5rem 2rem 2.5rem', () => {
    cy.get('[class*=main]').should('have.css','margin','96px 40px 32px')
  })

  it('has the font-weight 500', () => {
    cy.get('[class*=main]').should('have.css','font-weight','500')
  })

  it('display a div passed by prop header', () => {
    cy.get('[id=header]').should('be.visible');
  })

  it('display a div passed by prop main', () => {
    cy.get('[id=main]').should('be.visible');
  })

  // it('display label "label" when placeholder prop gets string "label" no hover', () => {
  //   cy.get('[class*=container]').compareSnapshot('layout', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  // })

})