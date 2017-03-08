import React from 'react';
import InvoicingStore from 'stores/invoicing';
import InvoicingActions from 'actions/invoicing';
import { connect } from 'carbon/lib/utils/flux';
import AppWrapper from 'carbon/lib/components/app-wrapper';
import Row from 'carbon/lib/components/row';
import Totals from './totals';
import Checkbox from 'carbon/lib/components/checkbox';
import Decimal from 'carbon/lib/components/decimal';
import LineItems from './line-items';

class Invoicing extends React.Component {
  render() {
    return (
      <AppWrapper>
        <Row>
          <Checkbox
            label="Update All"
            value={ this.state.invoicingStore.get('update_all') }
            onChange={ InvoicingActions.toggleUpdateAll }
          />

          <Checkbox
            label="Enable Foreign Currency"
            value={ this.state.invoicingStore.get('foreign_currency') }
            onChange={ InvoicingActions.toggleForeignCurrency }
          />

          <Decimal
            label="Exchange Rate"
            labelInline={ true }
            value={ this.state.invoicingStore.get('exchange_rate') }
            onChange={ InvoicingActions.updateExchangeRate }
            precision={ 10 }
            disabled={ !this.state.invoicingStore.get('foreign_currency') }
          />
        </Row>

        <Row>
          <LineItems
            foreignCurrency={ this.state.invoicingStore.get('foreign_currency') }
            exchangeRate={ this.state.invoicingStore.get('exchange_rate') }
            lineItems={ this.state.invoicingStore.get('line_items') }
          />
        </Row>

        <Totals
          carriage={ this.state.invoicingStore.get('carriage') }
          discount={ this.state.invoicingStore.get('discount') }
          netAmount={ this.state.invoicingStore.get('net_amount') }
          taxAmount={ this.state.invoicingStore.get('tax_amount') }
          total={ this.state.invoicingStore.get('total') }
          foreignCurrency={ this.state.invoicingStore.get('foreign_currency') }
          exchangeRate={ this.state.invoicingStore.get('exchange_rate') }
        />
      </AppWrapper>
    );
  }
}

export default connect(Invoicing, InvoicingStore);
