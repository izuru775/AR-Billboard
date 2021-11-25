import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import Modal from "./Modal"
import CurrentLocation from './Map';

const markers = [
    {
        name: "Location 1",
        lat: "-37.80625873487332",
        lng: "144.9592512868676",
        billboard: "public/images/..."
    },
    {
        name: "Location 2",
        lat: "-37.80794563234061",
        lng: " 144.95793168189437",
        billboard: "public/images/..."
    },
    {
        name: "Location 3",
        lat: "-37.80486340798545",
        lng: "144.96691989317253",
        billboard: "public/images/..."
    },
    {
        name: "Location 4",
        lat: "-37.792203120470745",
        lng: "144.9713367741883",
        billboard: "public/images/..."
    },
    { 
        name: "Location 5",
        lat: "-37.77931015685815",
        lng: "144.95515622038786",
        billboard: "public/images/..."
    }
]

export class MapContainer extends Component {
    state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
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
        activeMarker: null
      });
    }
  };
    render() {
        const Markers = markers.map((marker) =>
            <Marker onClick={this.onMarkerClick} name={marker.name}
            position={{lat: marker.lat, lng: marker.lng}}/>
        );

    return (
        <div id='main'>
            <Modal/>
        <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
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
