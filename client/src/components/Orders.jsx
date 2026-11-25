import { Link } from 'react-router-dom';
import { STEPS, getStage } from './stage.js';
import { useEffect, useState } from 'react';
import { API } from '../config.js';
import Navbar from './Navbar.jsx';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const id = user.id || user._id;
    fetch(`${API}/orders/user/${id}`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setError('Could not load your orders.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <section className="cart-box">
        <h2>My orders</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="cart-error">{error}</p>}
        {!loading && !error && orders.length === 0 && <p>No orders yet.</p>}

        {orders.map((o) => (
          <div className="order-card" key={o._id}>
            <strong>{o.restaurantName}</strong>
            <p>{new Date(o.createdAt).toLocaleString()}</p>
            <p>{o.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</p>
            <p>Total: ₹{o.total} · {STEPS[getStage(o.createdAt)]}</p>
            <Link to={`/track/${o._id}`}>Track order →</Link>
          </div>
        ))}
      </section>
    </>
  );
}