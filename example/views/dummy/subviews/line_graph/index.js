import React from 'react';
import FinancesActions from './../../../../actions/finances';
import ImmutableHelper from 'utils/helpers/immutable';
import Immutable from 'immutable';
import LineGraph from 'components/line-graph';
import Row from 'components/row';
import FinancesStore from './../../../../stores/finances';
import { connect } from 'utils/flux';
import Textbox from 'components/textbox';
import InputGrid from 'components/input-grid';

class LineGraphComp extends React.Component {

  render() {
    let fields = [
      <Textbox name='point1' key='p1'/>,
      <Textbox name='point2' key='p2'/>,
      <Textbox name='point3' key='p3'/>,
      <Textbox name='point4' key='p4'/>,
      <Textbox name='point5' key='p5'/>
    ]

    return (
      <div>

        <LineGraph
          title='Line Graph'
          data={ this.props.store.get('line_graph_data') } />

        <InputGrid
          name='linegraph' 
          data={ this.props.store.get('line_graph_items') }
          fields={ fields }
          updateRowHandler={ FinancesActions.financesLineGraphGridUpdated }
          deleteRowHandler={ FinancesActions.financesLineGraphItemDeleted } >
        </InputGrid>

      </div>
    );
  }
}

export default connect(LineGraphComp, FinancesStore);
