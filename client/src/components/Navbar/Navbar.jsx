import { NavLink, useNavigate } from 'react-router-dom';
import './Food.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <h2 className="nav-logo">FoodieHub</h2>
      <nav className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/restaurants">Restaurants</NavLink>
      </nav>
      <button className="nav-logout" onClick={handleLogout}>Log out</button>
    </header>
  );
}

export default Navbar;