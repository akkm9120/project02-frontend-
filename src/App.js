import React, { useState } from "react";
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


  const [currentTheme, setCurrentTheme] = useState("default");

  const themeConfig = {
    default: { 
      navbarClass: "navbar-modern",
      brandClass: "navbar-brand-modern"
    },
    dark: { 
      navbarClass: "navbar-modern navbar-dark",
      brandClass: "navbar-brand-modern"
    },
    light: { 
      navbarClass: "navbar-modern navbar-light",
      brandClass: "navbar-brand-modern"
    },
    colorful: { 
      navbarClass: "navbar-modern navbar-colorful",
      brandClass: "navbar-brand-modern"
    },
  };

  const changeTheme = (selectedTheme) => {
    setCurrentTheme(selectedTheme);
    // Apply theme-specific styles
    document.body.className = `theme-${selectedTheme}`;
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
            className={themeConfig[currentTheme].navbarClass}
          >
            <div className="container">
              <Link className={themeConfig[currentTheme].brandClass} to="/">
                What A Burger
              </Link>

              {/* Theme Switcher Dropdown */}
              <div className="me-3">
                <select
                  className="form-select theme-selector"
                  onChange={(e) => changeTheme(e.target.value)}
                  value={currentTheme}
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
                style={{ borderRadius: "12px" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div className="sub-container">
                  <ul className="navbar-nav" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/">
                        <i className="bi bi-house me-1"></i> Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/menu">
                        <i className="bi bi-shop me-1"></i> Burger
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/pizza">
                        <i className="bi bi-circle me-1"></i> Pizza
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/drinks">
                        <i className="bi bi-cup-straw me-1"></i> Drinks
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/about-us">
                        <i className="bi bi-info-circle me-1"></i> About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/contact-us">
                        <i className="bi bi-envelope me-1"></i> Contact
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern position-relative" to="/cart">
                        <i className="bi bi-cart3 me-1"></i> Cart
                        {getCartCount() > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge">
                            {getCartCount()}
                            <span className="visually-hidden">items in cart</span>
                          </span>
                        )}
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link nav-link-modern" to="/order-history">
                        <i className="bi bi-clock-history me-1"></i> Orders
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

        <footer className="footer-modern">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5><i className="bi bi-geo-alt me-2"></i>Contact Us</h5>
                <p>
                  123 Main Street, Anytown USA
                  <br />
                  <i className="bi bi-telephone me-2"></i>Phone: (123) 456-7890
                  <br />
                  <i className="bi bi-envelope me-2"></i>Email: info@whataburger.com
                </p>
              </div>
              <div className="col-md-4">
                <h5><i className="bi bi-share me-2"></i>Follow Us</h5>
                <div className="d-flex justify-content-start">
                  <a href="https://facebook.com/whataburger" className="social-link" aria-label="Follow us on Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://twitter.com/whataburger" className="social-link" aria-label="Follow us on Twitter">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://instagram.com/whataburger" className="social-link" aria-label="Follow us on Instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <h5><i className="bi bi-envelope-heart me-2"></i>Newsletter</h5>
                <p>
                  Sign up for our newsletter to receive updates and special
                  offers.
                </p>
                <form className="form-modern">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      aria-label="Email"
                      aria-describedby="newsletter-btn"
                    />
                    <button
                      className="btn btn-primary-modern"
                      type="button"
                      id="newsletter-btn"
                    >
                      <i className="bi bi-send me-1"></i>Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <div className="text-center">
              <p className="mb-0">© 2024 What a Burger. All rights reserved. Made with <i className="bi bi-heart-fill text-danger"></i> for food lovers.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
