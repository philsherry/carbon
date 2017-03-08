import React from 'react';
import InvoicingActions from 'actions/invoicing';
import Decimal from 'carbon/lib/components/decimal';
import Pod from 'carbon/lib/components/pod';
import Row from 'carbon/lib/components/row';
import I18nHelper from 'carbon/lib/utils/helpers/i18n';
import MultiCurrency from './multi-currency';

class Totals extends React.Component {
  getValue = (value) => {
    return MultiCurrency.toForeignCurrency(this.props.foreignCurrency, value, this.props.exchangeRate)
  }

  updateCarriage = (ev) => {
    InvoicingActions.updateCarriage(MultiCurrency.toBaseCurrency(this.props.foreignCurrency, ev.target.value, this.props.exchangeRate));
  }

  baseValue = (value) => {
    if (this.props.foreignCurrency) {
      return "£" + I18nHelper.formatDecimal(value);
    } else {
      return null;
    }
  }

  render() {
    return (
      <Row columns="3">
        <Pod columnOffset="2">
          <Row>
            <div>
              <Decimal
                label="Carriage (20%)"
                value={ this.getValue(this.props.carriage) }
                labelInline={ true }
                onChange={ this.updateCarriage }
              />
              { this.baseValue(this.props.carriage) }
            </div>
          </Row>

          <Row>
            <div>
              <Decimal
                label="Discount"
                value={ this.getValue(this.props.discount) }
                labelInline={ true }
                readOnly
              />
              { this.baseValue(this.props.discount) }
            </div>
          </Row>

          <Row>
            <div>
              <Decimal
                label="Net Amount"
                value={ this.getValue(this.props.netAmount) }
                labelInline={ true }
                readOnly
              />
              { this.baseValue(this.props.netAmount) }
            </div>
          </Row>

          <Row>
            <div>
              <Decimal
                label="Tax Amount"
                value={ this.getValue(this.props.taxAmount) }
                labelInline={ true }
                readOnly
              />
              { this.baseValue(this.props.taxAmount) }
            </div>
          </Row>

          <Row>
            <div>
              <Decimal
                label="Total"
                value={ this.getValue(this.props.total) }
                labelInline={ true }
                readOnly
              />
              { this.baseValue(this.props.total) }
            </div>
          </Row>
        </Pod>
      </Row>
    );
  }
}

export default Totals;
