import React              from 'react';
import { DragSource }     from 'react-dnd';
import { getEmptyImage }  from 'react-dnd-html5-backend';
import ItemTypes          from '../draggable_item_types';

const droppableSource = {
  beginDrag(props, monitor, component) {
    // const bounds = component.node.getBoundingClientRect();
    // This assumes that the droppable "innerHTML", set by the
    //   author, only has ONE root DOM element, be it an
    //   <img> tag, or a wrapping <div>, etc.
    // By checking the height of the child, we ensure that the
    //   droppable is dragged by the center of the desired image / text.
    // This fixes a bug where one droppable might be very tall compared
    //   to the others, which made the Droppable components all
    //   the same height in the player...and the mouse would jump
    //   to the middle of the Droppable and off the small images.
    const bounds = component.node.firstChild.getBoundingClientRect();
    const body = document.getElementsByTagName('body')[0];
    body.className = 'dragging';
    return {
      height: bounds.height,
      width: bounds.width,
      droppableId: props.droppableId,
      droppableText: props.text,
      previousZoneIndex: props.zoneIndex,
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}

export class Droppable extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string,
    hide: React.PropTypes.bool,
    showWhileDragging: React.PropTypes.bool,
    style: React.PropTypes.shape({}),
    text: React.PropTypes.string,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, showWhileDragging, text } = this.props;
    const hide = this.props.hide || (isDragging && !showWhileDragging) ? 'is-hidden' : '';

    return connectDragSource(
      <div
        ref={ref => (this.node = ref)}
        className={`${this.props.className || ''} ${hide}`}
        style={this.props.style}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
}

export default DragSource( // eslint-disable-line new-cap
  ItemTypes.CLIX_DROPPABLE,
  droppableSource,
  collect
)(Droppable);
