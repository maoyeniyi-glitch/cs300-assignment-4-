import "./styles.css";
import books from "../data/books.json";

function BookCard({ book }) {
  return (
    <article>
      <h2>{book.title}</h2>
      <p>Author: {book.creator}</p>
      <p>Category: {book.category}</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <h1>My Reading List</h1>

      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </main>
  );
}