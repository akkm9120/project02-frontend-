import React from 'react' ;
import { Link} from 'react-router-dom';

export default function Home(){
   return (
     <>
       {/* Modern Hero Section */}
       <section className="hero-modern">
         <div className="container">
           <div className="row align-items-center">
             <div className="col-lg-8 hero-content fade-in-up">
               <h1 className="hero-title">
                 Delicious Food, <br />
                 <span className="text-gradient">Delivered Fast</span>
               </h1>
               <p className="hero-subtitle">
                 Satisfy your cravings with our menu of high-quality ingredients and expert preparation. 
                 From juicy burgers to delectable pizzas and refreshing beverages.
               </p>
               <div className="d-flex flex-wrap gap-3 mt-4">
                 <Link to="/menu" className="btn btn-primary-modern btn-modern">
                   <i className="bi bi-shop me-2"></i>Order Now
                 </Link>
                 <Link to="/about-us" className="btn btn-secondary-modern btn-modern">
                   <i className="bi bi-info-circle me-2"></i>Learn More
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Quick Actions Section */}
       <section className="container my-5">
         <div className="quick-actions">
           <div className="row text-center">
             <div className="col-12 mb-3">
               <h3 className="text-gradient fw-bold">What are you craving today?</h3>
             </div>
             <div className="col-md-4 mb-3">
               <Link to="/menu" className="quick-action-btn">
                 <i className="bi bi-shop me-2"></i>Juicy Burgers
               </Link>
             </div>
             <div className="col-md-4 mb-3">
               <Link to="/pizza" className="quick-action-btn">
                 <i className="bi bi-circle me-2"></i>Perfect Pizzas
               </Link>
             </div>
             <div className="col-md-4 mb-3">
               <Link to="/drinks" className="quick-action-btn">
                 <i className="bi bi-cup-straw me-2"></i>Cool Drinks
               </Link>
             </div>
           </div>
         </div>
       </section>

       {/* User Actions Bar */}
       <section className="container my-4">
         <div className="row bg-light rounded-modern p-3 shadow-modern">
           <div className="col-md-6 d-flex align-items-center">
             <Link to="/" className="d-flex align-items-center text-decoration-none">
               <i className="bi bi-house-fill me-2 text-primary"></i>
               <span className="fw-bold text-gradient">What a Burger</span>
             </Link>
           </div>
           <div className="col-md-6 d-flex justify-content-end gap-2">
             <Link to="/user" className="btn btn-outline-primary btn-modern">
               <i className="bi bi-person-fill me-1"></i> Login
             </Link>
             <Link to="/wishlist" className="btn btn-outline-danger btn-modern">
               <i className="bi bi-heart-fill me-1"></i> Wishlist
             </Link>
           </div>
         </div>
       </section>

       {/* Menu Showcase */}
       <section className="menu-section">
         <div className="container">
           <h2 className="section-title">What's on the Menu?</h2>
           <div className="row">
             <div className="col-md-4 mb-4 fade-in-up">
               <div className="card card-modern">
                 <img
                   src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600"
                   className="card-img-top"
                   alt="Delicious Burger"
                   onError={(e) => {
                     e.target.src = "https://via.placeholder.com/400x200/ff6b35/ffffff?text=Juicy+Burgers";
                   }}
                 />
                 <div className="card-body card-body-modern">
                   <h5 className="card-title card-title-modern">
                     <i className="bi bi-shop me-2 text-primary"></i>Juicy Burgers
                   </h5>
                   <p className="card-text card-text-modern">
                     Made with fresh, high-quality ingredients. Choose from our
                     classic cheeseburger, or build your own!
                   </p>
                   <Link to="/menu" className="btn btn-primary-modern btn-modern w-100">
                     <i className="bi bi-eye me-2"></i>View Burgers
                   </Link>
                 </div>
               </div>
             </div>
             
             <div className="col-md-4 mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
               <div className="card card-modern">
                 <img
                   src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600"
                   className="card-img-top"
                   alt="Hot and Cheesy Pizza"
                   onError={(e) => {
                     e.target.src = "https://via.placeholder.com/400x200/28a745/ffffff?text=Perfect+Pizzas";
                   }}
                 />
                 <div className="card-body card-body-modern">
                   <h5 className="card-title card-title-modern">
                     <i className="bi bi-circle me-2 text-success"></i>Perfect Pizzas
                   </h5>
                   <p className="card-text card-text-modern">
                     From classic pepperoni to gourmet creations, we have a
                     pizza for every craving.
                   </p>
                   <Link to="/pizza" className="btn btn-secondary-modern btn-modern w-100">
                     <i className="bi bi-search me-2"></i>Explore Pizzas
                   </Link>
                 </div>
               </div>
             </div>
             
             <div className="col-md-4 mb-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
               <div className="card card-modern">
                 <img
                   src="https://images.pexels.com/photos/1148215/pexels-photo-1148215.jpeg?auto=compress&cs=tinysrgb&w=400"
                   className="card-img-top"
                   alt="Refreshing Drinks"
                   onError={(e) => {
                     e.target.src = "https://via.placeholder.com/400x200/17a2b8/ffffff?text=Cool+Drinks";
                   }}
                 />
                 <div className="card-body card-body-modern">
                   <h5 className="card-title card-title-modern">
                     <i className="bi bi-cup-straw me-2 text-info"></i>Refreshing Drinks
                   </h5>
                   <p className="card-text card-text-modern">
                     Pair your meal with a cold soda, ice tea, or one of our
                     specialty drinks.
                   </p>
                   <Link to="/drinks" className="btn btn-primary-modern btn-modern w-100">
                     <i className="bi bi-cup me-2"></i>See Drinks Menu
                   </Link>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </>
   );
}