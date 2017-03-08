import Dispatcher from 'dispatcher';
import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';
import InvoicingConstants from 'constants/invoicing';
import BigNumber from 'bignumber.js';
import guid from 'carbon/lib/utils/helpers/guid';

let data = ImmutableHelper.parseJSON({
  line_items: [{
    id: '1',
    quantity: '1',
    rate: '5',
    discount: '0',
    tax: '20',
    tax_amount: '1',
    net_amount: '5',
    total: '6'
  }, {
    id: '2',
    quantity: '5',
    rate: '10',
    discount: '0',
    tax: '20',
    tax_amount: '10',
    net_amount: '50',
    total: '60'
  }, {
    id: '3',
    quantity: '1',
    rate: '20',
    discount: '0',
    tax: '0',
    tax_amount: '0',
    net_amount: '20',
    total: '20'
  }],
  foreign_currency: false,
  exchange_rate: '1.5',
  carriage: '0',
  discount: '0',
  net_amount: '75',
  tax_amount: '11',
  total: '86',
  update_all: false
});

class InvoicingStore extends Store {
  [InvoicingConstants.UPDATE_VALUE](action) {
    this.data = this.data.setIn(['line_items', action.index, 'id'], action.id);

    if (!this.data.get('update_all')) {
      this.data = this.data.setIn(['line_items', action.index, action.type], action.value || 0);
      this.recalculateLineItem(action.index);
    } else {
      this.data = this.data.set('line_items', this.data.get('line_items').map((item) => {
        return item.set(action.type, action.value || 0);
      }));

      this.data.get('line_items').forEach((item, index) => {
        this.recalculateLineItem(index);
      });
    }

    this.recalculateInvoiceTotals();
  }

  [InvoicingConstants.UPDATE_CARRIAGE](action) {
    this.data = this.data.set('carriage', action.value);
    this.recalculateInvoiceTotals();
  }

  [InvoicingConstants.UPDATE_EXCHANGE_RATE](action) {
    this.data = this.data.set('exchange_rate', action.value);
  }

  [InvoicingConstants.TOGGLE_FOREIGN_CURRENCY](action) {
    this.data = this.data.set('foreign_currency', !this.data.get('foreign_currency'));
  }

  [InvoicingConstants.UPDATE_ALL](action) {
    this.data = this.data.set('update_all', !this.data.get('update_all'));
  }

  [InvoicingConstants.DELETE_LINE](action) {
    this.data = this.data.deleteIn(['line_items', action.index]);
  }

  [InvoicingConstants.COPY_LINE](action) {
    let line = this.data.getIn(['line_items', action.index]);
    line = line.set("id", guid());
    this.data = this.data.set('line_items', this.data.get('line_items').push(line));
    this.recalculateInvoiceTotals();
  }

  [InvoicingConstants.REORDER](action) {
    let item = this.data.getIn(['line_items', action.dragIndex]);
    this.data = this.data.deleteIn(['line_items', action.dragIndex]);
    this.data = this.data.set('line_items', this.data.get('line_items').insert(action.hoverIndex, item));
  }

  recalculateLineItem = (index) => {
    this.data = this.data.updateIn(['line_items', index], (item) => {
      let rate = new BigNumber(item.get('rate') || 0),
          quantity = new BigNumber(item.get('quantity') || 0),
          discount = new BigNumber(item.get('discount') || 0),
          tax = new BigNumber(item.get('tax') || 0),
          netAmount = rate.times(quantity).minus(discount),
          taxAmount = netAmount.dividedBy(100).times(tax),
          total = netAmount.add(taxAmount);

      return item.set('net_amount', netAmount.toString())
                 .set('tax_amount', taxAmount.toString())
                 .set('total', total.toString());
    });
  }

  recalculateInvoiceTotals = () => {
    let carriage = new BigNumber(this.data.get('carriage') || 0),
        carriageTax = carriage.times(0.2),
        total = carriage.add(carriageTax),
        netAmount = carriage,
        taxAmount = carriageTax,
        discount = new BigNumber(0);

    this.data.get('line_items').forEach((item) => {
      discount = discount.add(item.get('discount') || 0);
      netAmount = netAmount.add(item.get('net_amount') || 0);
      taxAmount = taxAmount.add(item.get('tax_amount') || 0);
      total = total.add(item.get('total') || 0);
    });

    this.data = this.data.set('discount', discount.toString());
    this.data = this.data.set('net_amount', netAmount.toString());
    this.data = this.data.set('tax_amount', taxAmount.toString());
    this.data = this.data.set('total', total.toString());
  }
}

export default new InvoicingStore('invoicingStore', data, Dispatcher);
