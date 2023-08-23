import React from 'react'
import { Header } from 'components/PreLoggedin/LayoutPage/Header/Header'
import './main.css';

describe('Test Visuals <Header />', () => {

  beforeEach(() => {
    cy.mount(<div className='main'><Header><div></div></Header></div>)
  })

  it('blue block is curved at the ends downwards', () => {
    cy.get('[class*=wrapper]').compareSnapshot('headerPreLogged_nochildren', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })
})