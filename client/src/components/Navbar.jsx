import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu.jsx';
export const CITIES = ['Bareilly', 'Delhi', 'Lucknow', 'Mumbai', 'Bengaluru'];

export function useCity() {
  const [city, setCity] = useState(() => localStorage.getItem('city') || 'Bareilly');
  const update = (value) => {
    setCity(value);
    localStorage.setItem('city', value);
  };
  return [city, update];
}

function Navbar({ city, setCity, search, onSearch }) {
  const navigate = useNavigate();
  const own = useCity();
  const [currentCity, changeCity] = city !== undefined ? [city, setCity] : own;
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="topbar">
      <Link to="/home" className="brand">FoodieHub</Link>

      <div className="searchbar">
        <span>📍</span>
        <select
          className="city-select"
          value={currentCity}
          onChange={(e) => changeCity(e.target.value)}
        >
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="divider" />
        {onSearch ? (
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        ) : (
          <Link to="/restaurants" className="search-link">
            Search for restaurant, cuisine or a dish
          </Link>
        )}
      </div>

      <div className="top-right">
        {user && <UserMenu user={user} onLogout={handleLogout} />}
      </div>
    </header>
  );
}

export default Navbar;