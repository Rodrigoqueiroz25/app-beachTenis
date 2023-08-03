import React from 'react'
import { PostLogged } from 'components/PostLogged';

function submit(data: any) {
  expect(data.description).to.eq('Dupla Masculina A')
  expect(data.numberAthletes).to.eq('233')
  expect(data.numberAthletesRegistration).to.eq('2')
}

describe('Testing Funcional <FormCategory />', () => {
  it('renders', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
  });

  it('has a field with placeholder "Descrição"', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.findByPlaceholderText('Descrição').should('be.visible')
  });

  it('has a combobox with placeholder "Quantidade de pessoas por inscrição"', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').should('be.visible')
  });

  it('has a field with placeholder "Quantidade máxima de inscritos"', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.findByPlaceholderText('Quantidade máxima de inscritos').should('be.visible')
  });

  it('has a button visible', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.get('button').should('be.visible')
  });
  
  
  it('field with placeholder "Descrição" is a input type text', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.findByPlaceholderText('Descrição').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Descrição').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Quantidade de pessoas por inscrição" is a select', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').invoke('prop', 'tagName').should('eq', 'SELECT')
  });

  it('field with placeholder "Quantidade máxima de inscritos" is a input type number ', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.findByPlaceholderText('Quantidade máxima de inscritos').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Quantidade máxima de inscritos').invoke('attr', 'type').should('eq', 'number')
  });


  it('field with placeholder "Quantidade de pessoas por inscrição" has a options ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.get('select').select(1, {force: true}).select(2, {force: true}).select(3, {force: true}).select(4, {force: true}).select(5, {force: true})
    .select(6, {force: true}).select(7, {force: true}).select(8, {force: true}).select(9, {force: true}).select(10, {force: true})
  });


  it('field with placeholder "Quantidade de pessoas por inscrição" have the option values ​​the same as their name', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.get('select').select(1, {force: true}).invoke('prop', 'value').should('eq', '1');
    cy.get('select').select(2, {force: true}).invoke('prop', 'value').should('eq', '2');
    cy.get('select').select(3, {force: true}).invoke('prop', 'value').should('eq', '3');
    cy.get('select').select(4, {force: true}).invoke('prop', 'value').should('eq', '4');
    cy.get('select').select(5, {force: true}).invoke('prop', 'value').should('eq', '5');
    cy.get('select').select(6, {force: true}).invoke('prop', 'value').should('eq', '6');
    cy.get('select').select(7, {force: true}).invoke('prop', 'value').should('eq', '7');
    cy.get('select').select(8, {force: true}).invoke('prop', 'value').should('eq', '8');
    cy.get('select').select(9, {force: true}).invoke('prop', 'value').should('eq', '9');
    cy.get('select').select(10, {force: true}).invoke('prop', 'value').should('eq', '10');
  });

  it('button has a text "Adicionar" when prop form defaultValues is empty', () => {
    cy.mount(<PostLogged.FormCategory submit={() => ''} />)
    cy.get('button').should('have.text', 'Adicionar')
  });

  it('fields are cleared when submit form', () => {
    cy.mount(<PostLogged.FormCategory submit={(data:any) => data} />)
    cy.findByPlaceholderText('Descrição').type('hello description')
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(1, {force: true})
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('50', {force: true})
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText('Descrição').should('have.value', '')
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').should('have.value', '')
    cy.findByPlaceholderText('Quantidade máxima de inscritos').should('have.value', '')
  });

  it('values entered in fields are not changed when submitted', () => {
    cy.mount(<PostLogged.FormCategory submit={(data) => submit(data)} />)
    cy.findByPlaceholderText('Descrição').type('Dupla Masculina A', {force: true});
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(2, {force: true})
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('233', {force: true})
    cy.findByText('Adicionar').click();
  });
  
});

describe('Testing Validations <FormCategory>', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.FormCategory submit={(data:any) => data} />)
  });

  it('displays text "Digite uma descrição" when click add and field "Descrição" is empty', () => {
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(1, {force: true})
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('50', {force: true})
    cy.findByText("Adicionar").click()
    cy.findByText("Digite uma descrição").should('be.visible')
  })

  it('displays text "selecione uma opção" when click add and field "Quantidade de pessoas por inscrição" is empty', () => {
    cy.findByPlaceholderText('Descrição').type('hello description')
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('50', {force: true})
    cy.findByText("Adicionar").click()
    cy.findByText("selecione uma opção").should('be.visible')
  })

  it('displays text "digite um valor" when click add and field "Quantidade máxima de inscritos" is empty', () => {
    cy.findByPlaceholderText('Descrição').type('hello description')
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(1, {force: true})
    cy.findByText("Adicionar").click()
    cy.findByText("digite um valor").should('be.visible')
  })

});


describe('Testing with defaultValues <FormCategory>', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.FormCategory submit={(data) => submit(data)} defaultValues={{
      description: "Dupla Masculina A",
      numberAthletes: "233",
      numberAthletesRegistration: "2",
      tournamentId: 1
    }}/>)
  });

  it('values passed by the default values prop are displayed in the fields', () => {
    cy.findByPlaceholderText('Descrição').should('have.value', 'Dupla Masculina A')
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').should('have.value', '2')
    cy.findByPlaceholderText('Quantidade máxima de inscritos').should('have.value', '233')
  })

  it('the button text must be "Alterar"', () => {
    cy.get('button').should('have.text', 'Alterar')
  })


  it('values entered in fields are not changed when submitted', () => {
    cy.findByText('Alterar').click();
  });

});