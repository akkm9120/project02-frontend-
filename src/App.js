import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./landing/home";

const App = () => {
  return (
    <Router>
      <div>
        <header className="header">
          <nav
            className="navbar navbar-expand-lg navbar-light bg-warning w-100"
            style={{
              borderRadius: "5px",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="container">
              <Link
                className="navbar-brand"
                to="/"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                }}
              >
               <b> What A Burger </b>
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
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <div className="sub-container">
                  <ul
                    className="navbar-nav"
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link
                        className="nav-link"
                        to="/"
                        style={{ borderRadius: "20px" }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link
                        className="nav-link"
                        to="/burger"
                        style={{ borderRadius: "20px" }}
                      >
                        Burger
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link
                        className="nav-link"
                        to="/pizza"
                        style={{ borderRadius: "20px" }}
                      >
                        Pizza
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link
                        className="nav-link"
                        to="/drinks"
                        style={{ borderRadius: "20px" }}
                      >
                        Cold Drinks
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link
                        className="nav-link"
                        to="/about-us"
                        style={{ borderRadius: "20px" }}
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item" style={{ borderRadius: "20px" }}>
                      <Link
                        className="nav-link"
                        to="/contact-us"
                        style={{ borderRadius: "20px" }}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>

        <footer
          className="bg-warning text-white py-4"
          style={{ marginBottom: "0%" }}
        >
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
                  <a href="#" className="text-white me-3">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-white me-3">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="text-white me-3">
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
              &copy; 2024 What a Burger. All rights reserved.
            </div>
          </div>
        </footer>  bn 
      </div>
    </Router>
  );
};

export default App;
