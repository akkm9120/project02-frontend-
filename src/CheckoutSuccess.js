const CheckoutSuccess = () => {
    const { clearCart } = useCart();
    
    useEffect(() => {
      clearCart();
    }, []);
  
    return (
      <div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your order.</p>
      </div>
    );
  };
  