import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../config.js';
import Navbar from './Navbar.jsx';
import { STEPS, getStage } from './stage.js';

export default function Track() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    fetch(`${API}/orders/user/${user.id || user._id}`)
      .then((res) => res.json())
      .then((data) => setOrder(Array.isArray(data) ? data.find((o) => o._id === id) : null))
      .finally(() => setLoading(false));

    const timer = setInterval(() => setTick((t) => t + 1), 10000);
    return () => clearInterval(timer);
  }, [id]);

  if (loading) return <><Navbar /><section className="cart-box"><p>Loading...</p></section></>;
  if (!order) {
    return (
      <>
        <Navbar />
        <section className="cart-box">
          <h2>Order not found</h2>
          <Link to="/orders">Back to my orders</Link>
        </section>
      </>
    );
  }

  const stage = getStage(order.createdAt);

  return (
    <>
      <Navbar />
      <section className="cart-box">
        <h2>Track order</h2>
        <p>
          <strong>{order.restaurantName}</strong> · Order #{order._id.slice(-6).toUpperCase()}
        </p>

        <div className="tracker">
          {STEPS.map((step, i) => (
            <div key={step} className={`track-step ${i <= stage ? 'done' : ''} ${i === stage ? 'current' : ''}`}>
              <span className="dot">{i <= stage && stage === 3 ? '✓' : i < stage ? '✓' : i + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <p>{order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</p>
        <p>Total: ₹{order.total} · {order.payment}</p>
        <p>Delivering to: {order.address}</p>
        <Link to="/orders">← All my orders</Link>
      </section>
    </>
  );
}