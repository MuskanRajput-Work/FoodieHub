import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div>
          <h3 className="ft-brand">FoodieHub</h3>
          <p className="ft-text">Discover restaurants, cuisines and menus near you, and order your favourite food.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/home">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/info/about">About us</Link>
          <Link to="/info/contact">Contact us</Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/info/privacy">Privacy</Link>
          <Link to="/info/terms">Terms</Link>
        </div>
      </div>
      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} FoodieHub. Student project by Muskan, BCA.</span>
        <span>Restaurants and menus shown are sample data.</span>
      </div>
    </footer>
  );
}