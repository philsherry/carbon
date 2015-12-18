import React from 'react';
import BigNumber from 'bignumber.js';
import { connect } from 'utils/flux';
import Form from 'components/form';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';

import FinancesStore from './../../stores/finances';
import UserActions from './../../actions/user';
import FinancesActions from './../../actions/finances';

import FinancesHistory from './subviews/history';
import FinancesDetails from './subviews/details';
import FinancesChart from './subviews/chart';
import FinancesTable from './subviews/table';
import LineGraphComp from './subviews/line_graph';
import UserDialog from './subviews/user-dialog';

class Finances extends React.Component {
  handleOnClick = (ev) => {
    ev.preventDefault();
    UserActions.userDialogOpened();
  }

  render() {
    let name = this.state.financesStore.get('name');

    return (
      <div className="view-finances">

        <FinancesHistory />

        <Button onClick={ this.handleOnClick }>Edit My Details</Button>

        <h1 className="view-finances__title">{ name }</h1>

        <Form model="foo">
          <FinancesDetails
            name={ name }
            discount={ this.state.financesStore.get('discount') }
            dateFrom={ this.state.financesStore.get('date_from') } />

          <FinancesChart
            data={ this.state.financesStore.get('chart_data') }
            balance={ this.state.financesStore.get('balance') } />

          <FinancesTable
            data={ this.state.financesStore.get('line_items') }
            discount={ this.state.financesStore.get('discount') }
            balance={ this.state.financesStore.get('balance') }
            discountTotal={ this.state.financesStore.get('discount_total') }
            debitTotal={ this.state.financesStore.get('debit_total') }
            creditTotal={ this.state.financesStore.get('credit_total') } />
        </Form>

        <LineGraphComp store={ this.state.financesStore } />

        <UserDialog />

      </div>
    );
  }
}

export default connect(Finances, FinancesStore);
