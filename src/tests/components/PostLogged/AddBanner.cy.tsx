import React from 'react'
import { PostLogged } from 'components/PostLogged';
import './main.css';

beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.AddBanner /></div>)
});

describe("Testing Visual <AddBanner/>", () => {

  it("AddBanner is redering", () => {

    cy.get('[class*=wrapper]').should('be.visible');
    cy.get('[class*=iconContainer]').should('be.visible');
    cy.get('[class*=icon]').should('be.visible');
    cy.get('[class*=iconPhoto]').should('be.visible');
    cy.get('[class*=addBanner]').should('be.visible');
  });

  it("AddBanner contain text 'Adicione um banner'", () => {

    cy.get('[class*=addBanner]').should('have.text', 'Adicione um banner');
  });

  it("display the image icon alt", () => {

    cy.findByAltText('icone de imagem').should('be.visible');
  });

  it("display the camera icon alt", () => {

    cy.findByAltText('icone de câmera').should('be.visible');
  });

  it("display the image icon", () => {

    cy.findByAltText('icone de imagem').should('have.attr', 'src').and('match', /image.*.svg/)
  });

  it("display the camera icon", () => {

    cy.findByAltText('icone de câmera').should('have.attr', 'src').and('match', /photo.*.svg/)
  });

  it('have a background-color rgba(242, 242, 242, 0.6)', () => {

    cy.get('div[class*="wrapper"]').should('have.css', 'background-color', 'rgba(242, 242, 242, 0.6)')
  })

  it('have a height 17.2rem', () => {

    cy.get('div[class*="wrapper"]').should('have.css', 'height', '172px')
  })

  it('text have a font-size 1.4rem and font-weight 400', () => {

    cy.get('p[class*="addBanner"]').should('have.css', 'font-size', '14px');
    cy.get('p[class*="addBanner"]').should('have.css', 'font-weight', '400');
  })

  it('icon image have a dimensions 3.4rem', () => {
    
    cy.get('[class*="icon"]').should('have.css', 'height', '34px');
    cy.get('[class*="icon"]').should('have.css', 'width', '34px');
  })

  it('icon camera have a dimensions 2.8rem', () => {
    
    cy.get('[class*="iconPhoto"]').should('have.css', 'height', '28px');
    cy.get('[class*="iconPhoto"]').should('have.css', 'width', '28px');
  })

})


describe('Testing Visuals <AddBanner />', () => {

  it('visual is ok', () => {
    cy.get('body').compareSnapshot('addBanner', { errorThreshold: 0.01, capture: 'fullPage', padding: 5 });
  });

});