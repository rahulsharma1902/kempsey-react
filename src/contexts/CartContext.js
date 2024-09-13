import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const tempId = localStorage.getItem('user_temp_id') || '';
    const form = new FormData();
    form.append('tempId', tempId);
    try {
        const response = await axios.get('https://sagmetic.site/2023/laravel/kempsey/public/api/cart/count', {
            form
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    //   const response = await axios.post('/api/cart/count', form);
    console.log(response);
    //   setCartCount(response.data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };