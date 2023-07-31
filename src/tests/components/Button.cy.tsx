import { Button } from 'components/Button/Button';
import React from 'react'

const hexToRgb = (hex) => {
  const rValue = parseInt(hex.substring(0, 2), 16);
  const gValue = parseInt(hex.substring(2, 4), 16);
  const bValue = parseInt(hex.substring(4), 16);
  return `rgb(${rValue}, ${gValue}, ${bValue})`;
}

describe('Testings visuals <Button />', () => {

  it('have a background-color #221fd2', () => {
    cy.mount(<Button>Teste</Button>)
    cy.findByText('Teste').should('have.css', 'background-color', hexToRgb('221fd1'))
  })

  it('have a color text #ffffff', () => {
    cy.mount(<Button>Teste</Button>)
    cy.findByText('Teste').should('have.css', 'color', hexToRgb('ffffff'))
  })

  it('have a height 4.5rem when have class .large', () => {
    cy.mount(<Button>Teste</Button>)
    const c = cy.findByText('Teste');
    c.should('have.css', 'height', '72px')
  })

  it('have a font-size 1.8rem when have class .large', () => {
    cy.mount(<Button>Teste</Button>)
    const c = cy.findByText('Teste');
    c.should('have.css', 'font-size', '28.8px')
  })

  it('have a font-weight 500 when have class .large', () => {
    cy.mount(<Button>Teste</Button>)
    const c = cy.findByText('Teste');
    c.should('have.css', 'font-weight', '500')
  })

  it('have a dimensions height 2.5rem and width 7rem when have class .small', () => {
    cy.mount(<Button small>Teste</Button>)
    const c = cy.findByText('Teste');
    c.should('have.css', 'height', '40px')
    c.should('have.css', 'width', '112px')
  })

  it('have a font-size 1.2rem when have class .small', () => {
    cy.mount(<Button small>Teste</Button>)
    const c = cy.findByText('Teste');
    c.should('have.css', 'font-size', '19.2px')
  })

  it('have a font-weight 600 when have class .small', () => {
    cy.mount(<Button small>Teste</Button>)
    const c = cy.findByText('Teste');
    c.should('have.css', 'font-weight', '600')
  })

})

describe("Testing ButtonLarge Button.tsx", () => {

  it("Display word 'Login' passed by children", () => {
    cy.mount(<Button small>Login</Button>)
    const element = cy.get('button');
    element.should('have.text', 'Login');
  });

  it("Element must be visible", () => {
    cy.mount(<Button>Login</Button>)
    const element = cy.get('button');
    element.should('be.visible')
  });


})