import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import Modal from "./Modal"
import CurrentLocation from './Map';

export class MapContainer extends Component {
    state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: null,          // Shows the active marker upon click
    selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
    activeMarkerLocation: {},
    markers: []    
  };
    
    onMarkerClick = (props, marker, e) =>
    {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  
  // Fetches squads from database and joins to the projects and tribes entities.
    componentDidMount() {
        const url = new URL("http://localhost:3001/api/data")
        fetch(url)
            .then(response => {
                response.json().then(jsonResponse => {
                    this.setState({
                        markers: jsonResponse.data
                    });
                })
            })
    }
  
    render() {
        const Markers = this.state.markers.map((marker) =>
            <Marker onClick={this.onMarkerClick} name={marker.name}
            position={{lat: marker.lat, lng: marker.lng}}/>
        );

    return (
        <div id='main'>
            <Modal/>
        <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            selectedPlace={this.state.selectedPlace}
            activeMarker={this.state.activeMarker}
        >

        {Markers}
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        
        </CurrentLocation>
        </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCnImliQVPh6bl0Loyxt2hk45sVPKbfmKU'
})(MapContainer);
