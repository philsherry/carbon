import Dispatcher from 'dispatcher';
import InvoicingConstants from 'constants/invoicing';

export default {
  updateValue: (index, type, value, id) => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.UPDATE_VALUE,
      index, type, value, id
    })
  },

  updateCarriage: (value) => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.UPDATE_CARRIAGE,
      value
    })
  },

  updateExchangeRate: (ev) => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.UPDATE_EXCHANGE_RATE,
      value: ev.target.value
    })
  },

  toggleForeignCurrency: () => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.TOGGLE_FOREIGN_CURRENCY
    })
  },

  toggleUpdateAll: () => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.UPDATE_ALL
    })
  },

  deleteLine: (index) => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.DELETE_LINE,
      index
    })
  },

  copyLine: (index) => {
    Dispatcher.dispatch({
      actionType: InvoicingConstants.COPY_LINE,
      index
    })
  },

  reorder: (dragIndex, hoverIndex) => {
    setTimeout(() => {
      Dispatcher.dispatch({
        actionType: InvoicingConstants.REORDER,
        dragIndex, hoverIndex
      })
    })
  }
}
