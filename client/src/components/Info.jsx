import { useParams } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import './Food.css';

const PAGES = {
  about: ['About us', 'FoodieHub is a food discovery and ordering web app built by Muskan as a BCA project using the MERN stack (MongoDB Atlas, Express, React, Node.js). Explore restaurants, cuisines and menus in your city.'],
  contact: ['Contact us', 'For feedback or questions, write to: mahirajputbly2002@gmail.com'],
  privacy: ['Privacy', 'Your name, email and an encrypted (hashed) password are stored to run your account. We do not share your data with anyone. This is a student project.'],
  terms: ['Terms', 'FoodieHub is a learning project. Restaurants, menus and prices are sample data, and no real orders or payments are processed.'],
};

export default function Info() {
  const { topic } = useParams();
  const [title, text] = PAGES[topic] || ['Page not found', 'This page does not exist.'];
  return (
    <div className="food-page">
      <Navbar />
      <section className="section">
        <h1 className="page-title">{title}</h1>
        <p className="muted">{text}</p>
      </section>
      <Footer />
    </div>
  );
}