import React            from 'react';
import { shallow }      from 'enzyme';
import ImageSequence    from './_image_sequence';
import Feedback         from '../question_common/single_feedback';
import ImageOrder       from './image_order';

describe('image sequence component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      item: {
        bankId: '',
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        type: '',
        index: 1,
        question: {
          choices: {
            choice: {
              id: '4',
            },
          },
          shuffle: true,
          timeValue: {
            hours: '1',
            minutes: '70',
            seconds: '100',
          },
        },
        answers: [],
      },
      updateItem: () => { calledFunc = true; },
      updateChoice: () => {},
      activateChoice: () => {},
      save: () => {},
      language: 'eng',
    };
    result = shallow(<ImageSequence {...props} />);
  });

  it('renders the component', () => {
    expect(result.find('.au-c-question__feedback').length).toBe(2);
    expect(result.state().hasChanged).toEqual(false);
  });

  it('renders two Feedback components', () => {
    expect(result.find(Feedback).length).toBe(2);
  });

  it('renders ImageOrder', () => {
    expect(result.find(ImageOrder).length).toBe(1);
  });

  it('calls updateItem', () => {
    expect(calledFunc).toBeFalsy();
    const feedback = result.find(Feedback);
    feedback.at(0).nodes[0].props.updateItem();
    expect(calledFunc).toBeTruthy();
  });

  it('changes state when call onUpdateChoice', () => {
    expect(result.state().hasChanged).toEqual(false);
    result.instance().onUpdateChoice();
    expect(result.state().hasChanged).toEqual(true);
  });

  it('sets disabled flag correctly on the Save button', () => {
    expect(result.find({ disabled: true }).length).toEqual(1);
    result.setState({ hasChanged: true });
    expect(result.find({ disabled: true }).length).toEqual(0);
  });
});
