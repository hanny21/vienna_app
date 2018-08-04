import React, { Component } from 'react';
import { MdMenu } from 'react-icons/md';

const iconStyle = {
  'float': 'left',
  'paddingLeft': '25px',
  'fontSize': '1.5em',
  'color': '#fff',
};

class MenuIcon extends Component {
  render() {
    return <a href='#' style={iconStyle}><MdMenu /></a>;
  }
}

export default MenuIcon;
