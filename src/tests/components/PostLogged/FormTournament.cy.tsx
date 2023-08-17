import { PostLogged } from 'components/PostLogged'
import { ICity } from 'interfaces/ICity'
import { ISport } from 'interfaces/ISport'

let dateAtual = dateDayActual();

function submit(data: any) {
  expect(data.description).to.eq('torneio')
  expect(data.organization).to.eq('org s.a.')
  expect(data.cityId).to.eq('5423')
  expect(data.sportId).to.eq('1')
  expect(data.dtStartRegistration).to.eq(convertDataBrazil(dateAtual))
  expect(data.dtFinalRegistration).to.eq(convertDataBrazil(dateAtual))
  expect(data.dtStartTournament).to.eq(convertDataBrazil(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)))
  expect(data.dtFinalTournament).to.eq(convertDataBrazil(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)))
}

const descricao = "Descrição";
const organization = "Organização";
const sport = "Esporte";
const sportId = "sportId";
const city = "Cidade";
const cityId = "cityId";
const dtStart = "Data Inicial";
const dtFinal = "Data Final";
const otherInformations = "Outras informações";
const btnAdd = "Adicionar";
const btnUpdate = "Alterar";
const dtStartRegistration = "dtStartRegistration";
const dtFinalRegistration = "dtFinalRegistration";
const dtStartTournament = "dtStartTournament";
const dtFinalTournament = "dtFinalTournament";
const dataInicial = 'Data Inicial';
const dataFinal = 'Data Final';

const arrayCities: ICity[] = [
  { id: 5423, area: "18.566", codeIbge: 245030, stateId: 22, name: "indaiá", gentilic: "indiano" },
  { id: 69, area: "503.069", codeIbge: 270430, stateId: 2, name: "Maceió", gentilic: "maceioense" }
];

const arraySports: ISport[] = [
  { description: 'beachtenis', id: 1 },
  { description: 'tenis', id: 2 }
];

function dateDayActual(): Date {
  let t = new Date();
  t.setHours(0, 0, 0, 0);
  t.setDate(t.getDate());
  return t;
}

function convertDataAmerican(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1) <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`;
}

function convertDataBrazil(date: Date): string {
  return `${date.getDate()}/${(date.getMonth() + 1) <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear()}`;
}

describe('Testing Funcional <FormTournament />', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.FormTournament
      cities={arrayCities}
      sports={arraySports}
      submit={submit}
    />
    )
  })

  it('renders', () => {

  });

  it(`has a field with placeholder "${descricao}"`, () => {
    cy.findByPlaceholderText(`${descricao}`).should('be.visible')
  });

  it(`has a field with placeholder "${organization}"`, () => {
    cy.findByPlaceholderText(`${organization}`).should('be.visible')
  });

  it(`has a field with placeholder "${sport}"`, () => {
    cy.findByPlaceholderText(`${sport}`).should('be.visible')
  });

  it(`has a field with placeholder "${city}"`, () => {
    cy.findByPlaceholderText(`${city}`).should('be.visible')
  });

  it(`has a field with placeholder "${otherInformations}"`, () => {
    cy.findByPlaceholderText(`${otherInformations}`).should('be.visible')
  });

  it(`has a field with name "${dtStartRegistration}"`, () => {
    cy.get(`[name=${dtStartRegistration}]`).should('be.visible');
  });

  it(`field with name "${dtStartRegistration}" has a placeholder "${dtStart}"`, () => {
    cy.get(`[name=${dtStartRegistration}]`).invoke('attr', 'placeholder').should('eq', `${dtStart}`);
  });

  it(`has a field with name "${dtFinalRegistration}"`, () => {
    cy.get(`[name=${dtFinalRegistration}]`).should('be.visible');
  });

  it(`field with name "${dtFinalRegistration}" has a placeholder "${dtFinal}"`, () => {
    cy.get(`[name=${dtFinalRegistration}]`).invoke('attr', 'placeholder').should('eq', `${dtFinal}`);
  });

  it(`has a field with name "${dtStartTournament}"`, () => {
    cy.get(`[name=${dtStartTournament}]`).should('be.visible');
  });

  it(`field with name "${dtStartTournament}" has a placeholder "${dtStart}"`, () => {
    cy.get(`[name=${dtStartTournament}]`).invoke('attr', 'placeholder').should('eq', `${dtStart}`);
  });

  it(`has a field with name "${dtFinalTournament}"`, () => {
    cy.get(`[name=${dtFinalTournament}]`).should('be.visible');
  });

  it(`field with name "${dtFinalTournament}" has a placeholder "${dtFinal}"`, () => {
    cy.get(`[name=${dtFinalTournament}]`).invoke('attr', 'placeholder').should('eq', `${dtFinal}`);
  });

  it('has a button visible', () => {
    cy.get('button').should('be.visible')
  });



  it(`field with placeholder "${descricao}" is a input type text`, () => {
    cy.findByPlaceholderText(`${descricao}`).invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText(`${descricao}`).invoke('attr', 'type').should('eq', 'text')
  });

  it(`field with placeholder "${organization}" is a input type text`, () => {
    cy.findByPlaceholderText(`${organization}`).invoke('prop', 'tagName').should('eq', 'INPUT')
    cy.findByPlaceholderText(`${organization}`).invoke('attr', 'type').should('eq', 'text')
  });

  it(`field with placeholder "${sport}" is a select`, () => {
    cy.findByPlaceholderText(`${sport}`).invoke('prop', 'tagName').should('eq', 'SELECT')
  });

  it(`field with placeholder "${city}" is a select`, () => {
    cy.findByPlaceholderText(`${city}`).invoke('prop', 'tagName').should('eq', 'SELECT')
  });

  it(`field with name "${dtStartRegistration}" is a input type date`, () => {
    cy.get(`[name=${dtStartRegistration}]`).invoke('attr', 'type').should('eq', 'date')
  });

  it(`field with name "${dtFinalRegistration}" is a input type date`, () => {
    cy.get(`[name=${dtFinalRegistration}]`).invoke('attr', 'type').should('eq', 'date')
  });

  it(`field with name "${dtStartTournament}" is a input type date`, () => {
    cy.get(`[name=${dtStartTournament}]`).invoke('attr', 'type').should('eq', 'date')
  });


  it(`field with name "${dtFinalTournament}" is a input type date`, () => {
    cy.get(`[name=${dtFinalTournament}]`).invoke('attr', 'type').should('eq', 'date')
  });


  it(`the field with placeholder "${sport}" has the options [beachtenis, tenis] that were passed by prop`, () => {
    cy.findByPlaceholderText(`${sport}`).select('beachtenis', { force: true }).select('tenis', { force: true })
  });

  it(`the field with placeholder "${city}" has the options [indaiá, Maceió] that were passed by prop`, () => {
    cy.findByPlaceholderText(`${city}`).select('indaiá', { force: true }).select('Maceió', { force: true })
  });

  it(`the field with placeholder "${sport}" with the options [beachtenis, tenis] that were passed by prop has the values [1,2] respectively`, () => {
    cy.findByPlaceholderText(`${sport}`).select('beachtenis', { force: true }).invoke('prop', 'value').should('eq', '1')
    cy.findByPlaceholderText(`${sport}`).select('tenis', { force: true }).invoke('prop', 'value').should('eq', '2')
  });

  it(`the field with placeholder "${city}" has the options [indaiá, Maceió] that were passed by prop has the values [4709, 69] respectively`, () => {
    cy.findByPlaceholderText(`${city}`).select('indaiá', { force: true }).invoke('prop', 'value').should('eq', '5423')
    cy.findByPlaceholderText(`${city}`).select('Maceió', { force: true }).invoke('prop', 'value').should('eq', '69')
  });

  it(`button has a text "${btnAdd}" when prop form defaultValues is empty`, () => {
    cy.get('button').should('have.text', `${btnAdd}`)
  });


  it('values entered in fields are not changed when submitted', () => {
    cy.findByPlaceholderText(descricao).type('torneio');
    cy.findByPlaceholderText(organization).type('org s.a.');
    cy.findByPlaceholderText(sport).select(arraySports[0].description);
    cy.findByPlaceholderText(city).select(arrayCities[0].name);
    cy.get(`[name=${dtStartRegistration}]`).type(convertDataAmerican(dateAtual));
    cy.get(`[name=${dtFinalRegistration}]`).type(convertDataAmerican(dateAtual));
    cy.get(`[name=${dtStartTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)));
    cy.get(`[name=${dtFinalTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)));
    cy.findByPlaceholderText(otherInformations).type('outher');
    cy.get('button').click();
  });

});

describe('Testing Validations <FormTournament>', () => {


  beforeEach(() => {
    cy.mount(<PostLogged.FormTournament
      cities={arrayCities}
      sports={arraySports}
      submit={() => ''}
    />
    )
  });

  it(`displays text "Digite uma descrição." when click button and field with placeholder "${descricao}" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText(descricao).parent().parent().findByText("Digite uma descrição.").should('be.visible')
  })

  it(`displays text "Digite o nome da organização." when click button and field with placeholder "${organization}" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText(organization).parent().parent().findByText("Digite o nome da organização.").should('be.visible')
  })

  it(`displays text "Selecione uma opção." when click button and field with placeholder "${sport}" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.get(`[name=${sportId}]`).parent().parent().findByText('Selecione uma opção.').should('be.visible')
  })

  it(`displays text "Selecione uma opção." when click button and field with placeholder "${city}" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.get(`[name=${cityId}]`).parent().parent().findByText('Selecione uma opção.').should('be.visible')
  })

  it(`displays text "Digite uma data." when click button and field with placeholder "${dataInicial}" after paragraph with text "Período de Inscrições" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtStartRegistration}]`).parent().parent().findByText('Digite uma data.').should('be.visible')
  })

  it(`displays text "Digite uma data." when click button and field with placeholder "${dataFinal}" after paragraph with text "Período de Inscrições" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtFinalRegistration}]`).parent().parent().findByText('Digite uma data.').should('be.visible')
  })

  it(`displays text "Digite uma data." when click button and field with placeholder "${dataInicial}" after paragraph with text "Período do Torneio" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtStartTournament}]`).parent().parent().findByText('Digite uma data.').should('be.visible')
  })

  it(`displays text "Digite uma data." when click button and field with placeholder "${dataFinal}" after paragraph with text "Período do Torneio" is empty`, () => {
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtFinalTournament}]`).parent().parent().findByText('Digite uma data.').should('be.visible')
  })


  //
  it(`not displays text when click button and field with placeholder "${descricao}" not is empty`, () => {
    cy.findByPlaceholderText(descricao).type('test');
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText(descricao).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${organization}" not is empty`, () => {
    cy.findByPlaceholderText(organization).type('test');
    cy.findByText("Adicionar").click()
    cy.findByPlaceholderText(organization).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${sport}" not is empty`, () => {
    cy.findByPlaceholderText(sport).select(1);
    cy.findByText("Adicionar").click()
    cy.get(`[name=${sportId}]`).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${city}" not is empty`, () => {
    cy.findByPlaceholderText(city).select(arrayCities[0].name);
    cy.findByText("Adicionar").click()
    cy.get(`[name=${cityId}]`).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${dataInicial}" after paragraph with text "Período de Inscrições" not is empty and has correct value`, () => {
    cy.get(`[name=${dtStartRegistration}]`).type(convertDataAmerican(dateDayActual()))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtStartRegistration}]`).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${dataFinal}" after paragraph with text "Período de Inscrições" not is empty and has correct value`, () => {
    cy.get(`[name=${dtStartRegistration}]`).type(convertDataAmerican(dateDayActual()))
    cy.get(`[name=${dtFinalRegistration}]`).type(convertDataAmerican(dateDayActual()))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtFinalRegistration}]`).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${dataInicial}" after paragraph with text "Período do Torneio" not is empty and has correct value`, () => {
    let dateAtual = dateDayActual();
    cy.get(`[name=${dtFinalRegistration}]`).type(convertDataAmerican(dateAtual))
    cy.get(`[name=${dtStartTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtStartTournament}]`).parent().parent().find('[class*=error]').should('have.text', '');
  })

  it(`not displays text when click button and field with placeholder "${dataFinal}" after paragraph with text "Período do Torneio" not is empty and has correct value`, () => {
    let dateAtual = dateDayActual();
    cy.get(`[name=${dtStartTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)))
    cy.get(`[name=${dtFinalTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtFinalTournament}]`).parent().parent().find('[class*=error]').should('have.text', '');
  })


  //
  it(`displays text "Data deve ser igual ou posterior a atual." when click button and field with placeholder "${dataInicial}" after paragraph with text "Período de Inscrições" has date value less than the current one`, () => {
    let dateAtual = dateDayActual();
    cy.get(`[name=${dtStartRegistration}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() - 1}`)))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtStartRegistration}]`).parent().parent().findByText('Data deve ser igual ou posterior a atual.').should('be.visible')
  })

  it(`displays text "Data final de registro deve ser igual ou posterior a inicial." when click button and field with placeholder "${dataFinal}" after paragraph with text "Período de Inscrições" has date value less than start date register`, () => {
    let dateAtual = dateDayActual();
    cy.get(`[name=${dtStartRegistration}]`).type(convertDataAmerican(dateAtual));
    cy.get(`[name=${dtFinalRegistration}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() - 1}`)))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtFinalRegistration}]`).parent().parent().findByText('Data final de registro deve ser igual ou posterior a inicial.').should('be.visible')
  })

  it(`displays text "Data deve ser posterior ao periodo de inscrição." when click button and field with placeholder "${dataInicial}" after paragraph with text "Período do Torneio" has date value less than final date register`, () => {
    let dateAtual = dateDayActual();
    cy.get(`[name=${dtFinalRegistration}]`).type(convertDataAmerican(dateAtual));
    cy.get(`[name=${dtStartTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() - 1}`)))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtStartTournament}]`).parent().parent().findByText('Data deve ser posterior ao periodo de inscrição.').should('be.visible')
  })

  it(`displays text "Data final do torneio deve ser igual ou posterior a inicial." when click button and field with placeholder "${dataFinal}" after paragraph with text "Período do Torneio" has date value less than start date tournament`, () => {
    let dateAtual = dateDayActual();
    cy.get(`[name=${dtStartTournament}]`).type(convertDataAmerican(dateAtual));
    cy.get(`[name=${dtFinalTournament}]`).type(convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() - 1}`)))
    cy.findByText("Adicionar").click()
    cy.get(`[name=${dtFinalTournament}]`).parent().parent().findByText("Data final do torneio deve ser igual ou posterior a inicial.").should('be.visible')
  })

});


describe('Testing with defaultValues <FormTournament>', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.FormTournament
      cities={arrayCities}
      sports={arraySports}
      defaultValues={{
        description: 'torneio',
        organization: 'org s.a.',
        cityId: `${arrayCities[0].id}`,
        sportId: '1',
        dtStartRegistration: convertDataAmerican(dateAtual),
        dtFinalRegistration: convertDataAmerican(dateAtual),
        dtStartTournament: convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)),
        dtFinalTournament: convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)),
        otherInformation: 'outher'
      }}
      submit={submit}
    />
    )
  });


  it('values passed by the default values prop are displayed in the fields', () => {
    cy.findByPlaceholderText(descricao).should('have.value', 'torneio');
    cy.findByPlaceholderText(organization).should('have.value', 'org s.a.');
    cy.findByPlaceholderText(sport).should('have.value', arraySports[0].id);
    cy.findByPlaceholderText(sport).should('have.text', `${arraySports[0].description}${arraySports[1].description}`);
    cy.findByPlaceholderText(city).should('have.value', arrayCities[0].id);
    cy.findByPlaceholderText(city).should('have.text', `${arrayCities[0].name}${arrayCities[1].name}`);
    cy.get(`[name=${dtStartRegistration}]`).should('have.value', convertDataAmerican(dateAtual));
    cy.get(`[name=${dtFinalRegistration}]`).should('have.value', convertDataAmerican(dateAtual));
    cy.get(`[name=${dtStartTournament}]`).should('have.value', convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)));
    cy.get(`[name=${dtFinalTournament}]`).should('have.value', convertDataAmerican(new Date(`${dateAtual.getFullYear()}-${dateAtual.getMonth() + 1}-${dateAtual.getDate() + 1}`)));
    cy.findByPlaceholderText(otherInformations).should('have.value', 'outher');

  })

  it('the button text must be "Alterar"', () => {
    cy.get('button').should('have.text', 'Alterar')
  })

  it('the values passed in the fields are not changed in the submission', () => {
    cy.get('button').click();
  })



});


describe('Testing Visuals <FormTournament />', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.FormTournament
      cities={arrayCities}
      sports={arraySports}
      submit={submit}
    />
    )
  })

  it('visual form is ok', () => {
    cy.get('body').compareSnapshot('formTournament', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

});