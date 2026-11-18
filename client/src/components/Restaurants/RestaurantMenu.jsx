import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import '../Food.css';

import { API } from '../../config.js';

function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/restaurants/${id}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.message);
        setRestaurant(data);
      })
      .catch((e) => setError(e.message || 'Could not load restaurant'));
  }, [id]);

  return (
    <div className="food-page">
      <Navbar />
      <section className="section">
        <Link to="/restaurants" className="back-link">← Back to restaurants</Link>

        {error && <p className="muted">{error}</p>}
        {!restaurant && !error && <p className="muted">Loading...</p>}

        {restaurant && (
          <>
            <div className="menu-head">
              <div className="card-emoji big">{restaurant.emoji}</div>
              <div>
                <h1 className="page-title">{restaurant.name}</h1>
                <p className="muted">{restaurant.description}</p>
                <p className="meta">
                  {restaurant.cuisine} · ⭐ {restaurant.rating} · {restaurant.deliveryTime}
                </p>
              </div>
            </div>

            <h2 className="section-title">Menu</h2>
            <div className="menu-list">
              {restaurant.menu.map((item) => (
                <div key={item._id} className="menu-item">
                  <div>
                    <span className={`dot ${item.veg ? 'veg' : 'nonveg'}`} />
                    <strong>{item.name}</strong>
                    <p className="muted">{item.description}</p>
                  </div>
                  <span className="price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default RestaurantMenu;