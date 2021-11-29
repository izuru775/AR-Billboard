import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;

    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
    if (this.props.activeMarker != null) {
      this.calcRoute(true)
    }
    else if (prevProps.activeMarker != null && this.props.activeMarker == null) {
      this.calcRoute(false);
    }
  }
  
    recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      let marker = new google.maps.Circle({
        center: center, 
        radius: 2,
        strokeColor: "#0037ff",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#0037ff",
      fillOpacity: 1,
        map: map
      });
      map.panTo(center);
    }
  }
  
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.watchPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });

          // this.calcRoute();
        });
      }
    }

    this.loadMap();
  }
  
  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;



      const mapRef = this.refs.map;

      // reference to the actual DOM element      this.calcRoute();

      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
      
    }
  }

  calcRoute(route) {

    const google = this.props.google;
    const maps = google.maps;
    let directionsService = new google.maps.DirectionsService();
        if (global.directionsRenderer == null) {
          global.directionsRenderer = new google.maps.DirectionsRenderer();
        }
      let map = null;
      if (route) {
        map = this.map;
        global.directionsRenderer.setMap(map);
      }
      else {
        global.directionsRenderer.setMap(null);
      return;
      }
      
    const current = this.state.currentLocation;
    

    var selectedMode = 'WALKING'
    let destination = new google.maps.LatLng(this.props.selectedPlace.position.lat, this.props.selectedPlace.position.lng);
    let origin = new google.maps.LatLng(current.lat, current.lng);

    var request = {
      origin: origin,
      destination: destination,
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        global.directionsRenderer.setDirections(response);
      }
    });
  }
  
  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });

  }
  
  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

  CurrentLocation.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};

export default CurrentLocation;