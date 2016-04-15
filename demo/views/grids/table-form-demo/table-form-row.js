import React from 'react';
import AppActions from './../../../actions/app';

import { Table, TableHeader, TableRow, TableCell } from 'components/table';
import Textbox from 'components/textbox';
import Dropdown from 'components/dropdown';
import ShouldComponentUpdate from 'utils/decorators/should-component-update';
import PresenceValidator from 'utils/validations/presence';
import EmailValidator from 'utils/validations/email';

const TableFormRow = ShouldComponentUpdate(
class TableFormRow extends React.Component {

  get cellAction() {
    return AppActions.appTableCellUpdated;
  }

  activateRow = () => {
    AppActions.activateRow(this.props.batch_index, this.props.index);
  }

  render() {
    let index = this.props.index;
    let row_data = this.props.row_data;
    if (this.props.active) {
      return (
        <TableRow key={ index }>
          <TableCell>
            <Textbox
              key='column_1'
              validations={ [ new PresenceValidator() ] }
              value={ row_data.get('column_1') }
              onChange={ this.cellAction.bind(this, index, 'column_1', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_2'
              value={ row_data.get('column_2') }
              onChange={ this.cellAction.bind(this, index, 'column_2', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_3'
              value={ row_data.get('column_3') }
              onChange={ this.cellAction.bind(this, index, 'column_3', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_4'
              value={ row_data.get('column_4') }
              onChange={ this.cellAction.bind(this, index, 'column_4', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_5'
              value={ row_data.get('column_5') }
              onChange={ this.cellAction.bind(this, index, 'column_5', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_6'
              value={ row_data.get('column_6') }
              onChange={ this.cellAction.bind(this, index, 'column_6', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_7'
              value={ row_data.get('column_7') }
              onChange={ this.cellAction.bind(this, index, 'column_7', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_8'
              value={ row_data.get('column_8') }
              onChange={ this.cellAction.bind(this, index, 'column_8', 'table_form', this.props.batch_index) }
            />
          </TableCell>
          <TableCell>
            <Textbox
              key='column_9'
              value={ row_data.get('column_9') }
              onChange={ this.cellAction.bind(this, index, 'column_9', 'table_form', this.props.batch_index) }
            />
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow onMouseOver={ this.activateRow } key={ index }>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_1') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_2') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_3') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_4') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_5') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_6') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_7') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_8') }
              />
            </div>
          </TableCell>
          <TableCell>
            <div className='ui-textbox common-input'>
              <input
                className='ui-textbox__input common-input__input'
                value={ row_data.get('column_9') }
              />
            </div>
          </TableCell>
        </TableRow>
      );
    }
  }
});

export default TableFormRow;
