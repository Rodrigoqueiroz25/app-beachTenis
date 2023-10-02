import React from 'react'

import './main.css';
import { FormCreatePassword } from 'components/PreLoggedin/FormCreatePassword/FormCreatePassword';


function submit(data: any) {
  expect(data.password).to.eq('1234')
  expect(data.repeatPasswd).to.eq('1234')
}

beforeEach(() => {
  cy.mount(<div className='main'><FormCreatePassword submit={submit}/></div>)
});

describe('<FormCreatePassword />', () => {
  
  it('renders', () => {
  })

  it('has a text "Sua nova senha deve ser diferente de senhas usadas anteriormente."', () => {
    cy.findByText('Sua nova senha deve ser diferente de senhas usadas anteriormente.').should('be.visible')
  });

  it('has a field with placeholder "Nova Senha"', () => {
    cy.findByPlaceholderText('Nova Senha').should('be.visible')
  });

  it('has a field with placeholder "Repita a Nova Senha"', () => {
    cy.findByPlaceholderText('Repita a Nova Senha').should('be.visible')
  });

  it('has a button visible', () => {
    cy.get('button').should('be.visible')
  });

  it('button has a text "Salvar"', () => {
    cy.get('button').should('have.text', 'Salvar')
  });

  it('field with placeholder "Nova Senha" is a input type password', () => {
    cy.findByPlaceholderText('Nova Senha').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Nova Senha').invoke('attr', 'type').should('eq', 'password')
  });

  it('field with placeholder "Repita a Nova Senha" is a input type password', () => {
    cy.findByPlaceholderText('Repita a Nova Senha').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Repita a Nova Senha').invoke('attr', 'type').should('eq', 'password')
  });

  it('values entered in fields are not changed when submitted', () => {    
    cy.findByPlaceholderText('Nova Senha').type('1234', {force: true});
    cy.findByPlaceholderText('Repita a Nova Senha').type('1234', {force: true})
    cy.get('button').click();
  });

})

describe('Testing Validations <FormCreatePassword>', () => {

  it('displays text "Digite a senha." when click button and field "Nova Senha" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('Nova Senha').parent().find('[class*=error]').should('have.text', 'Digite a senha.');
  })

  it('displays text "Digite novamente a senha." when click button and field "Repita a Nova Senha" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('Repita a Nova Senha').parent().find('[class*=error]').should('have.text', 'Digite novamente a senha.');
  })

  it('displays text "as senhas digitadas são diferentes." when click button and field "Nova Senha" is populated with value diferent of field "Repita a Nova Senha"', () => {
    cy.findByPlaceholderText('Nova Senha').type('test');
    cy.findByPlaceholderText('Repita a Nova Senha').type('tes');
    cy.get("button").click()
    cy.findByPlaceholderText('Repita a Nova Senha').parent().find('[class*=error]').should('have.text', 'as senhas digitadas são diferentes.');
  })


  it('not displays text when click button and field "Nova Senha" is populated', () => {
    cy.findByPlaceholderText('Nova Senha').type('email@email.com', {force: true});
    cy.get("button").click()
    cy.findByPlaceholderText('Nova Senha').parent().find('[class*=error]').should('have.text', '');
  })

  it('not displays text when click button and field "Repita a Nova Senha" is populated', () => {
    cy.findByPlaceholderText('Nova Senha').type('1234', {force: true})
    cy.findByPlaceholderText('Repita a Nova Senha').type('1234', {force: true})
    cy.get("button").click()
    cy.findByPlaceholderText('Repita a Nova Senha').parent().find('[class*=error]').should('have.text', '');
  })

});


describe('Testing Visuals <FormCreatePassword />', () => {

  it('form clear', () => {
    cy.get('body').compareSnapshot('formCreatePassword_clear', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });


  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formLogin_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  })

});