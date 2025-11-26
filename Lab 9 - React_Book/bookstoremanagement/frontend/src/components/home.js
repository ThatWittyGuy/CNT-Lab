import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Our Online Book Store</h1>
        <p>Discover your next favorite book from our extensive collection</p>
        
        <div className="cta-buttons">
          <Link to="/catalogue" className="btn btn-primary">
            Browse Books
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Member Login
          </Link>
          <Link to="/register" className="btn btn-outline">
            Join Now
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📚 Wide Selection</h3>
          <p>Thousands of books across all genres</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Free shipping on orders over $25</p>
        </div>
        <div className="feature-card">
          <h3>⭐ Best Prices</h3>
          <p>Competitive pricing with daily deals</p>
        </div>
      </div>
    </div>
  );
}

export default Home;