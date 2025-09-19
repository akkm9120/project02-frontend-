import React from 'react' ;
import { Link} from 'react-router-dom';



export default function Home(){
   return <>
     {/* Hero Section */}
      <section className="hero-section py-5">
       <div className="container">
         <div className="row align-items-center">
           <div className="col-lg-6">
             <h1 className="display-4 fw-bold mb-4 text-warning">
               Delicious Fast Food Delivered Fresh
             </h1>
             <p className="lead mb-4 text-muted">
               Satisfy your cravings with our menu of high-quality ingredients and expert preparation. From juicy burgers to refreshing drinks, we've got everything you need.
             </p>
             <div className="d-flex gap-3">
               <Link to="/menu" className="btn btn-warning btn-lg px-4">
                 <i className="bi bi-arrow-right me-2"></i>Order Now
               </Link>
               <Link to="/cart" className="btn btn-outline-warning btn-lg px-4">
                 <i className="bi bi-cart3 me-2"></i>View Cart
               </Link>
             </div>
           </div>
           <div className="col-lg-6">
             <img 
               src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600" 
               alt="Delicious Burger" 
               className="img-fluid rounded shadow"
             />
           </div>
         </div>
       </div>
     </section>
      
      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-warning">Why Choose Us?</h2>
            <p className="lead text-muted">Fast, fresh, and delicious food delivered to your door</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4 text-center">
               <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3 feature-icon" style={{width: '80px', height: '80px'}}>
                 <i className="bi bi-clock fs-2 text-dark"></i>
               </div>
               <h4 className="fw-bold">Fast Delivery</h4>
               <p className="text-muted">Quick and reliable delivery to satisfy your hunger</p>
             </div>
             <div className="col-md-4 text-center">
               <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3 feature-icon" style={{width: '80px', height: '80px'}}>
                 <i className="bi bi-heart fs-2 text-dark"></i>
               </div>
               <h4 className="fw-bold">Fresh Ingredients</h4>
               <p className="text-muted">Made with the freshest, highest quality ingredients</p>
             </div>
             <div className="col-md-4 text-center">
               <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3 feature-icon" style={{width: '80px', height: '80px'}}>
                 <i className="bi bi-star fs-2 text-dark"></i>
               </div>
               <h4 className="fw-bold">Great Taste</h4>
               <p className="text-muted">Delicious flavors that will keep you coming back</p>
             </div>
          </div>
        </div>
      </section>

    </>

}