import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import './App.css';
import ListOfPlaces from './ListOfPlaces';
import * as data from './locations.json';
import * as mapStyle from './mapStyle.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      myMap: '',
      myLocations: [],
      myMarkers: [],
      showedMarkers: [],
      myInfoWindow: '',
      currentMarker: {}
    };
  }

  componentWillReceiveProps ({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {
      this.initMap();
    }
  }

  initMap() {
    // create the map
    let locations = [...data];
    let markers = [];
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.210033, lng: 16.363449},
      zoom: 13,
      mapTypeControl: false,
      styles: mapStyle,
    });
    // create InfoWindow
    const largeInfowindow = new window.google.maps.InfoWindow();
    // create the markers
    for (let i = 0; i < locations.length; i++) {
      let title = locations[i].name;
      let position = {lat: locations[i].latitude, lng: locations[i].longitude};
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        map: map,
        id: i,
        title: title,
        position: position,
        animation: window.google.maps.Animation.DROP,
      });
      markers.push(marker);
      // update the state of the component
      this.setState({
        myMap: map,
        myLocations: locations,
        myMarkers: markers,
        showedMarkers: markers,
        myInfoWindow: largeInfowindow,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My favourite places in Vienna</h1>
        </header>
        <div className="container">
          <div className="list">
            <ListOfPlaces
              myLocations={this.state.myLocations}
            />
          </div>
          <div id="map" className="containerMap" role="application">
          </div>
        </div>
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCIdfdeONwrrY384AG12ytO-u0khoGIwIA']
)(App);
