
import React from 'react'
import { PostLogged } from 'components/PostLogged';
import './main.css';

beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.ButtonPlus /></div>)
});


describe('<ButtonPlus />', () => {
  it('renders', () => {
  })

  it('have a cursor pointer', () => {
    cy.get('[class*=button]').should('have.css', 'cursor', 'pointer')
  })

  it("Has a icon plus", () => {
    cy.findByAltText('símbolo de adição').should('have.attr', 'src').and('match', /add.*.svg/);
  }); 
})

describe('Testing Visuals <ButtonPLus />', () => {

  it('visual is ok', () => {
    cy.get('body').compareSnapshot('buttonPlus', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  });

});