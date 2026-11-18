import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h2 className="footer-brand">FoodieHub</h2>
          <p className="muted">Discover cuisines, restaurants, menus and recipes.</p>
        </div>
        <div>
          <h4>About</h4>
          <a href="#">Who we are</a>
          <a href="#">Blog</a>
          <a href="#">Contact us</a>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/home">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <a href="#">Recipes (coming soon)</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </div>
      <div className="footer-bottom">© 2026 FoodieHub. All rights reserved.</div>
    </footer>
  );
}

export default Footer;