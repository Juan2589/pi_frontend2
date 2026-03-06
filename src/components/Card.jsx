import React from 'react';
import './Card.css';

export default function Card({
  title,
  author,
  category,
  price,
  status,
  quantity,
  description,
  onBuy,
  onRent,
  placeholder = false,
  onAdd,
}) {
  if (placeholder) {
    return (
      <div className="card static-card placeholder">
        <div className="card-cover placeholder-cover">
          <div className="placeholder-icon">+</div>
        </div>
        <div className="card-body">
          <h3 className="card-title">Agregar Nuevo Libro</h3>
          <p className="placeholder-text">Haz clic para añadir un libro al catálogo</p>
          <button
            className="placeholder-btn"
            onClick={onAdd}
          >
            + Añadir libro
          </button>
        </div>
      </div>
    );
  }

  const rentPrice = (price * 0.15).toFixed(0);

  return (
    <div className={`card ${status === 'sold' ? 'sold' : status === 'rented' ? 'rented' : ''}`}>
      <div className="card-cover">
        <div className="book-icon"></div>
        <div className="category-badge">{category}</div>
        {status !== 'available' && (
          <div className="status-overlay">
            {status === 'sold' ? 'VENDIDO' : 'RENTADO'}
          </div>
        )}
      </div>
      
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-author">Autor: {author}</p>
        {description && <p className="card-description">{description}</p>}
        
        <div className="card-info">
          <div className="price-section">
            <div className="price-item">
              <span className="price-label">Comprar:</span>
              <span className="price-value">${price.toLocaleString('es-CO')}</span>
            </div>
            <div className="price-item">
              <span className="price-label">Rentar:</span>
              <span className="price-value rent-price">${(+rentPrice).toLocaleString('es-CO')}</span>
            </div>
          </div>
          {quantity && (
            <div className="stock-info">
              Stock: <span className={quantity > 0 ? 'in-stock' : 'out-stock'}>{quantity}</span>
            </div>
          )}
        </div>
      </div>
      
      {status === 'available' && (
        <div className="card-actions">
          <button className="btn-buy" onClick={onBuy}>
            Comprar
          </button>
          <button className="btn-rent" onClick={onRent}>
            Rentar
          </button>
        </div>
      )}
      
      {status === 'sold' && (
        <div className="card-status-message sold-message">
          Este libro ya fue vendido
        </div>
      )}
      
      {status === 'rented' && (
        <div className="card-status-message rented-message">
          Actualmente rentado
        </div>
      )}
    </div>
  );
}
