import React             from "react";
import { DragSource }    from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

import Word              from "../word";
import ItemTypes         from "../draggable_item_types";

const wordSource = {
  beginDrag(props) {
    props.beginDragging();
    return {
      itemId: props.id,
      words: props.draggableWords
    };
  },
  endDrag(props, monitor) {
    props.endDragging();
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  }
}

export class DraggableGroupWord extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    id: React.PropTypes.any.isRequired,
    isGroupDragging: React.PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isGroupDragging } = this.props;

    return connectDragSource(
      <div className="draggable-group-word" style={{ display: "inline-block", opacity: isGroupDragging ? 0 : 1, cursor: 'move' }}>
        <Word>
          {this.props.children}
        </Word>
      </div>
    );
  }
}

export default DragSource(ItemTypes.WORD_GROUP, wordSource, collect)(DraggableGroupWord);
