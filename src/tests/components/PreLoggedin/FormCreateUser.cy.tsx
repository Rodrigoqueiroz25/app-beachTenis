import React from 'react'
import { FormCreateUser } from '../../../../.unused/CreateUser/Presentation/FormCreateUser'
import './main.css';

function submit(data: any) {
  expect(data.phoneNumber).to.eq('+55(99)99999-9999')
  expect(data.email).to.eq('email@email.com')
  expect(data.password).to.eq('1234')
  expect(data.repeatPasswd).to.eq('1234')
}

beforeEach(() => {
  cy.mount(<div className='main'><FormCreateUser submit={submit}/></div>)
})

describe('<FormCreateUser />', () => {
  
  it('renders', () => {
  })

  it('has a field with placeholder "E-mail"', () => {
    cy.findByPlaceholderText('E-mail').should('be.visible')
  });

  it('has a field with placeholder "Senha"', () => {
    cy.findByPlaceholderText('Senha').should('be.visible')
  });

  it('has a field with placeholder "Telefone"', () => {
    cy.findByPlaceholderText('Telefone').should('be.visible')
  });

  it('has a field with placeholder "Repita Senha"', () => {
    cy.findByPlaceholderText('Repita Senha').should('be.visible')
  });

  it('has a button visible', () => {
    cy.get('button').should('be.visible')
  });

  it('button has a text "Cadastrar-se"', () => {
    cy.get('button').should('have.text', 'Cadastrar-se')
  });

  it('field with placeholder "Telefone" is a input type tel', () => {
    cy.findByPlaceholderText('Telefone').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Telefone').invoke('attr', 'type').should('eq', 'tel')
  });

  it('field with placeholder "Telefone" has a mask +55(99)99999-9999', () => {
    cy.findByPlaceholderText('Telefone').type('99999999999')
    cy.get('[type*=tel]').invoke('prop', 'value').should('eq', '+55(99)99999-9999')
  });

  it('field with placeholder "Senha" is a input type password', () => {
    cy.findByPlaceholderText('Senha').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Senha').invoke('attr', 'type').should('eq', 'password')
  });

  it('field with placeholder "Repita Senha" is a input type password', () => {
    cy.findByPlaceholderText('Repita Senha').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Repita Senha').invoke('attr', 'type').should('eq', 'password')
  });

  it('field with placeholder "E-mail" has a image mail', () => {
    cy.findByPlaceholderText('E-mail').parent().children('img').should('have.attr', 'src').and('match', /Mail.*.svg/)
  });

  it('field with placeholder "Senha" has a image eye', () => {
    cy.findByPlaceholderText('Senha').parent().children('img').should('have.attr', 'src').and('match', /eye.*.svg/)
  });

  it('field with placeholder "Repita Senha" has a image eye', () => {
    cy.findByPlaceholderText('Repita Senha').parent().children('img').should('have.attr', 'src').and('match', /eye.*.svg/)
  });

  it('values entered in fields are not changed when submitted', () => {    
    cy.findByPlaceholderText('Telefone').type('99999999999', {force: true})
    cy.findByPlaceholderText('E-mail').type('email@email.com', {force: true});
    cy.findByPlaceholderText('Senha').type('1234', {force: true})
    cy.findByPlaceholderText('Repita Senha').type('1234', {force: true})
    cy.get('button').click();
  });

})

describe('Testing Validations <FormCreateUser>', () => {

  it('displays text "Digite um número de telefone." when click button and field "Telefone" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('Telefone').parent().find('[class*=error]').should('have.text', 'Digite um número de telefone.');
  })

  it('displays text "Digite um email para entrar." when click button and field "E-mail" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('E-mail').parent().find('[class*=error]').should('have.text', 'Digite um email para entrar.');
  })

  it('displays text "Digite a senha." when click button and field "Senha" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('Senha').parent().find('[class*=error]').should('have.text', 'Digite a senha.');
  })

  it('displays text "Digite novamente a senha." when click button and field "Repita Senha" is empty', () => {
    cy.get("button").click()
    cy.findByPlaceholderText('Repita Senha').parent().find('[class*=error]').should('have.text', 'Digite novamente a senha.');
  })

  it('displays text "Digite um email válido." when click button and field "E-mail" is populated with an invalid email', () => {
    cy.findByPlaceholderText('E-mail').type('test');
    cy.get("button").click()
    cy.findByPlaceholderText('E-mail').parent().find('[class*=error]').should('have.text', 'Digite um email válido.');
  })

  it('displays text "Número de telefone inválido!" when click button and field "Telefone" is populated with an invalid phoneNumber', () => {
    cy.findByPlaceholderText('Telefone').type('89347', {force: true});
    cy.get("button").click()
    cy.findByPlaceholderText('Telefone').parent().find('[class*=error]').should('have.text', 'Número de telefone inválido!');
  })

  it('not displays text when click button and field "Telefone" is populated with a valid phoneNumber', () => {
    cy.findByPlaceholderText('Telefone').type('99999999999', {force: true});
    cy.get("button").click()
    cy.findByPlaceholderText('Telefone').parent().find('[class*=error]').should('have.text', '');
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

  it('not displays text  when click button and field "Repita Senha" is populated', () => {
    cy.findByPlaceholderText('Repita Senha').type('1234', {force: true})
    cy.get("button").click()
    cy.findByPlaceholderText('Repita Senha').parent().find('[class*=error]').should('have.text', '');
  })

  it('displays text "as senhas digitadas são diferentes." when click button and field "Senha" and "Repita Senha" are populated with values differents', () => {
    cy.findByPlaceholderText('Senha').type('8934', {force: true});
    cy.findByPlaceholderText('Repita Senha').type('89347', {force: true});
    cy.get("button").click()
    cy.findByPlaceholderText('Repita Senha').parent().find('[class*=error]').should('have.text', 'as senhas digitadas são diferentes.');
  })

});


describe('Testing Visuals <FormCreateUser />', () => {

  it('form clear', () => {
    cy.get('body').compareSnapshot('formCreateUser_clear', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formCreateUser_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are populated invalidly', () => {
    cy.findByPlaceholderText('Telefone').type('999999999', {force: true});
    cy.findByPlaceholderText('E-mail').type('emailemail.m', {force: true});
    cy.findByPlaceholderText('Senha').type('8934', {force: true});
    cy.findByPlaceholderText('Repita Senha').type('89347', {force: true});
    cy.get("button").click()
    cy.get('body').compareSnapshot('formCreateUser_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

});