import { PostLogged } from 'components/PostLogged'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './main.css'

const { Footer } = PostLogged.Layout();

beforeEach(() => {
  cy.mount(<BrowserRouter><div className='main'><Footer/></div></BrowserRouter>)
})


describe('<PostLogged.Footer />', () => {
  
  
  it('renders', () => {
  
  })

  it('has a button with text "Home" and image home', () => {
    cy.get('[id=home]').should('have.text', 'Home');
    cy.get('[id=home]>img').should('have.attr', 'src').and('match', /home.*.svg/)
  })

  it('has a button with text "Histórico" and image history', () => {
    cy.get('[id=history]').should('have.text', 'Histórico');
    cy.get('[id=history]>img').should('have.attr', 'src').and('match', /history.*.svg/)
  })

  it('has a button with text "Pagamentos" and image wallet', () => {
    cy.get('[id=payment]').should('have.text', 'Pagamentos');
    cy.get('[id=payment]>img').should('have.attr', 'src').and('match', /wallet.*.svg/)
  })

  it('has a button with text "Perfil" and image home', () => {
    cy.get('[id=profile]').should('have.text', 'Perfil');
    cy.get('[id=profile]>img').should('have.attr', 'src').and('match', /profile.*.svg/)
  })

  it('click in the button with text "Home" redirect to /home endpoint', () => {
    cy.get('[id=home]').click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/home)/g)
  })

  it('click in the button with text "Perfil" redirect to /profile endpoint', () => {
    cy.get('[id=profile]').click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/profile)/g)
  })

  
})

describe('Test visual <PostLogged.Footer/>',() => {

  it('visual is ok', () => {
    cy.get('[class*=footer]').compareSnapshot('footerPosLogged', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

})

