import React from 'react'
import { PostLogged } from 'components/PostLogged';
import './main.css';

beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.ButtonBack /></div>)
});


describe('Testing <ButtonBack />', () => {
  
  it('renders', () => {
  })

  it('have a cursor pointer', () => {
    cy.get('[class*=button]').should('have.css', 'cursor', 'pointer')
  })

  it("Has a image arrow left", () => {
    cy.findByAltText('seta para esquerda').should('have.attr', 'src').and('match', /set_left.*.svg/);
  }); 

})

describe('Testing Visuals <ButtonBack />', () => {

  it('visual is ok', () => {
    cy.get('body').compareSnapshot('buttonBack', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  });

});