import { useState } from 'react';
import './LibraryPage.css';
import Card from '../components/Card.jsx';

const initialBooks = [
  { id: 1, title: 'React para principiantes', price: 10, status: 'available' },
  { id: 2, title: 'Node.js avanzado', price: 15, status: 'available' },
  { id: 3, title: 'Python para todos', price: 12, status: 'available' },
];

export default function LibraryPage() {
  const [books, setBooks] = useState(initialBooks);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const buyBook = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'sold' } : b))
    );
  };

  const rentBook = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'rented' } : b))
    );
  };

  const sellBook = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const id = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    setBooks([...
      books,
      { id, title: newTitle, price: parseFloat(newPrice), status: 'available' },
    ]);
    setNewTitle('');
    setNewPrice('');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Vender un libro</h2>
        <form onSubmit={sellBook} className="sell-form">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título"
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Precio"
          />
          <button type="submit">Enviar</button>
        </form>
      </aside>

      <main className="main-content">
        <div className="cards-container">
          {Array.from({ length: 3 }).map((_, idx) => {
            const book = books[idx];
            if (book) {
              return (
                <Card
                  key={book.id}
                  title={book.title}
                  price={book.price}
                  status={book.status}
                  onBuy={() => buyBook(book.id)}
                  onRent={() => rentBook(book.id)}
                />
              );
            }
            return <Card key={`ph${idx}`} placeholder />;
          })}
        </div>

        <footer className="footer">COMPONENTE UNO</footer>
      </main>
    </div>
  );
}
