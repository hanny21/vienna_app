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
    const { myLocations, showInfoWindow } = this.props;
    let { myMarkers } = this.props;
    const { query } = this.state;
    let selectedMarker; // marker which was clicked
    let showedLocations; // locations that match regex expression

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showedLocations = myLocations.filter((location) => match.test(location.name));
      myMarkers = myMarkers.map((marker) => marker.setVisible(match.test(marker.title)));
    } else {
      showedLocations = myLocations;
      myMarkers = myMarkers.map((marker) => marker.setVisible(true));
    }
    // sort the list of places alphabetically
    showedLocations.sort(sortBy('name'));

    return <div>
      <input type='text'
        style={inputStyle}
        placeholder='Type to filter places...'
        value = {query}
        onChange = {(event) => this.updateQuery(event.target.value)}
      />
      <ul style={ulStyle}>
        { showedLocations.map((location) => (<li
          key={location.id}
          onClick={() => {
            selectedMarker = myMarkers.filter((marker) => marker.id === location.id);
            showInfoWindow(selectedMarker[0]);
          }}
          style={liStyle}>
          {location.name}
        </li>)) }
      </ul>
    </div>;
  }
}

ListOfPlaces.propTypes = {
  myLocations: PropTypes.array.isRequired,
  myMarkers: PropTypes.array.isRequired,
  showInfoWindow: PropTypes.func.isRequired,
};

export default ListOfPlaces;
