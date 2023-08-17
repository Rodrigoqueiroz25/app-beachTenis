import React from 'react'
import { PostLogged } from 'components/PostLogged'

describe('Tests funcionals <PostLogged.Input />', () => {
  
  beforeEach(() => {
    cy.mount(<PostLogged.Input placeholder='placeholder' name='test'/>)
  })
  
  it('renders', () => {})

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.findByPlaceholderText('placeholder').should('be.visible')
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<PostLogged.Input placeholder='placeholder' name='test' msgError='error'/>)
    cy.findByPlaceholderText('placeholder').parent().parent().find('[class*=error]').should('have.text', 'error');
  })

  it('can receive text value', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.findByPlaceholderText('placeholder').should('have.value', 'test');
  })

})


describe('Tests Visuals <PostLogged.Input />', () => {

  beforeEach(() => {
    cy.mount(<PostLogged.Input placeholder='placeholder' name='test'/>)
  })

  it('display placeholder "placeholder" when placeholder prop gets string "placeholder"', () => {
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_empty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('display error message "error" when msgError prop gets string "error"', () => {
    cy.mount(<PostLogged.Input placeholder='placeholder' name='test' msgError='error'/>)
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_errormsg', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value without error msg', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_hover_notempty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value with error msg when error msg', () => {
    cy.mount(<PostLogged.Input placeholder='placeholder' name='test' msgError='error'/>)
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_hover_notempty_error', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value without error msg nohover', () => {
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('label').click();
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_notempty', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })

  it('can receive text value with error msg with error nohover', () => {
    cy.mount(<PostLogged.Input placeholder='placeholder' name='test' msgError='error'/>)
    cy.findByPlaceholderText('placeholder').type('test');
    cy.get('label').click();
    cy.get('[class*=wrapper]').compareSnapshot('input_placeholder_nohover_notempty_error', {errorThreshold: 0.001, capture: 'fullPage', padding:5});
  })



  
  // it('has the height 4.5rem', () => {
  //   cy.get('[class*=combobox]').should('have.css','height','72px')
  // })

  // it('has the border solid 0.1rem black', () => {
    
  //   cy.get('select').should('have.css','border-bottom','1.6px solid rgb(0, 0, 0)')
  // })

  // it('has the border solid 0.1rem red when received message error parameter', () => {
  //   cy.mount(<PostLogged.Combobox options={[]} isEmpty={true} msgError='error'/>)
  //   cy.get('select').should('have.css','border-bottom','1.6px solid rgb(255, 0, 0)')
  // })

  // it('has the border-image linear-gradient(to right, #991c11, #cf1e15) when focus and received error parameter', () => {
  //   cy.mount(<PostLogged.Combobox options={[]} isEmpty={true} msgError='error'/>)
  //   cy.get('select').focus().should('have.css','border-image','linear-gradient(to right, rgb(153, 28, 17), rgb(207, 30, 21)) 1 / 1 / 0 stretch')
  // })

  // it('has the border-image-slice 1 when focus and received error parameter', () => {
  //   cy.mount(<PostLogged.Combobox options={[]} isEmpty={true} msgError='error'/>)
  //   cy.get('select').focus().should('have.css','border-image-slice','1')
  // })

  // it('has the border-width 2px when focus', () => {
    
  //   cy.get('select').focus().should('have.css','border-width','0px 0px 2px')
  // })

  // it('has the border-image linear-gradient(to right, #114c99, #1544cf) when focus', () => {
    
  //   cy.get('select').focus().should('have.css','border-image','linear-gradient(to right, rgb(17, 76, 153), rgb(21, 68, 207)) 1 / 1 / 0 stretch')
  // })

  // it('has the border-image-slice 1 when focus', () => {
    
  //   cy.get('select').focus().should('have.css','border-image-slice','1')
  // })
  
  
  // it('has the options with font-size 1.4rem', () => {
    
  //   cy.get('option').should('have.css', 'font-size', '22.4px');
  // })

  // it('has the options with font-weight 500', () => {
    
  //   cy.get('select').should('have.css', 'font-weight', '500');
  // })

  // it('has the options with color font black', () => {
    
  //   cy.get('select').should('have.css', 'color', 'rgb(0, 0, 0)');
  // })

  // it('has label color rgba(0, 0, 0, 0.6)' ,() => {
    
  //   cy.get('label').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)')
  // })

  // it('has label font-size 1.3rem' ,() => {
    
  //   cy.get('label').should('have.css', 'font-size', '20.8px')
  // })

  // it('has label fontweight 400' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={true} placeholder='Label'/>);
  //   cy.get('label').should('have.css', 'font-weight', '400')
  // });

  // it('has label top 0.4rem when is empty' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={true} placeholder='Label'/>);
  //   cy.get('label').should('have.css', 'top', '6.4px')
  // });

  // it('has label top -1rem when not is empty' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/>);
  //   cy.get('select').select('test1');
  //   cy.get('label').should('have.css', 'top', '-17.6px')
  // });

  // it('has label color #1a1c94 when focus' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/>);
  //   cy.get('select').focus();
  //   cy.get('label').should('have.css', 'color', 'rgb(26, 28, 148)')
  // });
  
  // it('has label top -1.1rem when focus' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/>);
  //   cy.get('select').focus();
  //   cy.get('label').should('have.css', 'top', '-17.6px')
  // });

  // it('has label font-weight 600 when focus' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/>);
  //   cy.get('select').focus();
  //   cy.get('label').should('have.css', 'font-weight', '600')
  // });

  // it('has label color brown when received message error parameter' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label' msgError='error'/>);
  //   cy.get('label').should('have.css', 'color', 'rgb(165, 42, 42)')
  // });

  // it('has label color #94221a when received message error parameter and focuses' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label' msgError='error'/>);
  //   cy.get('select').focus();
  //   cy.get('label').should('have.css', 'color', 'rgb(165, 42, 42)')
  // });

  
  // it('has message error color red' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} msgError='error'/>);
  //   cy.get('[class*=error]').should('have.css', 'color', 'rgb(255, 0, 0)')
  // });

  // it('has message error font-size 1rem' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} msgError='error'/>);
  //   cy.get('[class*=error]').should('have.css', 'font-size', '16px')
  // });
  
  // it('has message error position abslute, right 0 e top 3.2rem' ,() => {
  //   cy.mount(<PostLogged.Combobox options={['test1']} isEmpty={false} msgError='error'/>);
  //   cy.get('[class*=error]').should('have.css', 'position', 'absolute')
  //   cy.get('[class*=error]').should('have.css', 'right', '0px')
  //   cy.get('[class*=error]').should('have.css', 'top', '51.2px')
  // });
});