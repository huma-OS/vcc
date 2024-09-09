import React from 'react';
import { useState } from 'react';
import Menu from './Menu';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  };

return (
<nav className="navbarz webdevhov">
  <div className="osh-header-titles-all">
    <a href="http://okothsimonhuma.com/" className="header-brand-link">
      <img src="/img/LOGOOOOOO.png" alt="" className="brand-icon-header" />
      <div className="osh-header-titles">
        <h1 className="titles-title">OKOTH SIMON HUMA</h1>
        <p className="titles-title-jd">VISUAL COMMUNICATION CONSULTANT</p>
      </div>
    </a>
  </div>
  <div className={`osh-header-menu-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
    <div className="osh-header-menu-btn-burger"></div>
  </div>
  <Menu isOpen={menuOpen} closeMenu={closeMenu}/>
</nav>
);
}

export default Navbar;