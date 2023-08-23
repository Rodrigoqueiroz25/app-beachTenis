
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PreLoggedin } from 'components/PreLoggedin'
import './main.css';


describe('<LinkOtherPage />', () => {
 
  beforeEach(() => {
    cy.mount(<BrowserRouter><div className='main'><PreLoggedin.LinkOtherPage endPoint='/test' text='link to page' textLink='click here'/></div></BrowserRouter>)
  })

  it('renders', () => {});

  it('has a text passed by prop "link to page click here"', () => {
    cy.get('[class*=text]').contains('link to page').should('be.visible')
    cy.get('[class*=link]').contains('click here').should('be.visible')
  });

  it('click in the text "click here" redirect to /test endpoint passed by prop endPoint', () => {
    cy.get('[class*=link]').click();
    cy.url().and('match', /^([a-zA-Z]*):\/\/([a-zA-Z]*):[0-9]*(\/test)/g)
  })

})