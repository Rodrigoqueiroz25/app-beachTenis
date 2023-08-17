
import { PreLoggedin } from 'components/PreLoggedin'
import React from 'react'

describe('<Input />', () => {
  it('renders', () => {
    cy.mount(<PreLoggedin.Input />)
  })
})