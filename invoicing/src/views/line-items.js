import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
import LineItem from './line-item';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import InvoicingActions from 'actions/invoicing';
import guid from 'carbon/lib/utils/helpers/guid';

class LineItems extends React.Component {
  handleDrop = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.items.map((rank) => {
        return rank.id
      }));
    }
  }

  moveItem = (dragIndex, hoverIndex) => {
    InvoicingActions.reorder(dragIndex, hoverIndex);
  }

  renderLineItems = () => {
    const lineItems = this.props.lineItems,
          rows = [];

    rows.push(
      <TableRow key="header" uniqueID="header">
        <TableHeader action={ true } />
        <TableHeader action={ true } />
        <TableHeader action={ true } />
        <TableHeader>Quantity</TableHeader>
        <TableHeader>Price/Rate</TableHeader>
        <TableHeader>Discount</TableHeader>
        <TableHeader>Tax Rate (%)</TableHeader>
        <TableHeader>Tax Amount</TableHeader>
        <TableHeader>Total</TableHeader>
      </TableRow>
    );

    lineItems.forEach((item, index) => {
      rows.push(
        <LineItem
          key={ item.get('id') }
          index={ index }
          quantity={ item.get('quantity') }
          rate={ item.get('rate') }
          discount={ item.get('discount') }
          tax={ item.get('tax') }
          taxAmount={ item.get('tax_amount') }
          total={ item.get('total') }
          foreignCurrency={ this.props.foreignCurrency }
          exchangeRate={ this.props.exchangeRate }
          moveItem={ this.moveItem }
          onDrop={ this.handleDrop.bind(this) }
          id={ item.get('id') }
        />
      );
    });

    let placeholderID = guid();

    rows.push(
      <LineItem
        key={ placeholderID }
        id={ placeholderID }
        index={ this.props.lineItems.count() }
        foreignCurrency={ this.props.foreignCurrency }
        exchangeRate={ this.props.exchangeRate }
        placeholder={ true }
      />
    );

    return rows;
  }

  render() {
    return (
      <Table shrink={ true }>
        { this.renderLineItems() }
      </Table>
    );
  }
}

export default DragDropContext(HTML5Backend)(LineItems);
