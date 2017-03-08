import BigNumber from 'bignumber.js';

export default {
  toForeignCurrency: (enabled, value, exchangeRate) => {
    if (enabled) {
      value = new BigNumber(value || 0);
      return value.times(exchangeRate);
    } else {
      return value;
    }
  },

  toBaseCurrency: (enabled, value, exchangeRate) => {
    if (enabled) {
      value = new BigNumber(value || 0);
      return value.dividedBy(exchangeRate);
    } else {
      return value;
    }
  }
}
