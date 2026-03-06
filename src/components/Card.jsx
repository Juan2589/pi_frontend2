import React from 'react';
import './Card.css';

export default function Card({
  title,
  price,
  status,
  onBuy,
  onRent,
  placeholder = false,
}) {
  if (placeholder) {
    return (
      <div className="card static-card placeholder">
        <div className="card-header">COMPONENTE TRES</div>
        <div className="card-body">
          <div>TÍTULO</div>
          <button
            className="placeholder-btn"
            onClick={() => alert('Agrega un libro al inventario')}
          >
            + Añadir libro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div>${price.toFixed(2)}</div>
        <div className="status">{status}</div>
      </div>
      {status === 'available' && (
        <div className="card-actions">
          <button onClick={onBuy}>Comprar</button>
          <button onClick={onRent}>Rentar</button>
        </div>
      )}
    </div>
  );
}
