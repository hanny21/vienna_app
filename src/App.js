import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import './App.css';
import * as data from './locations.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      map: '',
      markers: [],
      locations: [],
    };
  }

  componentWillReceiveProps ({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {
      this.initMap();
    }
  }

  initMap() {
    // create the map
    let { locations, markers } = this.state;
    locations = [...data];
    let myMap = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.210033, lng: 16.363449},
      zoom: 13,
      mapTypeControl: false,
    });
    this.setState({map: myMap});
    // create the markers
    for (let i = 0; i < locations.length; i++) {
      let title = locations[i].name;
      let position = {lat: locations[i].latitude, lng: locations[i].longitude};
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        map: myMap,
        id: i,
        title: title,
        position: position,
        animation: window.google.maps.Animation.DROP,
      });
      markers.push(marker);
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
            list of places...
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
