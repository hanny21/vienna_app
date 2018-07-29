import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  'marginLeft': '5px',
  'border': '1px solid #fff',
  'borderRadius': '5px',
  'width': '75%'
};

class ListOfPlaces extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    const { myLocations, myMarkers, showInfoWindow } = this.props;
    let selectedMarker;
    return <div>
      <input type='text' style={inputStyle} placeholder='Type to filter places...'/>
      <ul style={ulStyle}>
        { myLocations.map((location) => (<li
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
