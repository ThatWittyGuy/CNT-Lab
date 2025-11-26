
import React, { useEffect, useState } from "react";
import axios from "axios";

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all books from backend
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading books...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Book Catalogue</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {books.map((book) => (
            <div
              key={book.id} // assuming your books table has 'id'
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
                borderRadius: "5px",
              }}
            >
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogue;
