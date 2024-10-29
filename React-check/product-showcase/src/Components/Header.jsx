import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="logo">Surge</div>
    <ul className="menu">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/bottle">Bottle</Link></li>
      <li><Link to="/can">Can</Link></li>
    </ul>
    <div className="search">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
    </div>
  </header>
);

export default Header;
