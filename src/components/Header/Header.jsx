import React from 'react';
import './Header.css';

const Header = ({title}) => {
  return (
  <h3 className='header'>{title}</h3>
  )
}

export default Header