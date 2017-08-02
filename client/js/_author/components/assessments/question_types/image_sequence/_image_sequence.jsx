import React        from 'react';
import Feedback     from '../question_common/single_feedback';
import ImageOrder   from './image_order';
import SaveOptions  from '../question_common/save_option_button';
import localize     from '../../../../locales/localize';

class ImageSequence extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      bankId: React.PropTypes.string,
      answers: React.PropTypes.arrayOf(React.PropTypes.shape),
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      multipleAnswer: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.shape({}),
      }),
    }).isRequired,
    updateItem: React.PropTypes.func,
    deleteChoice: React.PropTypes.func,
    updateChoice: React.PropTypes.func,
    localizeStrings: React.PropTypes.func.isRequired,
    save: React.PropTypes.func,
    isActive: React.PropTypes.bool,
    language: React.PropTypes.string.isRequired,
    duplicateAnswers: React.PropTypes.arrayOf(React.PropTypes.string),
  };

  constructor(props) {
    super(props);
    this.state = {
      choiceId: null,
      hasChanged: false
    };
  }

  onUpdateChoice = (itemId, choiceId, newChoice, fileIds) => {
    this.setState({ hasChanged: true });
    this.props.updateChoice(itemId, choiceId, newChoice, fileIds);
  }

  onSave = () => {
    this.setState({ hasChanged: false });
    this.props.save();
  }

  getFeedback() {
    const { question } = this.props.item;
    const strings = this.props.localizeStrings('imageSequence');
    return (
      <div className="au-c-question__feedback">
        <Feedback
          language={this.props.language}
          updateItem={item => this.props.updateItem(item, true)}
          feedbackType="correctFeedback"
          feedback={question.correctFeedback}
          labelText={strings.correctFeedback}
          bankId={this.props.item.bankId}
        />
        <Feedback
          language={this.props.language}
          updateItem={item => this.props.updateItem(item, true)}
          feedbackType="incorrectFeedback"
          feedback={question.incorrectFeedback}
          labelText={strings.incorrectFeedback}
          bankId={this.props.item.bankId}
        />
      </div>
    );
  }

  activateChoice(choiceId) {
    this.setState({ activeChoice: choiceId });
  }

  render() {
    let saveOptions = (
      <SaveOptions
        save={this.onSave}
        disabled
      />
    );

    if (this.state.hasChanged) {
      saveOptions = (
        <SaveOptions
          save={this.onSave}
        />
      );
    }

    return (
      <div style={{ display: this.props.isActive ? 'block' : 'none' }}>
        <ImageOrder
          language={this.props.language}
          activateChoice={choiceId => this.activateChoice(choiceId)}
          activeChoice={this.state.activeChoice}
          deleteChoice={this.props.deleteChoice}
          item={this.props.item}
          updateChoice={this.onUpdateChoice}
          duplicateAnswers={this.props.duplicateAnswers}
        />
        {saveOptions}
        <div className="au-c-question__feedback">
          { this.getFeedback() }
        </div>
      </div>
    );
  }
}

export default localize(ImageSequence);
