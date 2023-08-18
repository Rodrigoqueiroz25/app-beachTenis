import React from 'react'
import { Header } from 'components/PreLoggedin/LayoutPage/Header/Header'

describe('Test Visuals <Header />', () => {

  beforeEach(() => {
    cy.mount(<Header><div></div></Header>)
  })

  it('blue block is curved at the ends downwards', () => {
    cy.get('[class*=wrapper]').compareSnapshot('headerPreLogged_nochildren', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })
})