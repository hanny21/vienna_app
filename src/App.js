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
      myMap: {},
      myLocations: [],
      myMarkers: [],
      showedMarkers: [],
      currentMarker: {},
      myInfoWindow: {},
    };
    this.showInfoWindow = this.showInfoWindow.bind(this);
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
      let id = locations[i].id;
      let title = locations[i].name;
      let position = {lat: locations[i].latitude, lng: locations[i].longitude};
      // create a marker per location, and set its attributes
      let marker = new window.google.maps.Marker({
        map: map,
        id: id,
        title: title,
        position: position,
        animation: window.google.maps.Animation.DROP,
      });
      markers.push(marker);
      // add listener to each marker to show the info window and
      // update the currentMarker in App state
      marker.addListener('click', () => {
        this.showInfoWindow(marker);
      });
    }
    // update the state of the App component
    this.setState({
      myMap: map,
      myLocations: locations,
      myMarkers: markers,
      showedMarkers: markers,
      myInfoWindow: largeInfowindow,
    });
  }

  showInfoWindow(marker) {
    this.setState({currentMarker: marker});
    const { myInfoWindow, myMap } = this.state;
    myInfoWindow.marker = marker;
    myInfoWindow.setContent('<h3>' + marker.title + '</h3>');
    myInfoWindow.open(myMap, marker);
    myInfoWindow.addListener('closeclick', () => myInfoWindow.setMarker = null);
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
              myLocations={ this.state.myLocations }
              myMarkers={ this.state.myMarkers }
              showInfoWindow={ this.showInfoWindow }
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
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCIdfdeONwrrY384AG12ytO-u0khoGIwIA&language=en']
)(App);
