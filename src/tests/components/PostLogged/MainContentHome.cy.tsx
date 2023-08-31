import React from 'react'
import { MainContentHome } from 'pages/PostLogged/Home/presentation/MainContentHome'
import './main.css';
import { ICity } from 'interfaces/ICity';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import { convertDateAmericanToString, convertDateBrazilToString, dateDayActual, dateFollowingDay } from 'helper/convertData';
import { BrowserRouter } from 'react-router-dom';

const arrayCities: ICity[] = [
  { id: '5423', area: "18.566", codeIbge: 245030, stateId: 22, name: "indaiá", gentilic: "indiano" },
  { id: '69', area: "503.069", codeIbge: 270430, stateId: 2, name: "Maceió", gentilic: "maceioense" }
];

const arrayTournaments: ITournamentDataGetResponse[] = [
  {
    id: 1,
    description: 'description',
    organization: 'organization',
    cityId: arrayCities[0].id,
    sportId: '1',
    dtStartRegistration: convertDateBrazilToString(dateDayActual()),
    dtFinalRegistration: convertDateBrazilToString(dateDayActual()),
    dtStartTournament: convertDateBrazilToString(dateFollowingDay()),
    dtFinalTournament: convertDateBrazilToString(dateFollowingDay()),
    dtStartRegistrationFormatted: "",
    dtFinalRegistrationFormatted: "",
    dtFinalTournamentFormatted: "",
    dtStartTournamentFormatted: "",
    otherInformation: "outras informações"
  }
]


beforeEach(() => {
  cy.mount(<div className='main'><BrowserRouter><MainContentHome cities={arrayCities} tournaments={arrayTournaments} /></BrowserRouter></div>)
})


describe('<MainContentHome />', () => {

  it('renders', () => {
  })

  it('there is a field of type select with the options [indaiá, Maceió] passed in prop cities', () => {
    cy.findByPlaceholderText('localização').invoke('prop', 'tagName').should('eq', 'SELECT');
    cy.findByPlaceholderText('localização').should('have.text', 'indaiáMaceió')
  })
  
  it('has a button with text "Beach Tênis"', () => {
    cy.findByText('Beach Tênis').invoke('prop', 'tagName').should('eq', 'BUTTON');
  })

  it('has a button with text "Hockey"', () => {
    cy.findByText('Hockey').invoke('prop', 'tagName').should('eq', 'BUTTON');
  })

  it('has a button with text "Tênis"', () => {
    cy.findByText('Tênis').invoke('prop', 'tagName').should('eq', 'BUTTON');
  })

  it('has a text "Torneios"', () => {
    cy.findByText('Torneios').should('be.visible');
  })

  it('has a text "Ver todos" next to text "Torneios"', () => {
    cy.findByText('Torneios').next().should('have.text', 'Ver todos');
  })

  it('has a text "Ranking"', () => {
    cy.findByText('Ranking').should('be.visible');
  })

  it('has a text "Ver todos" next to text "Torneios"', () => {
    cy.findByText('Ranking').next().should('have.text', 'Ver todos');
  })

  it('has a button with text "Inscrição" when a tournament is passed by prop tournaments', () => {
    cy.findByText('Inscrição').invoke('prop', 'tagName').should('eq', 'BUTTON');
  })

  it('has a text with period of tournament when a tournament is passed by prop tournaments', () => {
    cy.findByText(`${convertDateBrazilToString(dateFollowingDay())} à ${convertDateBrazilToString(dateFollowingDay())}`).should('be.visible')
  })

  it('has a text "organization"  when a tournament is passed by prop tournaments', () => {
    cy.findByText('organization').should('be.visible')
  })

  it('has a text "description"  when a tournament is passed by prop tournaments', () => {
    cy.findByText('description').should('be.visible')
  })

  it('has a text "Fee: Free"  when a tournament is passed by prop tournaments', () => {
    cy.findByText('Fee: Free').should('be.visible')
  })

  it('has a text "3.2 km"  when a tournament is passed by prop tournaments', () => {
    cy.findByText('3.2 km').should('be.visible')
  })
  
  it('redirect to url "/tournaments/1" to click in button "Inscrição" when a tournament is passed by prop tournaments', () => {
    cy.findByText('Inscrição').click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/tournament\/1)/g)
  })
  
  it('redirect to url "/list-tournaments" to click in text "Ver todos" next text "Torneios" when a tournament is passed by prop tournaments', () => {
    cy.findByText('Torneios').next().click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/list-tournaments)/g)
  })
  

})

describe('Test Visuals <MainContentHOme />', () => {

  it('when not tournaments passed by prop tournaments', () => {
    cy.mount(<div className='main'><BrowserRouter><MainContentHome cities={arrayCities} tournaments={[]} /></BrowserRouter></div>)
    cy.get('body').compareSnapshot('mainContentHome_noTournaments', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  })

  it('when one tournaments passed by prop tournaments', () => {
    cy.get('body').compareSnapshot('mainContentHome_oneTournaments', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  })

  it('when two tournaments passed by prop tournaments', () => {
    cy.mount(<div className='main'><BrowserRouter><MainContentHome cities={arrayCities} tournaments={[...arrayTournaments, ...arrayTournaments]} /></BrowserRouter></div>)
    cy.get('body').compareSnapshot('mainContentHome_twoTournaments', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  })
})