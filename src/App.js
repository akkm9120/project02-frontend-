import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./modern-styles.css";
import Home from "./landing/home";
import Burger from "./Burger";
import {useCart } from "./CartContext";
import Cart from "./Cart";
import { ProductsData } from "./DataContext";
import History from "./History";

const App = () => {
  const { getCartCount } = useCart();

  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <header
          className="header"
          style={{ position: "sticky", top: 0, zIndex: 1000 }}
        >
          <nav
              className="navbar navbar-expand-lg navbar-dark bg-warning w-100"
              style={{
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                  🍔 What A Burger
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  style={{ borderRadius: "20px" }}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                    <Link className="nav-link" to="/menu">
                      Menu
                    </Link>
                    <Link className="nav-link position-relative" to="/cart">
                      <i className="bi bi-cart3"></i> Cart
                      {getCartCount() > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {getCartCount()}
                          <span className="visually-hidden">items in cart</span>
                        </span>
                      )}
                    </Link>
                    <Link className="nav-link" to="/order-history">
                      Order History
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
        </header>

        <main style={{ flex: 1 }}>
         
            <ProductsData>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/menu" element={<Burger />} />
                <Route path="/order-history" element={<History/>} />
              </Routes>
            </ProductsData>
         
        </main>

        <footer className="bg-warning text-dark py-4">

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5>Contact Us</h5>
                <p>
                  123 Main Street, Anytown USA
                  <br />
                  Phone: (123) 456-7890
                  <br />
                  Email: info@whataburger.com
                </p>
              </div>
              <div className="col-md-6">
                <h5>Follow Us</h5>
                <div className="d-flex justify-content-start">
                  <a href="#" className="text-dark me-3">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-dark me-3">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="text-dark me-3">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              © 2024 What a Burger. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
