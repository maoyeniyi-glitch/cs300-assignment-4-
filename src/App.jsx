import { useState } from "react";
import "./styles.css";
import books from "../data/books.json";

function Header() {
  return (
    <header>
      <h1>My Reading List</h1>
      <p>Manage your books and track your reading progress.</p>
    </header>
  );
}

function BookCard({ book, onRemove, onToggle }) {
  return (
    <article>
      <h2>{book.title}</h2>
      <p>Author: {book.creator}</p>
      <p>Category: {book.category}</p>
      <p>Status: {book.completed ? "Completed" : "Not Read"}</p>

      <button onClick={() => onToggle(book.id)}>
        {book.completed ? "Mark as Unread" : "Mark as Completed"}
      </button>

      <button onClick={() => onRemove(book.id)}>
        Remove Book
      </button>
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
      category: "General",
      completed: false
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

function CollectionControls({ filter, onFilterChange }) {
  return (
    <section>
      <label htmlFor="filter">Filter Books</label>

      <select
        id="filter"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All Books</option>
        <option value="unread">Not Read</option>
        <option value="completed">Completed</option>
      </select>
    </section>
  );
}

function BookList({ books, onRemove, onToggle }) {
  if (books.length === 0) {
    return <p>No matching books found.</p>;
  }

  return (
    <section>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}

export default function App() {
  const [collection, setCollection] = useState(books);
  const [filter, setFilter] = useState("all");

  function addBook(newBook) {
    setCollection((previous) => [...previous, newBook]);
  }

  function removeBook(id) {
    setCollection((previous) =>
      previous.filter((book) => book.id !== id)
    );
  }

  function toggleStatus(id) {
    setCollection((previous) =>
      previous.map((book) =>
        book.id === id
          ? { ...book, completed: !book.completed }
          : book
      )
    );
  }

  const filteredBooks = collection.filter((book) => {
    if (filter === "completed") return book.completed;
    if (filter === "unread") return !book.completed;
    return true;
  });

  return (
    <main>
      <Header />

      <BookForm onAdd={addBook} />

      <CollectionControls
        filter={filter}
        onFilterChange={setFilter}
      />

      <BookList
        books={filteredBooks}
        onRemove={removeBook}
        onToggle={toggleStatus}
      />
    </main>
  );
}