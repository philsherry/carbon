import Dispatcher from './../../dispatcher';
import FinancesConstants from './../../constants/finances';
import Store from 'utils/flux/store';
import Immutable from 'immutable';
import ImmutableHelper from 'utils/helpers/immutable';
import BigNumber from 'bignumber.js';

let date = new Date();
// Hard code some initial data for the store
const data = ImmutableHelper.parseJSON({
  date_from: "2015-11-01",
  name: "My Finances",
  discount: false,
  chart_data: [
    {
      y: 0,
      name: 'Credit',
      label: '£',
      tooltip: 'this is how much you have!'
    },
    {
      y: 0,
      name: 'Discount',
      label: '£',
      tooltip: 'this is how much discount you get!',
      color: '#FFAB00',
      visible: false
    },
    {
      y: 0,
      name: 'Debit',
      label: '£',
      tooltip: 'this is how much you owe!',
      color: '#EA433F'
    }
  ],
  line_items: [
    {
      description: "This is my first item.",
      debit: "120.99",
      credit: "32.99",
      total: "-88.00"
    },
    {
      description: "This is my second item.",
      debit: "83.21",
      credit: "2.00",
      total: "-81.21"
    }
  ],
  line_graph_data: {
    xAxis: [
      date.getDate() - 2,
      date.getDate() - 1,
      date.getDate(),
      date.getDate() + 1,
      date.getDate() + 2
    ],
    yAxis: [
      { name: 'line1', data: [10, 20, 30, 40, 50] },
      { name: 'line2', data: [50, 40, 30, 20, 10] }
    ]
  },
  line_graph_items: [
    {
      point1: 10,
      point2: 20,
      point3: 30,
      point4: 40,
      point5: 50
    },
    {
      point1: 50,
      point2: 40,
      point3: 30,
      point4: 20,
      point5: 10
    }
  ]
});

class FinancesStore extends Store {

  [FinancesConstants.FINANCES_LINE_GRAPH_GRID_UPDATED](action) {
    // update this value in the store
    this.data = ImmutableHelper.updateLineItem([this.data, 'line_graph_items', action.row_id, action.name], Number(action.value));

    let index = 0;
    let scope = this
    console.log("BEFORE", this.data.getIn(['line_graph_data', 'yAxis']).toJS());
    this.data.get('line_graph_items').forEach(function(item) { 
       let chart_line = [];
       item.forEach(function(value, key) { 
         if (key != '_row_id') {
           chart_line.push(value)
         }
       })
       scope.data = scope.data.setIn(['line_graph_data', 'yAxis', index, 'data'], ImmutableHelper.parseJSON(chart_line));
       index++;
     }) 
    console.log("After", this.data.getIn(['line_graph_data', 'yAxis']).toJS());
  }



  constructor(name, data, Dispatcher, opts = {}) {
    super(name, data, Dispatcher, opts);

    // setup some initial calculated data for this store
    this.data = updateTotals(this.data, 'credit');
    this.data = updateTotals(this.data, 'debit');
    if (this.data.get('discount')) { this.data = updateTotals(this.data, 'discount'); }
    this.data = updateChartData(this.data);
    this.data = updateBalance(this.data);
  }

  /**
   * Subscribe this store to the following actions...
   */

  [FinancesConstants.FINANCES_CHART_UPDATED](action) {
    this.data = this.data.setIn(['line_graph_data', 'yAxis', Number(action.name[action.name.length - 1])], Number(action.value));
  }

  [FinancesConstants.FINANCES_VALUE_UPDATED](action) {
    // update this value in the store
    this.data = this.data.set(action.name, action.value);

    // update other data affected by this change
    if (action.name == 'discount') {
      this.data = updateTotals(this.data, 'credit');
      this.data = updateTotals(this.data, 'debit');
      this.data = updateTotals(this.data, 'discount');
      this.data = updateChartData(this.data);
      this.data = updateBalance(this.data);
    }
  }

  [FinancesConstants.FINANCES_LINE_ITEM_UPDATED](action) {
    // update this value in the store
    this.data = ImmutableHelper.updateLineItem([this.data, 'line_items', action.row_id, action.name], action.value);

    // update other data affected by this change
    let name = ImmutableHelper.parseLineItemAttribute(action.name, 2)
    if (name == 'credit' || name == 'debit' || name == 'discount'){
      this.data = updateTotals(this.data, name);
      this.data = updateChartData(this.data);
      this.data = updateBalance(this.data);
    }
  }

  [FinancesConstants.FINANCES_LINE_ITEM_DELETED](action) {
    // update this value in the store
    this.data = ImmutableHelper.deleteLineItem([this.data, 'line_items', action.row_id], action.value);

    // update other data affected by this change
    this.data = updateTotals(this.data, 'credit');
    this.data = updateTotals(this.data, 'debit');
    if (this.data.get('discount')) { this.data = updateTotals(this.data, 'discount'); }
    this.data = updateChartData(this.data);
    this.data = updateBalance(this.data);
  }
}

/**
 * Private methods to mutate data...
 */

/**
 * Calculates the total balance
 */
function updateBalance(data) {
  let debitTotal = new BigNumber(data.get('debit_total'));
  let creditTotal = new BigNumber(data.get('credit_total'));
  let balance = creditTotal.minus(debitTotal);
  if (data.get('discount')) {
    let discountTotal = new BigNumber(data.get('discount_total'));
    balance = balance.plus(discountTotal);
  }
  return data.set('balance', balance.toFixed(2));
};

/**
 * Calculates the data to be used in the chart
 */
function updateChartData(data) {
  data = data.setIn(['chart_data', 0, 'y'], getPercentage(data, data.get('credit_total')).toNumber());
  data = data.setIn(['chart_data', 0, 'label'], '£' + data.get('credit_total'));
  data = data.setIn(['chart_data', 2, 'y'], getPercentage(data, data.get('debit_total')).toNumber());
  data = data.setIn(['chart_data', 2, 'label'], '£' + data.get('debit_total'));

  if (data.get('discount')) {
    data = data.setIn(['chart_data', 1, 'y'], getPercentage(data, data.get('discount_total')).toNumber());
    data = data.setIn(['chart_data', 1, 'label'], '£' + data.get('discount_total'));
    data = data.setIn(['chart_data', 1, 'visible'], true)
  } else {
    data = data.setIn(['chart_data', 1, 'visible'], false)
  }

  return data;
};

/**
 * Updates the totals
 */
function updateTotals(data, name) {
  let total = new BigNumber('0.00');

  data.get('line_items').forEach((line, index) => {
    if (line.get(name)) {
      let c = line.get('credit') ? line.get('credit') : "0.00";
      let d = line.get('debit') ? line.get('debit') : "0.00";
      let credit = new BigNumber(c);
      let debit = new BigNumber(d);
      let lineTotal = credit.minus(debit);

      if (data.get('discount')) {
        let d = line.get('discount') ? line.get('discount') : "0.00";
        let discount = new BigNumber(d);
        lineTotal = lineTotal.plus(discount);
      }

      data = data.setIn(['line_items', index, 'total'], lineTotal.toFixed(2));

      total = total.plus(line.get(name));
    }
  });

  return data.set(name + '_total', total.toFixed(2));
};

/**
 * Returns a percentage for the credit and debit totals
 */
function getPercentage(data, val) {
  let value = new BigNumber(val);
  let debitTotal = new BigNumber(data.get('debit_total'));
  let creditTotal = new BigNumber(data.get('credit_total'));
  let total = debitTotal.plus(creditTotal);
  if (data.get('discount')) {
    let discountTotal = new BigNumber(data.get('discount_total'));
    total = total.plus(discountTotal);
  }
  return value.dividedBy(total).times(100);
};

// init the store with a name, data, dispatcher and enabled history
export default new FinancesStore('financesStore', data, Dispatcher, { history: true });
