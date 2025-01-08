import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./landing/home";
import Burger from "./Burger";
import {useCart } from "./CartContext";
import Cart from "./Cart";
import { ProductsData } from "./DataContext";
import History from "./History";

const App = () => {
  const { getCartCount } = useCart();


  const [theme, setTheme] = useState({
    primary: "warning",
    text: "dark",
    navBg: "warning",
  });

  const themes = {
    default: { primary: "warning", text: "dark", navBg: "warning" },
    dark: { primary: "dark", text: "light", navBg: "white" },
    light: { primary: "light", text: "dark", navBg: "dark" },
    colorful: { primary: "info", text: "dark", navBg: "info" },
  };

  const changeTheme = (selectedTheme) => {
    setTheme(themes[selectedTheme]);
  };

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
            className={`navbar navbar-expand-lg navbar-${theme.text} bg-${theme.navBg} w-100`}
            style={{
              borderRadius: "5px",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="container">
              <Link className="navbar-brand" to="/">
                <b> What A Burger </b>
              </Link>

              {/* Theme Switcher Dropdown */}
              <div className="me-3">
                <select
                  className="form-select"
                  onChange={(e) => changeTheme(e.target.value)}
                  style={{ width: "120px" }}
                >
                  <option value="default">Default</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="colorful">Colorful</option>
                </select>
              </div>

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
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div className="sub-container">
                  <ul className="navbar-nav" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/" style={{ borderRadius: "20px" }}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/menu" style={{ borderRadius: "20px" }}>
                        Burger
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/pizza" style={{ borderRadius: "20px" }}>
                        Pizza
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/drinks" style={{ borderRadius: "20px" }}>
                        Cold Drinks
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/about-us" style={{ borderRadius: "20px" }}>
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/contact-us" style={{ borderRadius: "20px" }}>
                        Contact Us
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link position-relative" to="/cart" style={{ borderRadius: "20px" }}>
                        <i className="bi bi-cart3"></i> Cart
                        {getCartCount() > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {getCartCount()}
                            <span className="visually-hidden">items in cart</span>
                          </span>
                        )}
                      </Link>
                    </li>

                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link className="nav-link" to="/order-history" style={{ borderRadius: "20px" }}>
                        Order History
                      </Link>
                    </li>
                   
                  </ul>
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

        <footer className={`bg-${theme.primary} text-${theme.text === "dark" ? "dark" : "white"} py-4`}>

          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p>
                  123 Main Street, Anytown USA
                  <br />
                  Phone: (123) 456-7890
                  <br />
                  Email: info@whataburger.com
                </p>
              </div>
              <div className="col-md-4">
                <h5>Follow Us</h5>
                <div className="d-flex justify-content-start">
                  <a href="" className="text-white me-3">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="" className="text-white me-3">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="" className="text-white me-3">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <h5>Newsletter</h5>
                <p>
                  Sign up for our newsletter to receive updates and special
                  offers.
                </p>
                <form>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      aria-label="Email"
                      aria-describedby="newsletter-btn"
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="newsletter-btn"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
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
