import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-main">
          <h3>Biblioteca Virtual</h3>
          <p>Tu destino para libros digitales de calidad</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#libros">Catálogo</a></li>
            <li><a href="#novedades">Novedades</a></li>
            <li><a href="#ofertas">Ofertas</a></li>
            <li><a href="#ayuda">Ayuda</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>info@bibliotecavirtual.com</p>
          <p>+57 (1) 123-4567</p>
          <p>Bogotá, Colombia</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Biblioteca Virtual. Todos los derechos reservados.</p>
        <div className="footer-social">
          <a href="#facebook">Facebook</a>
          <span>|</span>
          <a href="#twitter">Twitter</a>
          <span>|</span>
          <a href="#instagram">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
