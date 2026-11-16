import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const API = 'http://localhost:5000/api';

function Restaurants() {
  const [params, setParams] = useSearchParams();
  const cuisine = params.get('cuisine') || 'All';
  const [search, setSearch] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/cuisines`).then((r) => r.json()).then(setCuisines).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = `${API}/restaurants?cuisine=${encodeURIComponent(cuisine)}&search=${encodeURIComponent(search)}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setRestaurants(d))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, [cuisine, search]);

  return (
    <div className="food-page">
      <section className="section">
        <h1 className="page-title">Restaurants</h1>

        <input
          className="search"
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="chips">
          {['All', ...cuisines].map((c) => (
            <button
              key={c}
              className={`chip ${cuisine === c ? 'chip-active' : ''}`}
              onClick={() => setParams(c === 'All' ? {} : { cuisine: c })}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="muted">Loading...</p>
        ) : restaurants.length === 0 ? (
          <p className="muted">No restaurants found.</p>
        ) : (
          <div className="card-grid">
            {restaurants.map((r) => (
              <Link key={r._id} to={`/restaurants/${r._id}`} className="card">
                <div className="card-emoji">{r.emoji}</div>
                <h3>{r.name}</h3>
                <p className="muted">{r.description}</p>
                <p className="meta">{r.cuisine} · ⭐ {r.rating} · {r.deliveryTime}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Restaurants;