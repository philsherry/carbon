import React from 'react';
import TableFormRow from './table-form-row';
import ShouldComponentUpdate from 'utils/decorators/should-component-update';

const TableFormBatch = ShouldComponentUpdate(
class TableFormBatch extends React.Component {

  render() {
    let rows = this.props.data.map((row_data, index) => {
      return(
        <TableFormRow
          key={ index }
          row_data={ row_data }
          active={ this.props.active && this.props.activeIndex == index }
          batch_index={ this.props.index }
          index={ index }
          cell_options={ this.props.cell_options }
        />
      );
    });
    return <div>{ rows }</div>;
  }
});

export default TableFormBatch;
