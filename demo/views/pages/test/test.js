import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribedIds: [],
      deletedIds: []
    };
  }

  actions = () => {
    return (
    {
      subscription: {
        text: 'Add Subscriptions',
        icon: 'basket',
        onClick: (selected, event) => {
          this.setState({ subscribedIds: Object.keys(selected) });
        }
      },
      delete: {
        text: 'Delete',
        icon: 'bin',
        onClick: (selected, event) => {
          this.setState({ deletedIds: Object.keys(selected) });
        }
      }
    }
    );
  }

  render() {
    return (
      <div style={ { height: '500px', padding: '20px' } }>
        <h1>ActionToolbar Test</h1>
        <Table actions={ this.actions() } selectable>
          <TableRow selectable={ false }>
            <TableHeader />
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
          </TableRow>
          <TableRow uniqueID='1'>
            <TableCell>John</TableCell>
            <TableCell>Smith</TableCell>
          </TableRow>
          <TableRow uniqueID='2'>
            <TableCell>Jane</TableCell>
            <TableCell>Doe</TableCell>
          </TableRow>
        </Table>
        <p>Subscription row ids: {this.state.subscribedIds.join(', ')}</p>
        <p>Deleted row ids: {this.state.deletedIds.join(', ')}</p>
      </div>
    );
  }
}

export default Test;
