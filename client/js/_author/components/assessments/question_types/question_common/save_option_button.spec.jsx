import React                from 'react';
import { shallow }          from 'enzyme';
import SaveOptionButton     from './save_option_button';

describe('save option button component', () => {
  let props;
  let result;
  let calledFunction;

  beforeEach(() => {
    calledFunction = false;
    props = {
      save: () => { calledFunction = true; },
    };
    result = shallow(<SaveOptionButton {...props} />);
  });

  it('renders button', () => {
    expect(result.find('button').length).toBe(1);
  });

  it('calls function on change', () => {
    expect(calledFunction).toBeFalsy();
    const button = result.find('button');
    button.simulate('click');
    expect(calledFunction).toBeTruthy();
  });

  it('has inactive class if disabled', () => {
    expect(result.find('.is-inactive').length).toEqual(0);
    props.disabled = true;
    result = shallow(<SaveOptionButton {...props} />);
    expect(result.find('.is-inactive').length).toEqual(1);
  });
});
