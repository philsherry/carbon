import React from 'react';
import Highlight from 'react-highlight';
import Row from 'components/row';
import Link from 'components/link';
import Checkbox from 'components/checkbox';
import Pod from 'components/pod';
import Icon from 'components/icon';
import Dialog from 'components/dialog';
import { Tabs, Tab } from 'components/tabs';
import { TableAjax, TableHeader, TableRow, TableCell } from 'components/table-ajax';

import { connect } from 'utils/flux';
import TemplateActions from './../../../actions/template';
import TemplateStore from './../../../stores/template';

class GridDialogPatternDemo extends React.Component {

  get identifier() {
    return 'grid_dialog_pattern';
  }

  get tableHeaderRow() {
    return(
      <TableRow key="header" uniqueID='header' as='header'>
        <TableHeader name="name" style={{ width: "200px" }}>
          Country
        </TableHeader>
        <TableHeader name="value">
          Code
        </TableHeader>
      </TableRow>
    );
  }

  get tableRows() {
    let data = this.state.templateStore.getIn([this.identifier, 'data']);

    return data.map((row, index) => {
      return (
        <TableRow
          key={ index }
          uniqueID={ row.get('name') }
          onClick={ TemplateActions.templateTableRowClicked.bind(this, this.identifier, row) }
        >
          <TableCell>{ row.get('name') }</TableCell>
          <TableCell>{ row.get('value') }</TableCell>
        </TableRow>
      );
    });
  }

  get dialog() {
    let country = this.state.templateStore.getIn([this.identifier, 'dialog', 'data']);

    if (country) {
      let name = `${ country.get('name') } (${country.get('nativeName')})`;

      return (
        <Dialog
          title={ name }
          size='small'
          open={ this.state.templateStore.getIn([this.identifier, 'dialog', 'open']) }
          onCancel={ TemplateActions.templateCloseTableDialog.bind(this, this.identifier) }
        >
          <Row>
            <span>Code: { country.get('value') }</span>
            <span>Captial: { country.get('capital') }</span>
          </Row>
          <Row>
            <span>Population: { country.get('population') }</span>
            <span>Region: { country.get('region') }</span>
          </Row>
        </Dialog>
      );
    }
  }

  /**
   * @method render
   */
  render() {
    return (
      <Pod className="ui-example" title='Grid Dialog Pattern'>
        <h5>Example</h5>
        <TableAjax
          onChange={ TemplateActions.templateTableUpdated.bind(this, this.identifier) }
          path="/countries"
          paginate={ true }
          showPageSizeSelection={ true }
          thead={ this.tableHeaderRow }
        >
          { this.tableRows }
        </TableAjax>
        
        { this.dialog }
        <h5>Code</h5>
        { this.code }
      </Pod>
    );
  }


  get code() {
    return (
      <Tabs>
        <Tab title='View' tabId='view-tab'>
          <Highlight className="javascript">
            { this.viewCode }
          </Highlight>
        </Tab>

        <Tab title='Store' tabId='store-tab'>
          Store
        </Tab>

        <Tab title='Actions' tabId='actions-tab'>
          Action
        </Tab>

        <Tab title='Constants' tabId='contants-tab'>
          Constant
        </Tab>

      </Tabs>
    );
  }

  get viewCode() {
    let html = 'class GridDialogPattern extends React.Component {'
    html += '  get tableHeaderRow() {\n'
    html += '    return(\n'
    html += '      <TableRow key="header" uniqueID="header" as="header">\n'
    html += '        <TableHeader name="name" style={{ width: "200px" }}>\n'
    html += '          Country\n'
    html += '        </TableHeader>\n'
    html += '        <TableHeader name="value">\n'
    html += '          Code\n'
    html += '        </TableHeader>\n'
    html += '      </TableRow>\n'
    html += '    );\n'
    html += ' }\n'

    html += 'get tableRows() {\n'
    html += '  let data = this.state.templateStore.get("data");\n'

    html += '  return data.map((row, index) => {\n'
    html += '    return (\n'
    html += '      <TableRow\n'
    html += '        key={ index }\n'
    html += '        uniqueID={ row.get("name") }\n'
    html += '        onClick={ TemplateActions.templateTableRowClicked.bind(this, row) }\n'
    html += '      >\n'
    html += '        <TableCell>{ row.get("name") }</TableCell>\n'
    html += '        <TableCell>{ row.get("value") }</TableCell>\n'
    html += '      </TableRow>\n'
    html += '    );\n'
    html += '  });\n'
    html += '}\n'

    html += 'get dialog() {\n'
    html += '  let country = this.state.templateStore.getIn(["dialog", "data"]);\n'

    html += '  if (country) {\n'
    html += '    let name = `${ country.get("name") } (${country.get("nativeName")})`;\n'

    html += '    return (\n'
    html += '      <Dialog\n'
    html += '        title={ name }\n'
    html += '        size="small"\n'
    html += '        open={ this.state.templateStore.getIn([this.identifier, "dialog", "open"]) }\n'
    html += '        onCancel={ TemplateActions.templateCloseTableDialog.bind(this, this.identifier) }\n'
    html += '       >\n'
    html += '         <Row>\n'
    html += '          <span>Code: { country.get("value") }</span>\n'
    html += '          <span>Captial: { country.get("capital") }</span>\n'
    html += '        </Row>\n'
    html += '        <Row>\n'
    html += '          <span>Population: { country.get("population") }</span>\n'
    html += '          <span>Region: { country.get("region") }</span>\n'
    html += '        </Row>\n'
    html += '      </Dialog>\n'
    html += '    );\n'
    html += '  }\n'
    html += '}\n'

    html += '  render() {\n'
    html += '    return (\n'
    html += '      <Pod title="Grid Dialog Pattern">\n'
    html += '        <TableAjax\n'
    html += '          onChange={ TemplateActions.templateTableUpdated.bind(this, this.identifier) }\n'
    html += '          path="/countries"\n'
    html += '          paginate={ true }\n'
    html += '          showPageSizeSelection={ true }\n'
    html += '          thead={ this.tableHeaderRow }\n'
    html += '        >\n'
    html += '          { this.tableRows }\n'
    html += '        </TableAjax>\n'
          
    html += '        { this.dialog }\n'
    html += '      </Pod>\n'
    html += '    );\n'
    html += '  }\n'
    html += '}\n'
    html += '\n\nexport default connect(GridDialogPattern, TemplateStore);'

    return html;
  }
}

export default connect(GridDialogPatternDemo, TemplateStore);
