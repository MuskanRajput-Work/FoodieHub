import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { API } from '../config.js';
import Navbar from './Navbar.jsx';

export default function Cart() {
  const { cart, change, clear, total } = useCart();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const placeOrder = async () => {
    setError('');
    if (address.trim().length < 5) return setError('Please enter your full address.');
    if (!/^\d{10}$/.test(phone)) return setError('Phone number must be 10 digits.');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || user._id,
          userName: user.name,
          restaurantId: cart.restaurant.id,
          items: cart.items.map((i) => ({ name: i.name, quantity: i.quantity })),
          address,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not place order');
      setOrderId(data.orderId);
      clear();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <>
        <Navbar />
        <section className="cart-box">
          <h2>Order placed! 🎉</h2>
          <p>Your order id: <strong>{orderId}</strong></p>
          <p>Payment: Cash on delivery</p>
          <Link to="/orders">View my orders</Link>
          {' · '}
          <Link to="/restaurants">Order more</Link>
        </section>
      </>
    );
  }

  if (cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <section className="cart-box">
          <h2>Your cart is empty</h2>
          <Link to="/restaurants">Browse restaurants</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="cart-box">
        <h2>Your cart · {cart.restaurant.name}</h2>

        {cart.items.map((item) => (
          <div className="cart-row" key={item.name}>
            <span>{item.name}</span>
            <div className="qty">
              <button onClick={() => change(item.name, -1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => change(item.name, 1)}>+</button>
            </div>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <p className="cart-total">Total: ₹{total}</p>

        <input
          className="cart-input"
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="cart-input"
          placeholder="Phone number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />

        {error && <p className="cart-error">{error}</p>}

        <button className="add-btn big" onClick={placeOrder} disabled={loading}>
          {loading ? 'Placing order...' : 'Place order (Cash on delivery)'}
        </button>
      </section>
    </>
  );
}