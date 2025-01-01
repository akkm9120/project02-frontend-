import React from 'react' ;
import { Link} from 'react-router-dom';



export default function Home(){
   return <><main className="container my-5">
     <div className="row">
       <div className="col main-content">
         <h1
           className="display-4 fw-bold mb-4"
           style={{
             color: '#eaa628',
             textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
           }}
         >
           Mouthwatering Burgers, Savory Pizzas, and Refreshing Drinks
         </h1>
         <p
           className="lead"
           style={{
             fontFamily: "'Roboto', sans-serif",
             fontSize: '1.2rem',
             color: '#333',
           }}
         >
           Satisfy your cravings with our menu of high-quality ingredients and expert preparation. Indulge in the perfect balance of flavors and textures, from our juicy burgers to our delectable pizzas and thirst-quenching beverages.
         </p>
       </div>
       <div className="d-flex gap-2 mt-4">
         <Link to="/menu" className="btn btn-info">
           Order Burgers
         </Link>
         <Link to="/menu" className="btn btn-info">
           Order Pizzas
         </Link>
         <Link to="/menu" className="btn btn-info">
           Order Drinks
         </Link>
       </div>
     </div>
   </main><div
     className="container d-flex justify-content-between align-items-center py-3 rounded-pill"
     id="threebtns"
   >
       <Link
         to="/"
         className="ms-5 d-flex align-items-center text-decoration-none"
       >
         <i className="bi bi-house-fill me-2"></i>
         <span className="fw-bold">What a Burger</span>
       </Link>
       <div className="d-flex gap-2">
         <Link to="/user" className="btn btn-light">
           <i className="bi bi-person-fill"></i> Login
         </Link>
         <Link to="/wishlist" className="btn btn-light">
           <i className="bi bi-heart-fill"></i> Your Wishlist
         </Link>
       
       </div>
     </div><div className="container my-5 overflow-auto">
       <section className="hero-image">
         <div className="container d-flex h-100 align-items-center justify-content-center">
           <h2 className="display-4 text-white text-shadow">
             The tastiest burgers, pizzas & drinks in town!
           </h2>
         </div>
       </section>
       <section className="container">
         <h2 className="text-center mb-4">What's on the Menu?</h2>
         <div className="row">
           <div className="col-md-4 mb-3">
             <div className="card h-100">
               <img
                 src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600]"
                 className="card-img-top"
                 alt="Delicious Burger" />
               <div className="card-body">
                 <h5 className="card-title">Juicy Burgers</h5>
                 <p className="card-text">
                   Made with fresh, high-quality ingredients. Choose from our
                   classic cheeseburger, or build your own!
                 </p>
                 <Link to="/burger" className="btn btn-primary">
                   View Burgers
                 </Link>
               </div>
             </div>
           </div>
           <div className="col-md-4 mb-3">
             <div className="card h-100">
               <img
                 src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600"
                 className="card-img-top"
                 alt="Hot and Cheesy Pizza" />
               <div className="card-body">
                 <h5 className="card-title">Perfect Pizzas</h5>
                 <p className="card-text">
                   From classic pepperoni to gourmet creations, we have a
                   pizza for every craving.
                 </p>
                 <Link to="/pizza" className="btn btn-primary">
                   Explore Pizzas
                 </Link>
               </div>
             </div>
           </div>
           <div className="col-md-4 mb-3">
             <div className="card h-100">
               <img
                 src="https://images.pexels.com/photos/1148215/pexels-photo-1148215.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                 className="card-img-top"
                 alt="Refreshing Drinks" />
               <div className="card-body">
                 <h5 className="card-title">Refreshing Drinks</h5>
                 <p className="card-text">
                   Pair your meal with a cold soda, ice tea, or one of our
                   specialty drinks.
                 </p>
                 <Link to="/drink" className="btn btn-primary">
                   See Drinks Menu
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>

    </>

}