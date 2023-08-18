import React from 'react'
import { TextArea } from 'components/PostLogged/TextArea/TextArea'
import { PostLogged } from 'components/PostLogged';

describe('Test Funcional <TextArea />', () => {
  
  beforeEach(() => {
    cy.mount(<TextArea placeholder='placeholder'/>)
  });
  
  it('renders', () => {
  })

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.findByPlaceholderText('placeholder').should('be.visible')
  })

  // it('display error message "error" when msgError prop gets string "error"', () => {
  //   cy.mount(<PostLogged.TextArea placeholder='placeholder' msgError='error'/>)
  //   cy.findByPlaceholderText('placeholder').parent().find('[class*=error]').should('have.text', 'error');
  // })

  it('can receive text value', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.findByPlaceholderText('placeholder').should('have.value', 'test');
  })

})

describe('Tests Visuals <PostLogged.TextArea />', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.TextArea placeholder='placeholder' name='test'/>)
  })

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.get('[class*=textarea]').compareSnapshot('textarea_placeholder_nohover_empty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  // it('display error message "error" when msgError prop gets string "error"', () => {
  //   cy.mount(<PostLogged.Input placeholder='placeholder' name='test' msgError='error'/>)
  //   cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_errormsg', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  // })

  it('can receive text value', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=textarea]').compareSnapshot('textarea_placeholder_hover_notempty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value nohover', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('html').click();
    cy.get('[class*=textarea]').compareSnapshot('textarea_placeholder_nohover_notempty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  
});