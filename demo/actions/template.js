import Dispatcher from './../dispatcher';
import TemplateConstants from './../constants/template';
import Request from 'superagent';

let TemplateActions = {

  templateTableUpdated: (template, data) => {
    Dispatcher.dispatch({
      actionType: TemplateConstants.TEMPLATE_TABLE_UPDATED,
      template: template,
      items: data.rows
    });
  },

  templateTableRowClicked: (template, data) => {
    let code = data.get('value')

    Request
      .get('https://restcountries.eu/rest/v1/alpha/' + code)
      .end((err, response) => {
        let fetched = response.body;

        data = data.set('capital', fetched.capital);
        data = data.set('nativeName', fetched.nativeName);
        data = data.set('population', fetched.population);
        data = data.set('region', fetched.region);

        Dispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_TABLE_ROW_CLICKED,
          template: template,
          data: data
        });
      });
  },

  templateCloseTableDialog: (template) => {
    Dispatcher.dispatch({
      actionType: TemplateConstants.TEMPLATE_CLOSE_TABLE_DIALOG,
      template: template
    });
  },
};

export default TemplateActions;
