import React, { Component } from 'react';
import { MdMenu } from 'react-icons/md';
import PropTypes from 'prop-types';

const iconStyle = {
  'float': 'left',
  'paddingLeft': '25px',
  'fontSize': '1.5em',
  'color': '#fff',
};

class MenuIcon extends Component {
  render() {
    return <a href='#'
      style={iconStyle}      
      tabIndex='-1'
      onClick={this.props.toggleMenu} >
      <MdMenu />
    </a>;
  }
}

MenuIcon.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuIcon;
