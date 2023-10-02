
import React from 'react'
import { FormLogin } from 'components/PreLoggedin/FormLogin/FormLogin'
import { BrowserRouter } from 'react-router-dom'
import './main.css';

function submit(data: any) {
  expect(data.email).to.eq('email@email.com')
  expect(data.password).to.eq('1234')
}

beforeEach(() => {
  cy.mount(<BrowserRouter><div className='main'><FormLogin error='' submit={submit}/></div></BrowserRouter>)
})


describe('<FormLogin />', () => {
  
 
  it('renders', () => {
  });

  it('has a field with placeholder "E-mail"', () => {
    cy.findByPlaceholderText('E-mail').should('be.visible')
  });

  it('has a field with placeholder "Senha"', () => {
    cy.findByPlaceholderText('Senha').should('be.visible')
  });

  it('has a button visible', () => {
    cy.get('button').should('be.visible')
  });

  it('button has a text "Login"', () => {
    cy.get('button').should('have.text', 'Login')
  });

  it('text "error login" displays when string is passed by prop error', () => {
    cy.mount(<BrowserRouter><div className='main'><FormLogin error='error login' submit={submit}/></div></BrowserRouter>)
    cy.findByText('error login').should('be.visible')
  });

  it('has a text button "Esqueceu a Senha?" visible', () => {
    cy.get('[class*=forgotPasswd]').contains('Esqueceu a Senha?').should('be.visible')
  });
  
  
  it('field with placeholder "E-mail" is a input type text', () => {
    cy.findByPlaceholderText('E-mail').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('E-mail').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Senha" is a input type password', () => {
    cy.findByPlaceholderText('Senha').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Senha').invoke('attr', 'type').should('eq', 'password')
  });

  it('field with placeholder "E-mail" has a image mail', () => {
    cy.findByPlaceholderText('E-mail').parent().children('img').should('have.attr', 'src').and('match', /Mail.*.svg/)
  });

  it('field with placeholder "Senha" has a image eye', () => {
    cy.findByPlaceholderText('Senha').parent().children('img').should('have.attr', 'src').and('match', /eye.*.svg/)
  });
  
  it('when clicking the button text "Esqueceu a Senha?" redirects to /forgot-password', () => {
    cy.findByText('Esqueceu a Senha?').click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/forgot-password)/g)
  });

  it('values entered in fields are not changed when submitted', () => {    
    cy.findByPlaceholderText('E-mail').type('email@email.com', {force: true});
    cy.findByPlaceholderText('Senha').type('1234', {force: true})
    cy.get('button').click();
  });

})


describe('Testing Validations <FormLogin>', () => {


  it('displays text "Digite um email para entrar." when click button and field "E-mail" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('E-mail').parent().find('[class*=error]').should('have.text', 'Digite um email para entrar.');
  })

  it('displays text "Digite a senha." when click button and field "Senha" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('Senha').parent().find('[class*=error]').should('have.text', 'Digite a senha.');
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

  it('not displays text  when click button and field "Senha" is populated', () => {
    cy.findByPlaceholderText('Senha').type('1234', {force: true})
    cy.get("button").click()
    cy.findByPlaceholderText('Senha').parent().find('[class*=error]').should('have.text', '');
  })

});

describe('Testing Visuals <FormLogin />', () => {


  it('form clear', () => {
    cy.get('body').compareSnapshot('formLogin_clear', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('text "error login" displays when string is passed by prop error', () => {
    cy.mount(<BrowserRouter><div className='main'><FormLogin error='error login' submit={submit}/></div></BrowserRouter>)
    cy.get('body').compareSnapshot('formLogin_msgerror', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formLogin_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  })

});