import React from 'react';
import Pod from 'components/pod';
import Maps from 'components/maps';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <Pod className="carbon-homepage">
        Carbon
        <Maps
          center='Newcastle'
          className='myMap'
          mapId='foo'
        />
      </Pod>
    );
  }
}

export default Homepage;
