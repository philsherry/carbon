import React from 'react';
import { TableRow, TableCell } from 'carbon/lib/components/table';
import Decimal from 'carbon/lib/components/decimal';
import InvoicingActions from 'actions/invoicing';
import MultiCurrency from './multi-currency';
import Icon from 'carbon/lib/components/icon';
import Link from 'carbon/lib/components/link';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { findDOMNode } from 'react-dom';

const ItemTypes = {
  ITEM: 'item'
};

const itemSource = {
  canDrag(props) {
    return document.activeElement.getAttribute('icon') === "list_view";
  },

  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.onDrop()
    }
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class LineItem extends React.Component {
  updateValue = (ev) => {
    InvoicingActions.updateValue(
      this.props.index,
      ev.target.name,
      MultiCurrency.toBaseCurrency(
        this.props.foreignCurrency,
        ev.target.value,
        this.props.exchangeRate
      ),
      this.props.id
    );
  }

  deleteLine = () => {
    InvoicingActions.deleteLine(this.props.index);
  }

  copyLine = () => {
    InvoicingActions.copyLine(this.props.index);
  }

  deleteIcon = () => {
    if (this.props.placeholder) {
      return null;
    } else {
      return <Icon type="delete" onClick={ this.deleteLine } />;
    }
  }

  dragIcon = () => {
    if (this.props.placeholder) {
      return null;
    } else {
      return <Link icon="list_view" />;
    }
  }

  copyIcon = () => {
    if (this.props.placeholder) {
      return null;
    } else {
      return <Icon type="copy" onClick={ this.copyLine } />;
    }
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    let row = (
      <tr className={ this.props.isDragging ? "dragging" : "" }>
        <TableCell action={ true }>
          { this.dragIcon() }
        </TableCell>

        <TableCell action={ true }>
          { this.copyIcon() }
        </TableCell>

        <TableCell action={ true }>
          { this.deleteIcon() }
        </TableCell>

        <TableCell>
          <Decimal
            label={ false }
            name="quantity"
            onChange={ this.updateValue }
            value={ this.props.quantity }
          />
        </TableCell>

        <TableCell>
          <Decimal
            label={ false }
            name="rate"
            onChange={ this.updateValue }
            value={ MultiCurrency.toForeignCurrency(this.props.foreignCurrency, this.props.rate, this.props.exchangeRate) }
          />
        </TableCell>

        <TableCell>
          <Decimal
            label={ false }
            name="discount"
            onChange={ this.updateValue }
            value={ MultiCurrency.toForeignCurrency(this.props.foreignCurrency, this.props.discount, this.props.exchangeRate) }
          />
        </TableCell>

        <TableCell>
          <Decimal
            label={ false }
            name="tax"
            onChange={ this.updateValue }
            value={ this.props.tax }
          />
        </TableCell>

        <TableCell>
          <Decimal
            value={ MultiCurrency.toForeignCurrency(this.props.foreignCurrency, this.props.taxAmount, this.props.exchangeRate) }
            readOnly
          />
        </TableCell>

        <TableCell>
          <Decimal
            value={ MultiCurrency.toForeignCurrency(this.props.foreignCurrency, this.props.total, this.props.exchangeRate) }
            readOnly
          />
        </TableCell>
      </tr>
    );

    if (!this.props.placeholder) {
      return connectDragSource(connectDropTarget(row));
    } else {
      return row;
    }
  }
}

LineItem = DropTarget(
    ItemTypes.ITEM, itemTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
)(LineItem)

export default
DragSource(
  ItemTypes.ITEM, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(LineItem)
