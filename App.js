import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState(""); 
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  
  const searchBooks = async () => {
    if (!query) return; 
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Something went wrong while fetching!");
      const data = await res.json();
      setBooks(data.docs.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const clearResults = () => {
    setQuery("");
    setBooks([]);
    setError("");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: 20,
        textAlign: "center",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h1>📚 Book Finder</h1>
      <p>Search for any book by title using the Open Library API.</p>

    
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()} 
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />

    
        <button
          onClick={searchBooks}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        
        <button
          onClick={clearResults}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

  
      {loading && <p>Loading results...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

  
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {books.map((book) => (
          <div
            key={book.key}
            style={{
              width: "160px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
          
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "150px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  borderRadius: "5px",
                }}
              >
                No Cover
              </div>
            )}

            
            <h4 style={{ fontSize: "14px", margin: "10px 0 5px" }}>
              {book.title}
            </h4>
            <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>
              {book.author_name ? book.author_name[0] : "Unknown Author"}
            </p>
            <p style={{ fontSize: "12px", color: "gray", margin: 0 }}>
              {book.first_publish_year || ""}
            </p>

      
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "8px",
                fontSize: "12px",
                color: "#2196F3",
                textDecoration: "none",
              }}
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
