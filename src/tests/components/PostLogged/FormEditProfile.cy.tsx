import React from 'react'

import './main.css'
import { City } from 'models/City'
import { FieldsUpdateUserAccount } from 'models/UserAccount'
import { FormEditProfile } from 'components/PostLogged/FormEditProfile/FormEditProfile'

function submit(data: any) {
  expect(data.name).to.eq('nome')
  expect(data.email).to.eq('email@email.com')
  expect(data.phoneNumber).to.eq('(88)88888-8888')
  expect(data.cityId).to.eq('5423')
  expect(data.dateBirthday).to.eq('01/01/2000')
  expect(data.gender).to.eq('M')
}

const arrayCities: City[] = [
  { id: 5423, areaM2: "18.566", codeIbge: 245030, stateCode: 22, name: "indaiá", gentilic: "indiano" },
  { id: 69, areaM2: "503.069", codeIbge: 270430, stateCode: 2, name: "Maceió", gentilic: "maceioense" }
];

beforeEach(() => {
  cy.mount(<div className='main'><FormEditProfile submit={submit} cities={arrayCities.map((city) => (
    { name: city.name, value: city.id }
  ))} defaultValues={{} as FieldsUpdateUserAccount} /></div>)
})


describe('<FormEditProfile />', () => {

  it('renders', () => {
  })


  it('has a field with placeholder "Nome"', () => {
    cy.findByPlaceholderText('Nome').should('be.visible')
  });

  it('has a field with placeholder "E-mail"', () => {
    cy.findByPlaceholderText('E-mail').should('be.visible')
  });

  it('has a field with placeholder "Telefone"', () => {
    cy.findByPlaceholderText('Telefone').should('be.visible')
  });

  it('has a field with placeholder "Cidade"', () => {
    cy.findByPlaceholderText('Cidade').should('be.visible')
  });

  it('has a field with placeholder "Data de Nascimento"', () => {
    cy.findByPlaceholderText('Data de Nascimento').should('be.visible')
  });

  it('has a radioButton group with label "Gênero" and two options with label "Masculino" and "Feminino"', () => {
    cy.findByText('Gênero').should('be.visible')
    cy.findByLabelText('Masculino').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByLabelText('Masculino').invoke('attr', 'type').should('eq', 'radio')
    cy.findByLabelText('Feminino').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByLabelText('Feminino').invoke('attr', 'type').should('eq', 'radio')
  });

  it('has a button visible', () => {   
    cy.get('button').should('be.visible')
  });

  it('button has a text "Salvar"', () => {
    cy.get('button').should('have.text', 'Salvar')
  });

  it('field with placeholder "Nome" is a input type text', () => {
    cy.findByPlaceholderText('Nome').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Nome').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "E-mail" is a input type text', () => {
    cy.findByPlaceholderText('E-mail').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('E-mail').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Telefone" is a input type text', () => {
    cy.findByPlaceholderText('Telefone').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Telefone').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Cidade" is a select', () => {
    cy.findByPlaceholderText('Cidade').invoke('prop', 'tagName').should('eq', 'SELECT')
  });

  it('field with placeholder "Cidade" is a select with option "Selecione..." how option standard', () => {
    cy.get('select option:checked').should('have.text', 'Selecione...')
  });

  it('field with placeholder "Data de Nascimento" is a input type date', () => {
    cy.findByPlaceholderText('Data de Nascimento').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Data de Nascimento').invoke('attr', 'type').should('eq', 'date')
  });

  it('values entered in fields are not changed when submitted', () => {  
    cy.findByPlaceholderText('Nome').type('nome', {force: true});
    cy.findByPlaceholderText('E-mail').type('email@email.com', {force: true})
    cy.findByPlaceholderText('Telefone').type('(88)88888-8888', {force: true})
    cy.findAllByPlaceholderText('Cidade').select(arrayCities[0].name)
    cy.findAllByPlaceholderText('Data de Nascimento').type('2000-01-01')
    cy.findByLabelText('Masculino').check();
    cy.findByText('Salvar').click();
  });

})

describe('Testing Validations <FormEditProfile />', () => {

  it('displays text "Digite um nome." when click button "Salvar" and field "Nome" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByText('Digite um nome.').should('be.visible')
  });

  it('displays text "Digite um email para entrar." when click button "Salvar" and field "E-mail" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByText('Digite um email para entrar.').should('be.visible')
  });

  it('displays text "Digite um email válido." when click button "Salvar" and field "E-mail" is populated with value invalid', () => {
    cy.findByPlaceholderText('E-mail').type('email')
    cy.findByText('Salvar').click();
    cy.findByText('Digite um email válido.').should('be.visible')
  });

  it('displays text "Digite um número de telefone." when click button "Salvar" and field "Telefone" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByText('Digite um número de telefone.').should('be.visible')
  });

  it('displays text "Número de telefone inválido!" when click button "Salvar" and field "Telefone" is populated with value invalid', () => {
    cy.findByPlaceholderText('Telefone').type('12345')
    cy.findByText('Salvar').click();
    cy.findByText('Número de telefone inválido!').should('be.visible')
  });


  it('displays text "Selecione uma opção." when click button "Salvar" and field "Cidade" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByText('Selecione uma opção.').should('be.visible');
  });

  it('displays text "Digite uma data." when click button "Salvar" and field "Data de Nascimento" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByText('Digite uma data.').should('be.visible');
  });

  it('displays text "Selecione um gênero." when click button "Salvar" and radioButton group "Gênero" is empty', () => {
    cy.findByText('Salvar').click();
    cy.findByText('Selecione um gênero.').should('be.visible');
  });

})

describe('Testing Validations <FormEditProfile />', () => {

  beforeEach(() => {
    cy.mount(<div className='main'><FormEditProfile submit={submit} cities={arrayCities.map((city) => (
      { name: city.name, value: city.id }))}
      defaultValues={{
        name: 'nome',
        email: 'email@email.com',
        phoneNumber: '(88)88888-8888',
        cityId: 5423,
        dateBirthday: '01/01/2000',
        gender: 'M'
      }}
    /></div>)
  })

  it('values passed by the default values prop are displayed in the fields', () => {
    cy.findByPlaceholderText('Nome').should('have.value','nome');
    cy.findByPlaceholderText('E-mail').should('have.value','email@email.com')
    cy.findByPlaceholderText('Telefone').should('have.value','(88)88888-8888')
    cy.findAllByPlaceholderText('Cidade').should('have.value', arrayCities[0].id)
    cy.findAllByPlaceholderText('Data de Nascimento').should('have.value','2000-01-01')
    cy.findByLabelText('Masculino').should('be.checked');
  });

  it('values entered in fields are not changed when submitted', () => {
    cy.findByText('Salvar').click();
  });

})


describe('Testing Visuals <FormEditProfile />', () => {

  it('visual form is ok', () => {
    cy.get('body').compareSnapshot('formEditProfile', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formEditProfile_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('values passed by the default values prop are displayed in the fields', () => {
    cy.mount(<div className='main'><FormEditProfile submit={submit} cities={arrayCities.map((city) => (
      { name: city.name, value: city.id }))}
      defaultValues={{
        name: 'nome',
        email: 'email@email.com',
        phoneNumber: '(88)88888-8888',
        cityId: 5423,
        dateBirthday: '01/01/2000',
        gender: 'M'
      }}
    /></div>)
    cy.get('body').compareSnapshot('formEditProfile_populated', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

})