import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

const ulStyle = {
  'listStyleType': 'none',
  'padding': '0px',
};

const liStyle = {
  'textAlign': 'center',
  'color': '#fff',
  'fontWeight': 'bold',
  'lineHeight': '3',
  'cursor': 'pointer',
  'textDecoration': 'none',
};

const inputStyle = {
  'marginTop': '20px',
  'padding': '15px',
  'border': '1px solid #fff',
  'borderRadius': '5px',
  'width': '75%'
};

class ListOfPlaces extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
    };
  }

  updateQuery(q) {
    this.setState({ query: q.trim() });
  }

  render() {
    const { myLocations, myMarkers, showInfoWindow, myInfoWindow } = this.props;
    const { query } = this.state;
    let selectedMarker; // marker which was clicked
    let showedLocations; // locations that match regex expression
    let markers; // eslint-disable-line no-unused-vars

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showedLocations = myLocations.filter((location) => match.test(location.name));
      markers = myMarkers.map((marker) => marker.setVisible(match.test(marker.title)));
      // close infoWindow when the marker is hidden
      if ((myInfoWindow.marker) && (!match.test(myInfoWindow.marker.title))) {
        myInfoWindow.close();
      }
    } else {
      showedLocations = myLocations;
      markers = myMarkers.map((marker) => marker.setVisible(true));
    }
    // sort the list of places alphabetically
    showedLocations.sort(sortBy('name'));

    return <div>
      <input type='text'
        style={inputStyle}
        placeholder='Type to filter places...'
        value = {query}
        aria-label='type here to filter the locations'
        onChange = {(event) => this.updateQuery(event.target.value)}
      />
      <nav>
        <ul style={ulStyle}>
          { showedLocations.map((location) => (<li role="button"
            key={location.id}
            onClick={() => {
              selectedMarker = myMarkers.filter((marker) => marker.id === location.id);
              showInfoWindow(selectedMarker[0]);
            }}
            style={liStyle}>
            {/* using a tag to add list of places to tab-order, so user can navigate the page using tab key */}
            <a href='#' style={liStyle} aria-label={`select ${location.name}`}>{location.name}</a>
          </li>)) }
        </ul>
      </nav>
    </div>;
  }
}

ListOfPlaces.propTypes = {
  myLocations: PropTypes.array.isRequired,
  myMarkers: PropTypes.array.isRequired,
  showInfoWindow: PropTypes.func.isRequired,
  myInfoWindow: PropTypes.object.isRequired,
};

export default ListOfPlaces;
