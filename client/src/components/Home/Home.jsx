import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api';
const cuisineEmoji = {
  Indian: '🍛', Italian: '🍝', Chinese: '🥡', Mexican: '🌮', Japanese: '🍣', Thai: '🍜',
};

function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [cuisines, setCuisines] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${API}/cuisines`).then((r) => r.json()).then(setCuisines).catch(() => {});
    fetch(`${API}/restaurants`).then((r) => r.json()).then((d) => setFeatured(d.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="food-page">
      <section className="hero">
        <p className="eyebrow">Welcome{user ? `, ${user.name}` : ''}</p>
        <h1>Explore flavours from around the world.</h1>
        <p className="hero-sub">Discover cuisines, restaurants and their menus.</p>
        <Link to="/restaurants" className="btn-primary">Browse restaurants</Link>
      </section>

      <section className="section">
        <h2 className="section-title">Cuisines</h2>
        <div className="chips">
          {cuisines.map((c) => (
            <Link key={c} to={`/restaurants?cuisine=${c}`} className="chip">
              {cuisineEmoji[c] || '🍽️'} {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Popular restaurants</h2>
        <div className="card-grid">
          {featured.map((r) => (
            <Link key={r._id} to={`/restaurants/${r._id}`} className="card">
              <div className="card-emoji">{r.emoji}</div>
              <h3>{r.name}</h3>
              <p className="muted">{r.cuisine} · ⭐ {r.rating} · {r.deliveryTime}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;