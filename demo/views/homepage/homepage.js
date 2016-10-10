import React from 'react';
import Pod from 'components/pod';
import Maps from 'components/maps';
import Marker from 'components/maps/marker';

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
        >
          <Marker title='foo' position='Jesmond UK' />
          <Marker title='foo' position='Durham UK' />
        </Maps>
      </Pod>
    );
  }
}

export default Homepage;
