
import React from 'react'
import { PostLogged } from 'components/PostLogged';

describe('<ButtonPlus />', () => {
  it('renders', () => {
    cy.mount(<PostLogged.ButtonPlus />)
  })

  it('have a cursor pointer', () => {
    cy.mount(<PostLogged.ButtonPlus/>);
    cy.get('[class*=button]').should('have.css', 'cursor', 'pointer')
  })

  it("Has a icon plus", () => {
    cy.mount(<PostLogged.ButtonPlus/>);
    cy.findByAltText('símbolo de adição').should('have.attr', 'src').and('match', /add.*.svg/);
  }); 
})