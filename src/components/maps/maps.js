import React from 'react';
import classNames from 'classnames';

class Maps extends React.Component {

  // Move to helper?
  geocoder = new google.maps.Geocoder();

  geocodeLocation = (location, callback) => {
    this.geocoder.geocode({ address: location }, callback);
  }
  // -------


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
    this.geocodeLocation(this.props.center, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map = new google.maps.Map(document.getElementById(this.props.mapId), {
          center: results[0].geometry.location,
          disableDefaultUI: this.props.disableDefaultUI,
          zoom: 8
        });
      }
    });
    this.setMarkers();
  }

  componentDidUpdate() {
    this.geocodeLocation(this.props.center, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }

  setMarkers() {
    if (!this.props.children) { return; }

    this.props.children.forEach((marker) => {
      this.geocodeLocation(marker.props.position, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
            title: marker.props.title
          });
        }
      });
    });
  }

  get mainClasses() {
    return classNames('carbon-maps', this.props.className);
  }

  render() {
    return (
      <div className={ this.mainClasses } id={ this.props.mapId } />
    );
  }
}

export default Maps;
