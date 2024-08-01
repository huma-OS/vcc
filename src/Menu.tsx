import React from "react";
import { Link } from 'react-router-dom';

interface MenuProps {
  isOpen: Boolean;
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({isOpen, closeMenu}) => {
  return ( 
    <div className={`links osh-header-menu ${isOpen ? 'active-menu' : ''}`} onClick={closeMenu}>
     <Link to="/about" className="header-links" onClick={closeMenu}>ABOUT</Link>
     <Link to="/" className="header-links" onClick={closeMenu}>HOME</Link>
     <Link to="/gallery/videography" className="header-links" onClick={closeMenu}>VIDEOGRAPHY</Link>
     <Link to="/gallery/photography" className="header-links" onClick={closeMenu}>PHOTOGRAPHY</Link>
     <Link to="/gallery/art direction & design" className="header-links" onClick={closeMenu}>ART DIRECTION & DESIGN</Link>
     <Link to="/gallery/web development" className="header-links" onClick={closeMenu}>WEB DEVELOPMENT</Link>
     <a href="mailto:info@okothsimonhuma.com" className="header-links" onClick={closeMenu}>CONTACT</a>
  </div>
   );
}
 
export default Menu;