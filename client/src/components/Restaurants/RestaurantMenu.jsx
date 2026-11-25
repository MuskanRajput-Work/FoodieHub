import { useCart } from '../CartContext.jsx';
import CartBar from '../CartBar.jsx';
import Photo from '../Photo.jsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import '../Food.css';

import { API } from '../../config.js';

function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState('');
  const { cart, add, change } = useCart();
const qty = (name) => cart.items.find((i) => i.name === name)?.quantity || 0;

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
              <Photo file={restaurant.image} fallback={restaurant.emoji} className="menu-photo" fallbackClassName="card-emoji big" />
              <div>
                <h1 className="page-title">{restaurant.name}</h1>
                <p className="muted">{restaurant.description}</p>
                <p className="meta">
                  {restaurant.cuisine} · ⭐ {restaurant.rating} · {restaurant.deliveryTime}
                  {restaurant.area ? ` · ${restaurant.area}` : ''}
                  {restaurant.costForTwo ? ` · ₹${restaurant.costForTwo} for two` : ''}
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
                  {qty(item.name) === 0 ? (
                    <button
                      className="add-btn"
                      onClick={() => add({ id: restaurant._id, name: restaurant.name }, item)}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="qty">
                      <button onClick={() => change(item.name, -1)}>−</button>
                      <span>{qty(item.name)}</span>
                      <button onClick={() => change(item.name, 1)}>+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <CartBar />
    </div>
  );
}

export default RestaurantMenu;