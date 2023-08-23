import React from 'react'
import { PostLogged } from 'components/PostLogged'
import './main.css'


beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.Input placeholder='placeholder' name='test'/></div>)
})

describe('Tests funcionals <PostLogged.Input />', () => {
  
  it('renders', () => {})

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.findByPlaceholderText('placeholder').should('be.visible')
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<div className='main'><PostLogged.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').parent().parent().find('[class*=error]').should('have.text', 'error');
  })

  it('can receive text value', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.findByPlaceholderText('placeholder').should('have.value', 'test');
  })

})


describe('Tests Visuals <PostLogged.Input />', () => {

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_empty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<div className='main'><PostLogged.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_errormsg', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value without error msg', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_hover_notempty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value with error msg when error msg', () => {
    cy.mount(<div className='main'><PostLogged.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_hover_notempty_error', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value without error msg nohover', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('label').click();
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_notempty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value with error msg with error nohover', () => {
    cy.mount(<div className='main'><PostLogged.Input placeholder='placeholder' name='test' msgError='error'/></div>)
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('label').click();
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_notempty_error', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

});