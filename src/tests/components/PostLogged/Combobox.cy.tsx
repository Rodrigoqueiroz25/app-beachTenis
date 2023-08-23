import React from 'react'
import { PostLogged } from 'components/PostLogged';
import './main.css';

beforeEach(() => {
  cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true}/></div>)
});


describe('Tests funcionals <Combobox />', () => {
  
  it('renders', () => {
  })

  it('has the options passed by the vector [test1, test2]', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1', 'test2']} isEmpty={true}/></div>)
    cy.get('select').select('test1')
    cy.get('select').select('test2')
  })

  it('the value of the options passed by the vector is equal to the text of the options when the idOptions attribute is not passed to the component.', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1', 'test2']} isEmpty={true}/></div>)
    cy.get('select').select('test1').should('have.value', 'test1');
    cy.get('select').select('test2').should('have.value', 'test2');
  })

  it('the value of the options caused by the vector is equal to the values [1,2] passed by the idOptions property.', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1', 'test2']} idOptions={[1,2]} isEmpty={true}/></div>)
    cy.get('select').select('test1').should('have.value', 1);
    cy.get('select').select('test2').should('have.value', 2);
  })

  it('has the label "opções"', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true} placeholder='opções'/></div>)
    cy.get('label').should('have.text', 'opções')
  })

  it('has message error "error" when received message error parameter' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label' msgError='error'/></div>);
    cy.get('[class*=error]').should('be.visible').should('have.text', 'error')
  });
  

})

describe('Tests visuals <Combobox />', () => {
  
  it('has the height 4.5rem', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true}/></div>)
    cy.get('[class*=combobox]').should('have.css','height','45px')
  })

  it('has the border solid 0.1rem black', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true}/></div>)
    cy.get('select').should('have.css','border-bottom','1.11667px solid rgb(0, 0, 0)')
  })

  it('has the border solid 0.1rem red when received message error parameter', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true} msgError='error'/></div>)
    cy.get('select').should('have.css','border-bottom','1.11667px solid rgb(255, 0, 0)')
  })

  it('has the border-image linear-gradient(to right, #991c11, #cf1e15) when focus and received error parameter', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true} msgError='error'/></div>)
    cy.get('select').focus().should('have.css','border-image','linear-gradient(to right, rgb(153, 28, 17), rgb(207, 30, 21)) 1 / 1 / 0 stretch')
  })

  it('has the border-image-slice 1 when focus and received error parameter', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true} msgError='error'/></div>)
    cy.get('select').focus().should('have.css','border-image-slice','1')
  })

  it('has the border-width 2px when focus', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true}/></div>)
    cy.get('select').focus().should('have.css','border-width','0px 0px 1.11667px')
  })

  it('has the border-image linear-gradient(to right, #114c99, #1544cf) when focus', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true}/></div>)
    cy.get('select').focus().should('have.css','border-image','linear-gradient(to right, rgb(17, 76, 153), rgb(21, 68, 207)) 1 / 1 / 0 stretch')
  })

  it('has the border-image-slice 1 when focus', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={[]} isEmpty={true}/></div>)
    cy.get('select').focus().should('have.css','border-image-slice','1')
  })
  
  
  it('has the options with font-size 1.4rem', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1', 'test2']} isEmpty={true}/></div>)
    cy.get('option').should('have.css', 'font-size', '14px');
  })

  it('has the options with font-weight 500', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1', 'test2']} isEmpty={true}/></div>)
    cy.get('select').should('have.css', 'font-weight', '500');
  })

  it('has the options with color font black', () => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1', 'test2']} isEmpty={true}/></div>)
    cy.get('select').should('have.css', 'color', 'rgb(0, 0, 0)');
  })

  it('has label color rgba(0, 0, 0, 0.6)' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={true} placeholder='Label'/></div>);
    cy.get('label').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)')
  })

  it('has label font-size 1.3rem' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={true} placeholder='Label'/></div>);
    cy.get('label').should('have.css', 'font-size', '13px')
  })

  it('has label fontweight 400' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={true} placeholder='Label'/></div>);
    cy.get('label').should('have.css', 'font-weight', '400')
  });

  it('has label top 0rem when is empty' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={true} placeholder='Label'/></div>);
    cy.get('label').should('have.css', 'top', '0px')
  });

  it('has label top -1.7rem when not is empty' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/></div>);
    cy.get('select').select('test1');
    cy.get('label').should('have.css', 'top', '-17px')
  });

  it('has label color #1a1c94 when focus' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/></div>);
    cy.get('select').focus();
    cy.get('label').should('have.css', 'color', 'rgb(26, 28, 148)')
  });
  
  it('has label top -1.7rem when focus' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/></div>);
    cy.get('select').focus();
    cy.get('label').should('have.css', 'top', '-17px')
  });

  it('has label font-weight 600 when focus' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label'/></div>);
    cy.get('select').focus();
    cy.get('label').should('have.css', 'font-weight', '600')
  });

  it('has label color brown when received message error parameter' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label' msgError='error'/></div>);
    cy.get('label').should('have.css', 'color', 'rgb(165, 42, 42)')
  });

  it('has label color #94221a when received message error parameter and focuses' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} placeholder='Label' msgError='error'/></div>);
    cy.get('select').focus();
    cy.get('label').should('have.css', 'color', 'rgb(165, 42, 42)')
  });

  
  it('has message error color red' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} msgError='error'/></div>);
    cy.get('[class*=error]').should('have.css', 'color', 'rgb(255, 0, 0)')
  });

  it('has message error font-size 1rem' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} msgError='error'/></div>);
    cy.get('[class*=error]').should('have.css', 'font-size', '10px')
  });
  
  it('has message error position abslute, right 0 e top 3.2rem' ,() => {
    cy.mount(<div className='main'><PostLogged.Combobox options={['test1']} isEmpty={false} msgError='error'/></div>);
    cy.get('[class*=error]').should('have.css', 'position', 'static')
    cy.get('[class*=error]').should('have.css', 'right', '0px')
    cy.get('[class*=error]').should('have.css', 'top', '26px')
  });

})


describe('Testing Visuals snapshots<Combobox />', () => {

  it('display label "label" when placeholder prop gets string "label" no hover', () => {
    cy.mount(<div className='main'><PostLogged.Combobox placeholder='label' isEmpty={true} options={[]}/></div>)
    cy.get('[class*=combobox]').compareSnapshot('combobox_placeholder_nohover_empty_noerror', {errorThreshold: 0.001, capture: 'fullPage', padding:15});
  })

  it('display error message "error" when msgError prop gets string "error" no hover', () => {
    cy.mount(<div className='main'><PostLogged.Combobox placeholder='label' isEmpty={true} options={[]} msgError='error'/></div>)
    cy.get('[class*=combobox]').compareSnapshot('combobox_placeholder_nohover_empty_errormsg', {errorThreshold: 0.001, capture: 'fullPage', padding:15});
  })

  it('can select option without error msg hover', () => {
    cy.mount(<div className='main'><PostLogged.Combobox placeholder='label' isEmpty={false} options={['teste']}/></div>)
    cy.findByPlaceholderText('label').select('teste')
    cy.get('[class*=combobox]').compareSnapshot('combobox_placeholder_hover_notempty_noerror', {errorThreshold: 0.001, capture: 'viewport', padding:16});
  })

  it('can select option without error msg nohover', () => {
    cy.mount(<div className='main'><PostLogged.Combobox placeholder='label' isEmpty={false} options={['teste']}/></div>)
    cy.findByPlaceholderText('label').select('teste')
    cy.get('label').click();
    cy.get('[class*=combobox]').compareSnapshot('combobox_placeholder_nohover_notempty_noerror', {errorThreshold: 0.001, capture: 'viewport', padding:16});
  })

});