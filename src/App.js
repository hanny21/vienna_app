import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import './App.css';
import ListOfPlaces from './ListOfPlaces';
import MenuIcon from './MenuIcon';
import * as data from './locations.json';
import * as mapStyle from './mapStyle.json';
import fetchJsonp from 'fetch-jsonp';
import { MdError } from 'react-icons/md';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      myMap: {},
      myLocations: [],
      myMarkers: [],
      currentMarker: {},
      myInfoWindow: {},
      googleMapsError: false,
      wikiError: false,
      menuIsOpen: true,
    };
    this.showInfoWindow = this.showInfoWindow.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentWillReceiveProps ({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {
      this.initMap();
    } else {
      this.setState({googleMapsError: true});
    }
  }

  initMap() {
    // create the map
    const locations = [...data];
    // add the content for each location using Wikipedia API
    for (let location of locations ) {
      // replace the space in the search string according to wiki API rules
      let searchString = location.searchString.replace(' ', '%20');
      let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchString}`;
      // using fetchJsonp instead just fetch to avoid problem with CORS
      fetchJsonp(url)
        .then((response) => response.json())
        .then((data) => {
          let content = data.query.pages[Object.keys(data.query.pages)[0]].extract;
          location.content = content;
        })
        .catch(() => {
          location.content = 'content from Wikipedia is not available, chek your Internet connection and reload the page';
          this.setState({wikiError: true});
        });
    }
    const markers = [];
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.210033, lng: 16.363449},
      zoom: 13,
      mapTypeControl: false,
      styles: mapStyle,
    });
    // create InfoWindow
    const largeInfowindow = new window.google.maps.InfoWindow();
    // create the markers
    for (let location of locations) {
      let id = location.id;
      let title = location.name;
      let position = {lat: location.latitude, lng: location.longitude};
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
      myInfoWindow: largeInfowindow,
      googleMapsError: false,
    });
  }

  showInfoWindow(marker) {
    // check if the info window for a marker is not already open
    if (marker.id !== this.state.currentMarker.id) {
      const { myInfoWindow, myMap } = this.state;
      // animate the marker
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => marker.setAnimation(window.google.maps.Animation.NONE), 1000);
      myMap.setCenter(marker.position);
      // set and open the infowindow
      myInfoWindow.marker = marker;
      // filter the corresponding location to have access to location content
      let location = this.state.myLocations.filter((location) => location.id === marker.id);
      let urlTitle = location[0].searchString.replace(' ', '_');
      // if the content for Wikipedia was not loaded, the link should go to Wikipedia main page
      let wikiUrl = this.state.wikiError ? 'https://en.wikipedia.org/wiki/' : `https://en.wikipedia.org/wiki/${urlTitle}`;
      myInfoWindow.setContent(`<div tabIndex="0"><h3> ${marker.title} </h3><p>${location[0].content}</p><a href="${wikiUrl}" target="_blank">see more info on Wikipedia</a></div>`);
      myInfoWindow.open(myMap, marker);
      myInfoWindow.addListener('closeclick', () => myInfoWindow.setMarker = null);
      this.setState({currentMarker: marker});
    }
  }

  toggleMenu() {
    const listMenu = document.querySelector('.list');
    const map = document.querySelector('.containerMap');
    const open = this.state.menuIsOpen;
    console.log('open:' + open);
    open ? listMenu.style.marginLeft = '-300px' : listMenu.style.marginLeft = '0px';
    open ? map.style.width = '100%' : map.style.width = 'calc(100% - 300px)';
    this.setState({menuIsOpen: !open});
  }

  render() {
    return (
      <div className="App" role="main">
        <header className="App-header">
          <h1 className="App-title">
            <MenuIcon
              toggleMenu={ this.toggleMenu }
            />
            Top 10 places in Vienna
          </h1>
        </header>
        <div className="container">
          <div className="list">
            <ListOfPlaces
              myLocations={ this.state.myLocations }
              myMarkers={ this.state.myMarkers }
              showInfoWindow={ this.showInfoWindow }
              myInfoWindow={ this.state.myInfoWindow }
            />
          </div>
          <div id="map" className="containerMap" role="application">
            {/* load the error message if Google Map not loaded properly */} 
            {this.state.googleMapsError ? <div className="error"><MdError className="exclamationMark" />Google Map cannot be loaded :( <br/> Check your internter connection and reload the page. </div> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCIdfdeONwrrY384AG12ytO-u0khoGIwIA&language=en']
)(App);
