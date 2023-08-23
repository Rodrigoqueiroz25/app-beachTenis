
import React from 'react'
import { FormForgotPassword } from 'pages/PreLogged/ForgotPasswd/Presentation/FormForgotPassword'
import { BrowserRouter } from 'react-router-dom';
import './main.css';

function submit(data: any) {
  expect(data.email).to.eq('email@email.com')
}

beforeEach(() => {
  cy.mount(<BrowserRouter><div className='main'><FormForgotPassword submit={submit}/></div></BrowserRouter>)
});


describe('<FormForgotPassword />', () => {
  
  it('renders', () => {  
  })

  it('has a text "Digite seu endereço de e-mail registrado abaixo para receber instruções de redefinição de senha"', () => {
    cy.findByText('Digite seu endereço de e-mail registrado abaixo para receber instruções de redefinição de senha').should('be.visible')
  });

  it('has a field with placeholder "E-mail"', () => {
    cy.findByPlaceholderText('E-mail').should('be.visible')
  });

  it('has a text "Lembrou-se da Senha? Log in"', () => {
    cy.get('[class*=txtRememberPasswd]').contains('Lembrou-se da Senha?').should('be.visible');
    cy.get('[class*=linkToLoginScreen]').contains('Log in').should('be.visible');    
  });

  it('has a button visible', () => {
    cy.get('button').should('be.visible')
  });

  it('button has a text "Enviar"', () => {
    cy.get('button').should('have.text', 'Enviar');
  });

  it('field with placeholder "E-mail" is a input type text', () => {
    cy.findByPlaceholderText('E-mail').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('E-mail').invoke('attr', 'type').should('eq', 'text')
  });

  it('when clicking the button text "Log in" redirects to /login', () => {
    cy.get('[class*=linkToLoginScreen]').click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/login)/g)
  });

  it('values entered in fields are not changed when submitted', () => {    
    cy.findByPlaceholderText('E-mail').type('email@email.com', {force: true});
    cy.get('button').click();
  });

})

describe('Testing Validations <FormForgotPassword />', () => {

  it('displays text "Digite um email para entrar." when click button and field "E-mail" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('E-mail').parent().find('[class*=error]').should('have.text', 'Digite um email para entrar.');
  })

  it('displays text "Digite um email válido." when click button and field "E-mail" is populated with an invalid email', () => {
    cy.findByPlaceholderText('E-mail').type('test');
    cy.get("button").click()
    cy.findByPlaceholderText('E-mail').parent().find('[class*=error]').should('have.text', 'Digite um email válido.');
  })

  it('not displays text when click button and field "E-mail" is populated with a valid email', () => {
    cy.findByPlaceholderText('E-mail').type('email@email.com', {force: true});
    cy.get("button").click()
    cy.findByPlaceholderText('E-mail').parent().find('[class*=error]').should('have.text', '');
  })

});


describe('Testing Visuals <FormForgotPassword />', () => {

  it('form clear', () => {
    cy.get('body').compareSnapshot('formForgotPassword', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formForgotPassword_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  })

});