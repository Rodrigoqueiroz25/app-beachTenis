import React from 'react'
import { PostLogged } from 'components/PostLogged';

describe("Testing Visual <AddBanner/>", () => {

  it("AddBanner is redering", () => {
      cy.mount(<PostLogged.AddBanner />)
      cy.get('[class*=wrapper]').should('be.visible');
      cy.get('[class*=iconContainer]').should('be.visible');
      cy.get('[class*=icon]').should('be.visible');
      cy.get('[class*=iconPhoto]').should('be.visible');
      cy.get('[class*=addBanner]').should('be.visible');
  });

  it("AddBanner contain text 'Adicione um banner'", () => {
      cy.mount(<PostLogged.AddBanner/>)
      cy.get('[class*=addBanner]').should('have.text', 'Adicione um banner');
  });

  it("display the image icon alt", () => {
      cy.mount(<PostLogged.AddBanner/>)
      cy.findByAltText('icone de imagem').should('be.visible');
  });    

  it("display the camera icon alt", () => {
      cy.mount(<PostLogged.AddBanner/>)
      cy.findByAltText('icone de câmera').should('be.visible');
  });    

  it("display the image icon", () => {
      cy.mount(<PostLogged.AddBanner/>)
      cy.findByAltText('icone de imagem').should('have.attr', 'src').and('match', /image.*.svg/)
  });    
  
  it("display the camera icon", () => {
      cy.mount(<PostLogged.AddBanner/>)
      cy.findByAltText('icone de câmera').should('have.attr', 'src').and('match', /photo.*.svg/)
  });    

  it('have a background-color rgba(242, 242, 242, 0.6)', () => {
    cy.mount(<PostLogged.AddBanner />)
    cy.get('div[class*="wrapper"]').should('have.css', 'background-color', 'rgba(242, 242, 242, 0.6)')
  })

  it('have a height 17.2rem', () => {
    cy.mount(<PostLogged.AddBanner />)
    cy.get('div[class*="wrapper"]').should('have.css', 'height', '275.20001220703125px')
  })

  it('text have a font-size 1.4rem and font-weight 400', () => {
    cy.mount(<PostLogged.AddBanner />)
    cy.get('p[class*="addBanner"]').should('have.css', 'font-size', '22.4px');
    cy.get('p[class*="addBanner"]').should('have.css', 'font-weight', '400');
  })

  // it('icon image have a dimensions 3.4rem', () => {
  //   cy.mount(<PostLogged.AddBanner />)
  //   cy.get('[class*="icon"]').should('have.css', 'height', '54.400001525878906px');
  //   cy.get('[class*="icon"]').should('have.css', 'width', '54.400001525878906px');
  // })

  // it('icon camera have a dimensions 2.8rem', () => {
  //   cy.mount(<PostLogged.AddBanner />)
  //   cy.get('[class*="iconPhoto"]').should('have.css', 'height', '44.79999923706055px');
  //   cy.get('[class*="iconPhoto"]').should('have.css', 'width', '44.79999923706055px');
  // })

})


describe('Testing Visuals <AddBanner />', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.AddBanner />)
  });

  it('visual is ok', () => {
    cy.get('body').compareSnapshot('addBanner', {errorThreshold: 0.01, capture: 'fullPage', padding:5});
  });

});