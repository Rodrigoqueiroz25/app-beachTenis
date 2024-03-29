import { PreLoggedin } from 'components/PreLoggedin'
import React from 'react'
import img from 'assets/Mail.svg';
import './main.css';

beforeEach(() => {
  cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='(99)99999-9999'/></div>)
})

describe('Tests funcionals <PreLoggedin.InputMasked />', () => {

  it('renders', () => {})

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.findByPlaceholderText('placeholder').should('be.visible')
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='(99)99999-9999' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').parent().parent().find('[class*=error]').should('have.text', 'error');
  })

  it("Has a image mail passed by prop src", () => {
    cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='(99)99999-9999' src={img}/></div>);
    cy.get('img').should('have.attr', 'src').and('match', /Mail.*.svg/);
  }); 

  it('mask phoneNumer value 55555555555556 to (55)55555-5555', () => {
    cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='(99)99999-9999'/></div>);
    cy.findByPlaceholderText('placeholder').type('55555555555556');
    cy.findByPlaceholderText('placeholder').should('have.value', '(55)55555-5555');
  })

})


describe('Tests Visuals <PreLoggedin.InputMasked />', () => {

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.get('[class*=inputMaskedPreLogged]').compareSnapshot('InputMasked_placeholder_nohover_empty', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='' msgError='error' /></div>)
    cy.get('[class*=inputMaskedPreLogged]').compareSnapshot('InputMasked_placeholder_nohover_errormsg', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

  it('can receive text value without error msg with mask', () => {
    cy.findByPlaceholderText('placeholder').type('123456789000');
    cy.get('[class*=inputMaskedPreLogged]').compareSnapshot('InputMasked_placeholder_hover_notempty', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

  it('can receive text value with error msg with mask', () => {
    cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='(99)99999-9999' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').type('123456789000');
    cy.get('[class*=inputMaskedPreLogged]').compareSnapshot('InputMasked_placeholder_hover_notempty_error', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

  it('can receive text value without error msg nohover with mask', () => {
    cy.findByPlaceholderText('placeholder').type('123456789000');
    cy.get('p').click({ force: true });
    cy.get('[class*=inputMaskedPreLogged]').compareSnapshot('InputMasked_placeholder_nohover_notempty', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

  it('can receive text value with error msg nohover with mask', () => {
    cy.mount(<div className='main'><PreLoggedin.InputMasked placeholder='placeholder' mask='(99)99999-9999' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').type('123456789000');
    cy.get('p').click({ force: true });
    cy.get('[class*=inputMaskedPreLogged]').compareSnapshot('InputMasked_placeholder_nohover_notempty_error', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

});