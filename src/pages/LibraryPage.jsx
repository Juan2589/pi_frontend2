import { useState } from 'react';
import './LibraryPage.css';
import Card from '../components/Card.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const initialBooks = [
  { id: 1, title: 'React para principiantes', price: 45000, status: 'available', author: 'Juan Pérez', category: 'Tecnología', quantity: 5, description: 'Aprende React desde cero con ejemplos prácticos' },
  { id: 2, title: 'Node.js avanzado', price: 65000, status: 'available', author: 'María García', category: 'Backend', quantity: 3, description: 'Domina Node.js con técnicas avanzadas' },
  { id: 3, title: 'Python para todos', price: 55000, status: 'available', author: 'Carlos López', category: 'Programación', quantity: 8, description: 'Introducción completa a Python' },
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
      prev.map((b) => {
        if (b.id === id) {
          const newQuantity = b.quantity - 1;
          return {
            ...b,
            quantity: newQuantity,
            status: newQuantity === 0 ? 'sold' : 'available'
          };
        }
        return b;
      })
    );
    setSuccessMessage('¡Libro comprado exitosamente!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const rentBook = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'rented' } : b))
    );
    setSuccessMessage('¡Libro rentado exitosamente!');
    setTimeout(() => setSuccessMessage(''), 3000);
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
        price: 30000,
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
    <div className="page-wrapper">
      <Navbar />
      <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Vender un libro</h2>
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
            <label htmlFor="price">Precio (COP) *</label>
            <input
              id="price"
              type="number"
              step="1000"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="30000"
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
          
          <button type="submit" className="submit-btn">Agregar Libro</button>
        </form>

        <div className="book-list">
          <h3>Libros en Inventario</h3>
          {books.length === 0 ? (
            <p>No hay libros en el inventario.</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id} className="book-item">
                  <div className="book-info">
                    <strong>{book.title}</strong> - ${book.price.toLocaleString('es-CO')} ({book.status})
                  </div>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="delete-btn"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1>Catálogo de Libros Virtuales</h1>
          <p>Explora nuestra colección de libros digitales. Compra o renta tus favoritos.</p>
        </div>
        
        <div className="cards-container">
          {books.length > 0 && books.map((book) => (
            <Card
              key={book.id}
              title={book.title}
              author={book.author}
              category={book.category}
              price={book.price}
              status={book.status}
              quantity={book.quantity}
              description={book.description}
              onBuy={() => buyBook(book.id)}
              onRent={() => rentBook(book.id)}
            />
          ))}
          
          {books.length === 0 && Array.from({ length: 3 }).map((_, idx) => (
            <Card key={`ph${idx}`} placeholder onAdd={addDefaultBook} />
          ))}
        </div>
      </main>
    </div>
    
    <Footer />
    </div>
  );
}
