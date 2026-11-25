import { API } from '../../config.js';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar, { useCity, CITIES } from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import '../Food.css';
import Photo from '../Photo.jsx';
import CartBar from '../CartBar.jsx';

const DISHES = [
  { label: 'Biryani', emoji: '🍛', term: 'biryani', file: 'chicken-biryani' },
  { label: 'Pizza', emoji: '🍕', term: 'pizza', file: 'margherita-pizza' },
  { label: 'Noodles', emoji: '🍜', term: 'noodles', file: 'veg-hakka-noodles' },
  { label: 'Tacos', emoji: '🌮', term: 'taco', file: 'veg-tacos' },
  { label: 'Sushi', emoji: '🍣', term: 'sushi', file: 'veg-sushi-roll' },
  { label: 'Soup', emoji: '🥣', term: 'soup', file: 'hot-and-sour-soup' },
  { label: 'Dessert', emoji: '🍰', term: 'dessert', file: 'gulab-jamun' },
];

function Home() {
  const [city, setCity] = useCity();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [pureVeg, setPureVeg] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch(`${API}/restaurants`)
      .then((r) => r.json())
      .then((d) => setAll(Array.isArray(d) ? d : []))
      .catch(() => setError('Could not load restaurants. Is the server running?'))
      .finally(() => setLoading(false));
  }, []);

  const cuisines = useMemo(() => [...new Set(all.map((r) => r.cuisine))], [all]);
  const topBrands = useMemo(
    () => [...all].sort((a, b) => b.rating - a.rating).slice(0, 6),
    [all]
  );
  const popularDishes = useMemo(
    () => [...new Set(all.flatMap((r) => r.menu.map((i) => i.name)))].slice(0, 12),
    [all]
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((r) => {
      if (cuisine !== 'All' && r.cuisine !== cuisine) return false;
      if (pureVeg && !r.menu.every((i) => i.veg)) return false;
      if (topRated && r.rating < 4.4) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.menu.some(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            (i.description || '').toLowerCase().includes(q)
        )
      );
    });
  }, [all, search, cuisine, pureVeg, topRated]);

  const scrollToResults = () =>
    setTimeout(
      () => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }),
      50
    );

  const pickDish = (term) => {
    setSearch(term);
    scrollToResults();
  };

  const pickCuisine = (c) => {
    setCuisine(c);
    scrollToResults();
  };

  const clearAll = () => {
    setSearch('');
    setCuisine('All');
    setPureVeg(false);
    setTopRated(false);
  };

  const sections = [
    {
      title: 'Popular cuisines near me',
      items: cuisines.map((c) => ({ label: `${c} food`, onClick: () => pickCuisine(c) })),
    },
    {
      title: 'Top restaurant chains',
      items: topBrands.map((r) => ({ label: r.name, to: `/restaurants/${r._id}` })),
    },
    {
      title: 'Cities we deliver to',
      items: CITIES.map((c) => ({ label: c, onClick: () => setCity(c) })),
    },
    {
      title: 'Popular dishes near me',
      items: popularDishes.map((d) => ({
        label: d,
        onClick: () => pickDish(d.toLowerCase()),
      })),
    },
  ];

  const filtersOn = search || cuisine !== 'All' || pureVeg || topRated;

  return (
    <div className="food-page">
      <Navbar city={city} setCity={setCity} search={search} onSearch={setSearch} />

      <main className="container">
        <p className="breadcrumb">Home / India / {city} Restaurants</p>

        <div className="filter-row">
          <button
            className={`pill ${pureVeg ? 'pill-active' : ''}`}
            onClick={() => setPureVeg(!pureVeg)}
          >
            Pure Veg
          </button>
          <button
            className={`pill ${topRated ? 'pill-active' : ''}`}
            onClick={() => setTopRated(!topRated)}
          >
            Rating 4.4+
          </button>
          <select
            className="pill"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="All">Cuisines</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {filtersOn && (
            <button className="pill" onClick={clearAll}>Clear all</button>
          )}
        </div>

        <section className="block">
          <h2 className="block-title">Inspiration for your first order</h2>
          <div className="round-row">
            {DISHES.map((d) => (
              <button
                key={d.label}
                className="round-item"
                onClick={() => pickDish(d.term)}
              >
                <span className="round round-dish">
                  <Photo file={d.file} fallback={d.emoji} className="round-photo" />
                </span>
                <span className="round-label">{d.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="block">
          <h2 className="block-title">Top Restaurants for you</h2>
          <div className="round-row">
            {topBrands.map((r) => (
              <Link key={r._id} to={`/restaurants/${r._id}`} className="round-item">
                <span className="round round-brand">
                  <Photo file={r.image} fallback={r.emoji} className="round-photo" />
                </span>
                <span className="round-label">{r.name}</span>
                <span className="round-sub">{r.deliveryTime}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="block" id="results">
          <h2 className="block-title">Food Delivery Restaurants in {city}</h2>
          {loading && <p className="muted">Loading...</p>}
          {error && <p className="muted">{error}</p>}
          {!loading && !error && visible.length === 0 && (
            <p className="muted">No restaurants match your filters.</p>
          )}
          <div className="rest-grid">
            {visible.map((r) => (
              <Link key={r._id} to={`/restaurants/${r._id}`} className="rest-card">
                <div className="rest-img">
                  <Photo file={r.image} fallback={r.emoji} className="rest-photo" fallbackClassName="rest-emoji" />
                  {r.offer && <span className="offer-tag">{r.offer}</span>}
                  <span className="time-tag">{r.deliveryTime}</span>
                </div>
                <div className="rest-info">
                  <div className="rest-row">
                    <h3>{r.name}</h3>
                    <span className="rating">{r.rating} ★</span>
                  </div>
                  <div className="rest-row muted">
                    <span>{r.cuisine}</span>
                    <span>{r.costForTwo ? `₹${r.costForTwo} for two` : `${r.menu.length} dishes`}</span>
                  </div>
                  <p className="muted small">{r.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="block">
          <h2 className="block-title">Explore options near me</h2>
          {sections.map((s, index) => (
            <div key={s.title} className="accordion">
              <button
                className="acc-head"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{s.title}</span>
                <span>{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="acc-body">
                  {s.items.map((item) =>
                    item.to ? (
                      <Link key={item.label} to={item.to} className="acc-chip">
                        {item.label}
                      </Link>
                    ) : (
                      <button key={item.label} className="acc-chip" onClick={item.onClick}>
                        {item.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
      <CartBar />
      <Footer />
    </div>
  );
}

export default Home;