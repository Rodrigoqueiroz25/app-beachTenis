
import { Footer } from 'components/PreLoggedin/LayoutPage/Footer/Footer'
import React from 'react'
import './main.css';

describe('test visuals <Footer />', () => {
  
  beforeEach(() => {
    cy.mount(<div className='main'><Footer><div>teste</div></Footer></div>)
  })

  it('displays "test" text above rectangle image', () => {
    cy.get('[class*=wrapper]').compareSnapshot('footerPreLogged_nochildren', { errorThreshold: 0.01, capture: 'fullPage', padding: 15 });
  })

})