import React from 'react'

import './main.css';
import { convertDateAmericanToString, dateDayActual } from 'helper/convertData';
// import { convertData } from 'helper/convertData';
import { FormCreateAccountPartOne } from 'pages/PreLogged/SignUp/FormCreateAccountPartOne/FormCreateAccountPartOne';


function submit(data: any) {
  expect(data.firstName).to.eq('teste')
  expect(data.lastName).to.eq('teste')
  expect(data.dateBirthday).to.eq('2000-01-01')
  expect(data.gender).to.eq('male')
}

beforeEach(() => {
  cy.mount(<div className='main'><FormCreateAccountPartOne submit={submit} /></div>)
})


describe('<FormCreateProfile />', () => {

  it('renders', () => {
  });

  it('has a button with text "Carregar Foto"', () => {
    cy.findByText('Carregar Foto').invoke('prop', 'tagName').should('eq', 'BUTTON')
    cy.findByText('Carregar Foto').should('be.visible')
  });

  it('has a field with placeholder "Nome"', () => {
    cy.findByPlaceholderText('Nome').should('be.visible')
  });

  it('has a field with placeholder "Sobrenome"', () => {
    cy.findByPlaceholderText('Sobrenome').should('be.visible')
  });

  it('has a field with label "Data de Nascimento"', () => {
    cy.findByPlaceholderText('Data de Nascimento').should('be.visible');
  });

  it('has a radioButton group with label "Gênero" and two options with label "Masculino" and "Feminino"', () => {
    cy.findByText('Gênero').should('be.visible')
    cy.findByLabelText('Masculino').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByLabelText('Masculino').invoke('attr', 'type').should('eq', 'radio')
    cy.findByLabelText('Feminino').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByLabelText('Feminino').invoke('attr', 'type').should('eq', 'radio')
  });


  it('has a button with text "Salvar"', () => {
    cy.findByText('Salvar').invoke('prop', 'tagName').should('eq', 'BUTTON')
    cy.findByText('Salvar').should('be.visible')
  });

  it('field with placeholder "Nome" is a input type text', () => {
    cy.findByPlaceholderText('Nome').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Nome').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Sobrenome" is a input type text', () => {
    cy.findByPlaceholderText('Sobrenome').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Sobrenome').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Data de Nascimento" is a input type date', () => {
    cy.findByPlaceholderText('Data de Nascimento').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Data de Nascimento').invoke('attr', 'type').should('eq', 'date')
  });

  it('values entered in fields are not changed when submitted', () => {    
    cy.findByPlaceholderText('Nome').type('teste', {force: true})
    cy.findByPlaceholderText('Sobrenome').type('teste', {force: true});
    cy.findByPlaceholderText('Data de Nascimento').type('2000-01-01', {force: true})
    cy.findByLabelText('Masculino').check();
    cy.findByText('Salvar').click();
  });


})

describe('Testing Validations <FormCreateProfile />', () => {

  it('displays text "Digite um nome." when click button "Salvar" and field "Nome" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Nome').parent().find('[class*=error]').should('have.text', 'Digite um nome.');
  });

  it('displays text "Digite um sobrenome." when click button "Salvar" and field "Sobrenome" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Sobrenome').parent().find('[class*=error]').should('have.text', 'Digite um sobrenome.');
  });

  it('displays text "Digite uma data." when click button "Salvar" and field "Data de Nascimento" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Data de Nascimento').parent().find('[class*=error]').should('have.text', 'Digite uma data.');
  });

  it('displays text "O usuário deve ter pelo menos 18 anos." when click button "Salvar" and field "Data de Nascimento" is completed with date of birth less than 18 years old', () => {
    cy.findByPlaceholderText('Data de Nascimento').type(convertDateAmericanToString(dateDayActual()));
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Data de Nascimento').parent().find('[class*=error]').should('have.text', 'O usuário deve ter pelo menos 18 anos.');
  });

  // it('displays text "Selecione uma opção." when click button and radioButton group "Gênero" has no option selected', () => {
  //   cy.findByText('Salvar').click();
  //   cy.findByText('Gênero').parent().find('[class*=error]').should('have.text', 'Selecione uma opção');
  // });

  it('not displays text when click button "Salvar" and field "Nome" is populated with value valid', () => {
    cy.findByPlaceholderText('Nome').type('nome');
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Nome').parent().find('[class*=error]').should('have.text', '');
  });

  it('not displays text when click button "Salvar" and field "Sobrenome" ispopulated with value valid', () => {
    cy.findByPlaceholderText('Sobrenome').type('sobrenome');
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Sobrenome').parent().find('[class*=error]').should('have.text', '');
  });

  it('not displays text when click button "Salvar" and field "Data de Nascimento" is populated with value valid', () => {
    cy.findByPlaceholderText('Data de Nascimento').type(`${dateDayActual().getFullYear()-20}-${dateDayActual().getMonth()+1 < 10 ? `0${dateDayActual().getMonth()+1}` : dateDayActual().getMonth()+1}-${dateDayActual().getDate()}`)
    cy.findByText('Salvar').click();
    cy.findByPlaceholderText('Data de Nascimento').parent().find('[class*=error]').should('have.text', '');
  });


})


describe('Testing Visuals <FormCreateProfile />', () => {

  it('form clear', () => {
    cy.get('body').compareSnapshot('formCreateProfile_clear', { errorThreshold: 0.01, capture: 'fullPage', padding: 10 });
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.findByText('Salvar').click()
    cy.get('body').compareSnapshot('formCreateProfile_msgsvalidations', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  });

  it('fields populateds', () => {
    cy.findByPlaceholderText('Nome').type('teste', { force: true })
    cy.findByPlaceholderText('Sobrenome').type('teste', { force: true });
    cy.findByPlaceholderText('Data de Nascimento').type('2000-01-01', { force: true })
    cy.findByLabelText('Masculino').check();
    cy.get('body').compareSnapshot('formCreateProfile_populated', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  });

})