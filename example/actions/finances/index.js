import Dispatcher from './../../dispatcher';
import FinancesConstants from './../../constants/finances';

let FinancesActions = {
  financesValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
    });
  },

  financesLineItemUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_ITEM_UPDATED,
      value: ev.target.value,
      name: props.name,
      row_id: props.row_id
    });
  },

  financesChartUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_CHART_UPDATED,
      name: props.name,
      value: ev.target.value
    });
  },

  financesLineItemDeleted: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_ITEM_DELETED,
      row_id: props.row_id
    });
  },

  financesLineGraphGridUpdated: (ev, props) => {
    console.log('dispatch update')
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_GRAPH_GRID_UPDATED,
      value: ev.target.value,
      name: props.name,
      row_id: props.row_id
    });
  },

  financesLineGraphItemDeleted: (ev, props) => {
    console.log('dispatch delete')
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_GRAPH_ITEM_DELETED,
      row_id: props.row_id
    });
  }
};

export default FinancesActions;
