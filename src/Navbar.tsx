import React from 'react';
const Navbar = () => {
return (
// class="osh-header"
<nav className="navbar">
  <div className="osh-header-titles-all">
    <a href="http://okothsimonhuma.com/" className="header-brand-link">
      <img src="/img/LOGOOOOOO.png" alt="" className="brand-icon-header" />
      <div className="osh-header-titles">
        <h1 className="titles-title">OKOTH SIMON HUMA</h1>
        <p className="titles-title-jd">VISUAL COMMUNICATION CONSULTANT</p>
      </div>
    </a>
  </div>
  <div className="osh-header-menu-btn">
    <div className="osh-header-menu-btn-burger"></div>
  </div>

  {/* class="osh-header-menu" */}
  <div className="links osh-header-menu">
    <a href="/about.html" className="header-links">ABOUT</a>
    <a href="/home" className="header-links">HOME</a>
  </div>
</nav>
);
}

export default Navbar;