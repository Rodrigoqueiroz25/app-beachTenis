import React from 'react'
import { PostLogged } from 'components/PostLogged';
import './main.css'


function submit(data: any) {
  expect(data.name).to.eq('nome')
  expect(data.otherInformation).to.eq('outras informações')
}

beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.FormTournamentSponsor submit={submit} /></div>)
})

describe('Testing Funcional <FormTournamentSponsor />', () => {
  it('renders', () => {
    
  });

  it('has a field with placeholder "Nome"', () => {
    cy.findByPlaceholderText('Nome').should('be.visible')
  });

  it('has a component with name "AddBanner"', () => {
    cy.get('[class*=AddBanner]').should('be.visible')
  });

  it('has a field with placeholder "Outras informações"', () => {
    cy.findByPlaceholderText('Outras informações').should('be.visible')
  });

  it('has a button', () => {
    cy.get('button').should('be.visible')
  });


  it('field with placeholder "Nome" is a input type text', () => {
    cy.findByPlaceholderText('Nome').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Nome').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Outras informações" is the textarea', () => {
    cy.findByPlaceholderText('Outras informações').invoke('prop', 'tagName').should('eq', 'TEXTAREA')
  });


  it('values entered in fields are not changed when submitted', () => {
    cy.findByPlaceholderText('Nome').type('nome');
    cy.findByPlaceholderText('Outras informações').type('outras informações');
    cy.findByText('Salvar').click();
  });

  
  it('button has a text "Salvar" when prop form defaultValues is empty', () => {
    cy.get('button').should('have.text', 'Salvar')
  });

  
});

describe('Testing Validations <FormTournamentSponsor>', () => {

  it('displays text "Digite um nome." when click button "Salvar" and field "Nome" is empty', () => {
    cy.findByText("Salvar").click()
    cy.findByText("Digite um nome.").should('be.visible')
  })

  it('not displays text when click button "Salvar" and field "Nome" not is empty', () => {
    cy.findByPlaceholderText('Nome').type('nome');
    cy.findByPlaceholderText('Outras informações').type('outras informações');
    cy.findByText("Salvar").click()
    cy.findByPlaceholderText('Nome').parent().parent().find('[class*=error]').should('have.text', '');
  })

});


describe('Testing with defaultValues <FormTournamentSponsor>', () => {

  beforeEach(() => {
    cy.mount(<div className='main'><PostLogged.FormTournamentSponsor submit={(data) => submit(data)} defaultValues={{
      name: "nome patrocinador",
      otherInformation: "patrocinador de beachtenis",
    }}/></div>)
  });

  it('values passed by the default values prop are displayed in the fields', () => {
    cy.findByPlaceholderText('Nome').should('have.value', 'nome patrocinador')
    cy.findByPlaceholderText('Outras informações').should('have.value', 'patrocinador de beachtenis')
  })

  it('the button text must be "Alterar"', () => {
    cy.get('button').should('have.text', 'Alterar')
  })

});

describe('Testing Visuals <FormTournamentSponsor />', () => {

  it('visual form is ok', () => {
    cy.get('body').compareSnapshot('formTournamentSponsor', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formTournamentSponsor_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

});