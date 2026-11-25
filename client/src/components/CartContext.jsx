import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const EMPTY = { restaurant: null, items: [] };

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || EMPTY;
    } catch {
      return EMPTY;
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const add = (restaurant, dish) => {
    const newItem = { name: dish.name, price: dish.price, quantity: 1 };

    if (cart.restaurant && cart.restaurant.id !== restaurant.id && cart.items.length > 0) {
      if (!window.confirm('Your cart has items from another restaurant. Start a new cart?')) return;
      setCart({ restaurant, items: [newItem] });
      return;
    }

    setCart((c) => {
      const exists = c.items.find((i) => i.name === dish.name);
      const items = exists
        ? c.items.map((i) => (i.name === dish.name ? { ...i, quantity: i.quantity + 1 } : i))
        : [...c.items, newItem];
      return { restaurant, items };
    });
  };

  const change = (name, delta) => {
    setCart((c) => {
      const items = c.items
        .map((i) => (i.name === name ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0);
      return { restaurant: items.length ? c.restaurant : null, items };
    });
  };

  const clear = () => setCart(EMPTY);
  const count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, add, change, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);