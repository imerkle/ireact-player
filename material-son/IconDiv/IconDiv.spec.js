// @flow

import React from 'react';
import { shallow } from 'enzyme';
import {MuiThemeProvider} from 'material-ui/styles';
import IconDiv from './IconDiv';
import { Div } from '../Div';

describe('IconDiv', () => {
  it("Renders IconDiv",() => {
    const str = (<Div className={'innerText'}>{'Whatsup'}</Div>);
    const element = shallow(
      <MuiThemeProvider>
        <IconDiv onIconClick={()=>{}} className={'cl'} key={1} style={{color: '#FFF'}}>{str}</IconDiv>
      </MuiThemeProvider>
    );
    expect(element.prop('icon')).toEqual("close");
  });
});
