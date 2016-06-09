import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from '../../../node_modules/react/lib/ReactTestUtils';
import RadioButton        from './radio_button';

describe('radio button', function() {

  var item = {
    id: 1,
    material: "The radio button label"
  };

  var result = TestUtils.renderIntoDocument(<RadioButton item={item} name="answer-radio" />);

  it('renders the radio button label', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain(item.material);
  });

  it('renders input attributes', function() {
    expect(ReactDOM.findDOMNode(result).childNodes[0].childNodes[0].attributes.name.value).toContain("answer-radio");
  });

  it('calls the answerSelected function on click', () => {
    spyOn(result.originalComponent(), "answerSelected");
    var radio = TestUtils.findRenderedDOMComponentWithTag(result, 'input');
    TestUtils.Simulate.click(radio);
    expect(result.originalComponent().answerSelected).toHaveBeenCalled();
  });

});
