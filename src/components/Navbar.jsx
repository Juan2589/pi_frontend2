import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (section) => {
    setIsOpen(false);
    console.log(`Navegando a: ${section}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo" onClick={() => handleLinkClick('inicio')}>
          <span className="logo-text">Biblioteca Virtual</span>
        </a>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="#" className="navbar-link" onClick={() => handleLinkClick('inicio')}>
            Inicio
          </a>
          <a href="#" className="navbar-link" onClick={() => handleLinkClick('biblioteca')}>
            Biblioteca
          </a>
          <a href="#" className="navbar-link" onClick={() => handleLinkClick('acerca')}>
            Acerca de
          </a>
          {isAdmin && (
            <a href="#" className="navbar-link admin-link" onClick={() => handleLinkClick('admin')}>
              Admin
            </a>
          )}
          <div className="navbar-divider"></div>
          <button className="navbar-btn login-btn" onClick={() => handleLinkClick('login')}>
            Acceder
          </button>
        </div>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
