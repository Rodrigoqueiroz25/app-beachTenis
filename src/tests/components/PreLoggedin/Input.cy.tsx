
import { PreLoggedin } from 'components/PreLoggedin'
import React from 'react'
import img from 'assets/Mail.svg';
import './main.css';


beforeEach(() => {
  cy.mount(<div className='main'><PreLoggedin.Input placeholder='placeholder' name='test'/></div>)
})

describe('Tests funcionals <PreLoggedin.Input />', () => {
  
  it('renders', () => {})

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.findByPlaceholderText('placeholder').should('be.visible')
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<div className='main'><PreLoggedin.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').parent().parent().find('[class*=error]').should('have.text', 'error');
  })

  it('can receive text value', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.findByPlaceholderText('placeholder').should('have.value', 'test');
  })

  it("Has a image mail passed by prop src", () => {
    cy.mount(<div className='main'><PreLoggedin.Input placeholder='placeholder' src={img}/></div>);
    cy.get('img').should('have.attr', 'src').and('match', /Mail.*.svg/);
  }); 

})


describe('Tests Visuals <PreLoggedin.Input />', () => {


  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.get('[class*=inputPreLogged]').compareSnapshot('input_placeholder_nohover_empty', {errorThreshold: 0.01, capture: 'fullPage', padding:15});
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<div className='main'><PreLoggedin.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.get('[class*=inputPreLogged]').compareSnapshot('input_placeholder_nohover_errormsg', {errorThreshold: 0.01, capture: 'fullPage', padding:15});
  })

  it('can receive text value without error msg', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=inputPreLogged]').compareSnapshot('input_placeholder_hover_notempty', {errorThreshold: 0.01, capture: 'fullPage', padding:15});
  })

  it('can receive text value with error msg when error msg', () => {
    cy.mount(<div className='main'><PreLoggedin.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=inputPreLogged]').compareSnapshot('input_placeholder_hover_notempty_error', {errorThreshold: 0.01, capture: 'fullPage', padding:15});
  })

  it('can receive text value without error msg nohover', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('p').click({force: true});
    cy.get('[class*=inputPreLogged]').compareSnapshot('input_placeholder_nohover_notempty', {errorThreshold: 0.01, capture: 'fullPage', padding:15});
  })

  it('can receive text value with error msg with error nohover', () => {
    cy.mount(<div className='main'><PreLoggedin.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('p').click({force: true});
    cy.get('[class*=inputPreLogged]').compareSnapshot('input_placeholder_nohover_notempty_error', {errorThreshold: 0.01, capture: 'fullPage', padding:15});
  })

});