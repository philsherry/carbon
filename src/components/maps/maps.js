import React from 'react';
import classNames from 'classnames';

class Maps extends React.Component {

  geocoder = new google.maps.Geocoder();
  map;

  static defaultProps = {
    disableDefaultUI: true,
    mapId: 'map',
    zoom: 8
  }

  shouldComponentUpdate(nextProps) {
    return this.props.center !== nextProps.center;
  }

  componentDidMount() {
    this.geocodeLocation((results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map = new google.maps.Map(document.getElementById(this.props.mapId), {
          center: results[0].geometry.location,
          disableDefaultUI: this.props.disableDefaultUI,
          zoom: 8
        });
      }
    });
  }

  componentDidUpdate() {
    this.geocodeLocation((results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }

  get mainClasses() {
    return classNames('carbon-maps', this.props.className);
  }

  geocodeLocation = (callback) => {
    this.geocoder.geocode({ address: this.props.center }, callback);
  }

  render() {
    return (
      <div className={ this.mainClasses } id={ this.props.mapId } />
    );
  }
}

export default Maps;
