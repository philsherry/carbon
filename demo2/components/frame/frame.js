import React from 'React';
import ReactDOM from 'react-dom';

class Frame extends React.Component {

  componentDidMount() {
    this.renderFrameContents();
  }

  componentDidUpdate() {
    this.renderFrameContents();
  }

  componentWillUnmount() {
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
  }

  renderFrameContents() {
    let doc = this.frame.contentDocument
    if(doc.readyState === 'complete') {
       ReactDOM.render(this.props.children, doc.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  }

  render() {
    return <iframe ref={ (frame) => { this.frame = frame; } } />
  }
}

export default Frame
