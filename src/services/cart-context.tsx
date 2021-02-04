import * as React from 'react';
import { Product, CartItem, CartContextType } from '../api/woocommerce.d';

export const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const onAddToCart = (product: Product) => {

    let exists = false;
    const newState = cartItems.map(currentItem => {
      if (currentItem.product.id === product.id) {
        exists = true;
        return {
          ...currentItem,
          quantity: currentItem.quantity + 1,
        };
      } else {
        return currentItem;
      }
    });

    if (exists) {
        setCartItems(newState);
    } else {
        const newItem: CartItem = {
          product: product,
          quantity: 1,
        };
        setCartItems([...cartItems, newItem]);
    }
  };

  const onDeductOne = (product: Product) => {

    let exists = false;
    const newState = cartItems.map(currentItem => {
      if (currentItem.product.id === product.id) {
        exists = true;
        const amount = (currentItem.quantity > 0 ? 1 : 0);
        return {
          ...currentItem,
          quantity: currentItem.quantity - amount,
        };
      } else {
        return currentItem;
      }
    });

    if (exists) {
        setCartItems(newState);
    }
  };

  const onClearCart = () => {
    setCartItems([]);
  };
  
  const onRemoveFromCart = (product: Product) => {
    setCartItems(items => cartItems.filter((item: CartItem) => item.product.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, onAddToCart, onRemoveFromCart, onClearCart, onDeductOne }}>
      {children}
    </CartContext.Provider>
  );
};
