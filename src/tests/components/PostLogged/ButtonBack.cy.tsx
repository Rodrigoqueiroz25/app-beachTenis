import React from 'react'
import { PostLogged } from 'components/PostLogged';

describe('Testing <ButtonBack />', () => {
  
  it('renders', () => {
    cy.mount(<PostLogged.ButtonBack />)
  })

  it('have a cursor pointer', () => {
    cy.mount(<PostLogged.ButtonBack/>);
    cy.get('[class*=button]').should('have.css', 'cursor', 'pointer')
  })

  it("Has a image arrow left", () => {
    cy.mount(<PostLogged.ButtonBack/>);
    cy.findByAltText('seta para esquerda').should('have.attr', 'src').and('match', /set_left.*.svg/);
  }); 

})
