import React from 'react';
import Textarea from 'components/textarea';
import Length from 'utils/validations/length';

class Test extends React.Component {

  state = {
    value: ''
  }

  updateTextarea = (ev) => {
    this.setState({ value: ev.target.value });
  }

  render() {
    return (
      <div style={ { margin: '200px' } }>
        <Textarea
          value={ this.state.value }
          enforceCharacterLimit={ false }
          warnOverLimit={ true }
          characterLimit='10'
          rows='10'
          onChange={ this.updateTextarea }
          validations={ [ new Length({ max: 10 }) ] }
        />
      </div>
    );
  }
}

export default Test;
