import React from 'react'
import { PostLogged } from 'components/PostLogged';
import './main.css'
import { Category } from 'models/Category';

function submit(data: any) {
  expect(data.description).to.eq('Dupla Masculina A')
  expect(data.numberAthletes).to.eq('233')
  expect(data.numberAthletesRegistration).to.eq('2')
}


beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.FormCategory submit={(data) => submit(data)} /></div>)
})


describe('Testing Funcional <FormCategory />', () => {
  it('renders', () => {
    
  });

  it('has a field with placeholder "Descrição"', () => {
    cy.findByPlaceholderText('Descrição').should('be.visible')
  });

  it('has a combobox with placeholder "Quantidade de pessoas por inscrição"', () => { 
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').should('be.visible')
  });

  it('has a field with placeholder "Quantidade máxima de inscritos"', () => {   
    cy.findByPlaceholderText('Quantidade máxima de inscritos').should('be.visible')
  });

  it('has a button visible', () => {   
    cy.get('button').should('be.visible')
  });
  
  
  it('field with placeholder "Descrição" is a input type text', () => {
    cy.findByPlaceholderText('Descrição').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Descrição').invoke('attr', 'type').should('eq', 'text')
  });

  it('field with placeholder "Quantidade de pessoas por inscrição" is a select', () => {
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').invoke('prop', 'tagName').should('eq', 'SELECT')
  });

  it('field with placeholder "Quantidade máxima de inscritos" is a input type number ', () => {
    cy.findByPlaceholderText('Quantidade máxima de inscritos').invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText('Quantidade máxima de inscritos').invoke('attr', 'type').should('eq', 'number')
  });


  it('field with placeholder "Quantidade de pessoas por inscrição" has a options ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
    cy.get('select').select(1, {force: true}).select(2, {force: true}).select(3, {force: true}).select(4, {force: true}).select(5, {force: true})
    .select(6, {force: true}).select(7, {force: true}).select(8, {force: true}).select(9, {force: true}).select(10, {force: true})
  });


  it('field with placeholder "Quantidade de pessoas por inscrição" have the option values ​​the same as their name', () => {
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
    
    cy.get('button').should('have.text', 'Adicionar')
  });

  it('fields are cleared when submit form', () => {
    
    cy.findByPlaceholderText('Descrição').type('hello description')
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(1, {force: true})
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('50', {force: true})
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText('Descrição').should('have.value', '')
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').should('have.value', '')
    cy.findByPlaceholderText('Quantidade máxima de inscritos').should('have.value', '')
  });

  it('values entered in fields are not changed when submitted', () => {
    
    cy.findByPlaceholderText('Descrição').type('Dupla Masculina A', {force: true});
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(2, {force: true})
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('233', {force: true})
    cy.findByText('Adicionar').click();
  });
  
});

describe('Testing Validations <FormCategory>', () => {

  it('displays text "Digite uma descrição." when click add and field "Descrição" is empty', () => {
    cy.findByText("Adicionar").click()
    cy.findByText("Digite uma descrição.").should('be.visible')
  })

  it('displays text "Selecione uma opção." when click add and field "Quantidade de pessoas por inscrição" is empty', () => {
    cy.findByText("Adicionar").click()
    cy.findByText("Selecione uma opção.").should('be.visible')
  })

  it('displays text "Digite um valor." when click add and field "Quantidade máxima de inscritos" is empty', () => {
    cy.findByText("Adicionar").click()
    cy.findByText("Digite um valor.").should('be.visible')
  })

  it('not displays text when click add and field "Descrição" not is empty', () => {
    cy.findByPlaceholderText('Descrição').type('Dupla Masculina A', {force: true});
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText('Descrição').parent().parent().find('[class*=error]').should('have.text', '');
  })

  it('not displays text when click add and field "Quantidade de pessoas por inscrição" not is empty', () => {
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').select(2, {force: true})
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText('Quantidade de pessoas por inscrição').parent().parent().find('[class*=error]').should('have.text', '');
  })

  it('not displays text when click add and field "Quantidade máxima de inscritos" not is empty', () => {
    cy.findByPlaceholderText('Quantidade máxima de inscritos').type('233', {force: true})
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText('Quantidade máxima de inscritos').parent().parent().find('[class*=error]').should('have.text', '');
  })

});


describe('Testing with defaultValues <FormCategory>', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.FormCategory submit={(data) => submit(data)} defaultValues={new Category({
      id: 1,
      description: "Dupla Masculina A",
      numberAthletes: '233',
      numberAthletesRegistration: '2',
      tournamentId: 1,
      numberRegistration: 0
    })}/>)
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

describe('Testing Visuals <FormCategory />', () => {

  it('visual form is ok', () => {
    cy.get('body').compareSnapshot('formCategory', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

  it('displays text msgError when click button and fields are empty', () => {
    cy.get("button").click()
    cy.get('body').compareSnapshot('formCategory_msgsvalidations', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

});