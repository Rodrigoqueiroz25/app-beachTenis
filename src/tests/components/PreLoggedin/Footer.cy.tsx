import { PreLoggedin } from 'components/PreLoggedin'
import { Footer } from 'components/PreLoggedin/LayoutPage/Footer/Footer'
import React from 'react'

describe('test visuals <Footer />', () => {
  
  beforeEach(() => {
    cy.mount(<Footer><div>teste</div></Footer>)
  })

  it('displays "test" text above rectangle image', () => {
    cy.get('[class*=wrapper]').compareSnapshot('footerPreLogged_nochildren', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

})