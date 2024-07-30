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
     <Link to="/video" className="header-links" onClick={closeMenu}>VIDEO</Link>
     <Link to="/photography" className="header-links" onClick={closeMenu}>PHOTOGRAPHY</Link>
     <Link to="/design-art-direction" className="header-links" onClick={closeMenu}>ART DIRECTION</Link>
     {/* <Link to="/design.html" className="header-links" onClick={closeMenu}>DESIGN</Link> */}
     <Link to="/web-development" className="header-links" onClick={closeMenu}>WEB DEVELOPMENT</Link>
     <Link to="mailto:info@okothsimonhuma.com" className="header-links" onClick={closeMenu}>CONTACT</Link>
  </div>
   );
}
 
export default Menu;