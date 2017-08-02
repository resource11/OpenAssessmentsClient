import React     from 'react';
import localize  from '../../../../locales/localize';

function saveOption(props) {
  const strings = props.localizeStrings('saveOption');
  let classes = 'au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md';

  if (props.disabled) {
    classes += ' is-inactive';
  }
  return (
    <button
      className={classes}
      onClick={props.save}
      disabled={props.disabled ? props.disabled : false}
    >
      {strings.saveOptions}
    </button>
  );
}

saveOption.propTypes = {
  save: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
};

export default localize(saveOption);
