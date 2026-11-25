import { useState } from "react";
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

function BookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [titleError, setTitleError] = useState("");
  const [creatorError, setCreatorError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const validTitle = title.trim();
    const validCreator = creator.trim();

    setTitleError(validTitle ? "" : "Enter a title.");
    setCreatorError(validCreator ? "" : "Enter an author.");

    if (!validTitle || !validCreator) {
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: validTitle,
      creator: validCreator,
      category: "General"
    });

    setTitle("");
    setCreator("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Book Title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-describedby="title-error"
        aria-invalid={!!titleError}
      />
      <p id="title-error">{titleError}</p>

      <label htmlFor="creator">Author</label>
      <input
        id="creator"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        aria-describedby="creator-error"
        aria-invalid={!!creatorError}
      />
      <p id="creator-error">{creatorError}</p>

      <button type="submit">Add Book</button>
    </form>
  );
}

export default function App() {
  const [collection, setCollection] = useState(books);

  function addBook(newBook) {
    setCollection((previous) => [...previous, newBook]);
  }

  return (
    <main>
      <h1>My Reading List</h1>

      <BookForm onAdd={addBook} />

      {collection.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </main>
  );
}