import React from 'react';
import _     from 'lodash';

export default class FileUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // Saved response to be displayed
    savedResponse: React.PropTypes.string,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,
    // TODO when we add styles, localize strings

    // Whether or not input should be disabled
    isDisabled: React.PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      uplFile: '',
      inputFocused: false
    };
  }

  handleChange(e) {
    if (_.isFunction(this.props.selectAnswer)) {
      // We are currently only allowing a single file upload. Without enabling
      // multiple uploads on the file input, the file list will only be of size 1
      // and will get replaced every time the file is updated.
      this.props.selectAnswer(e.target.files[0]);
    }

    // Simulate the behavior of what the standard input type="file" shows the user
    if (e.target.files[0] !== undefined) {
      this.setState({ uplFile:e.target.files[0].name });
    } else {
      this.setState({ uplFile: '' });
    }
  }

  handleFileNmDisplay() {
    if (this.props.savedResponse) {
      return this.props.savedResponse;
    }
    return this.state.uplFile ? this.state.uplFile : this.props.localizedStrings.noFile;
  }

  focusInput(shouldFocus) { // set currently-focused item
    if (shouldFocus) {
      this.setState({ focusedInput: true });
    } else {
      this.setState({ focusedInput: false });
    }
  }

  render() {
    return (
      <label
        htmlFor="file-upload"
        className={this.state.focusedInput
        ? 'c-file-upload c-file-up--focused'
        : 'c-file-upload'}
      >
        <span>
          {this.props.localizedStrings.chooseFile}
        </span>
        <input
          id="file-upload"
          ref={(input) => { this.inputField = input; }}
          onChange={e => this.handleChange(e)}
          type="file"
          className="c-file-upload-input"
          disabled={this.props.isDisabled}
          onFocus={() => this.focusInput(true)}
          onBlur={() => this.focusInput(false)}
        />
        <input
          type="text"
          value={this.handleFileNmDisplay()}
          tabIndex="-1"
          readOnly
        />
      </label>
    );
  }
}
