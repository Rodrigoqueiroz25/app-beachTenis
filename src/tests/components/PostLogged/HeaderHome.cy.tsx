import React from 'react'
import { HeaderHome } from 'pages/PostLogged/Home/presentation/HeaderHome'
import './main.css'

beforeEach(() => {
  cy.mount(<div className='main'><HeaderHome nameUser='name'/></div>)
})

describe('<HeaderHome />', () => {
  
  it('renders', () => {
  })

  it('displays text "Olá, name" when text "name" is passed by prop nameUser', () => {
    cy.findByText('Olá, name').should('be.visible');
  })  

})

describe('Testing Visuals <HeaderHome />', () => {
  
  it('visual is ok', () => {
    cy.get('body').compareSnapshot('headerHome', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  })

})