import React from 'react'
import { ListTournamentsContainer } from 'pages/PostLogged/ListTournaments/ListTournamentsContainer'
import { BrowserRouter } from 'react-router-dom'
import './main.css'

describe('<ListTournamentsContainer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<div className='main'><BrowserRouter><ListTournamentsContainer /></BrowserRouter></div>)
  })
})