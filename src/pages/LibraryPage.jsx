import { useState } from 'react';
import './LibraryPage.css';
import Card from '../components/Card.jsx';

const initialBooks = [
  { id: 1, title: 'React para principiantes', price: 10, status: 'available', author: 'Juan Pérez', category: 'Tecnología', quantity: 5 },
  { id: 2, title: 'Node.js avanzado', price: 15, status: 'available', author: 'María García', category: 'Backend', quantity: 3 },
  { id: 3, title: 'Python para todos', price: 12, status: 'available', author: 'Carlos López', category: 'Programación', quantity: 8 },
];

export default function LibraryPage() {
  const [books, setBooks] = useState(initialBooks);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Tecnología');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('1');
  const [newDescription, setNewDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const buyBook = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'sold' } : b))
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const addDefaultBook = () => {
    const id = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    setBooks([
      ...books,
      {
        id,
        title: 'Nuevo Libro',
        author: 'Autor Desconocido',
        price: 5.00,
        category: 'General',
        quantity: 1,
        description: 'Libro agregado por defecto',
        status: 'available',
      },
    ]);
    setSuccessMessage('¡Libro por defecto agregado!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const sellBook = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newAuthor) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    const id = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    setBooks([
      ...books,
      {
        id,
        title: newTitle,
        author: newAuthor,
        price: parseFloat(newPrice),
        category: newCategory,
        quantity: parseInt(newQuantity),
        description: newDescription,
        status: 'available',
      },
    ]);
    setSuccessMessage('¡Libro agregado exitosamente!');
    setNewTitle('');
    setNewAuthor('');
    setNewPrice('');
    setNewQuantity('1');
    setNewDescription('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>📚 Vender un libro</h2>
          <p className="subtitle">Agrega tus libros al inventario</p>
        </div>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={sellBook} className="sell-form">
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ej: Clean Code"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Autor *</label>
            <input
              id="author"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Ej: Robert C. Martin"
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="form-input"
              >
                <option>Tecnología</option>
                <option>Ficción</option>
                <option>No Ficción</option>
                <option>Backend</option>
                <option>Frontend</option>
                <option>Programación</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity">Cantidad</label>
              <input
                id="quantity"
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                min="1"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Precio ($) *</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="0.00"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Cuenta más detalles sobre el libro..."
              className="form-textarea"
              rows="3"
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">✓ Agregar Libro</button>
        </form>

        <div className="book-list">
          <h3>📚 Libros en Inventario</h3>
          {books.length === 0 ? (
            <p>No hay libros en el inventario.</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id} className="book-item">
                  <div className="book-info">
                    <strong>{book.title}</strong> - ${book.price.toFixed(2)} ({book.status})
                  </div>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="delete-btn"
                  >
                    🗑️ Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <main className="main-content">
        <div className="cards-container">
          {books.map((book) => (
            <Card
              key={book.id}
              title={book.title}
              price={book.price}
              status={book.status}
              onBuy={() => buyBook(book.id)}
              onRent={() => rentBook(book.id)}
            />
          ))}
          
          {books.length < 3 && Array.from({ length: 3 - books.length }).map((_, idx) => (
            <Card key={`ph${idx}`} placeholder onAdd={addDefaultBook} />
          ))}
        </div>

        <footer className="footer">COMPONENTE UNO</footer>
      </main>
    </div>
  );
}
