import { API } from '../../config.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log('Submit Clicked');
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }
      alert('Account created! Please sign in.');
      navigate('/login');
    } catch {
      setError('Cannot reach the server. Is it running?');
    }
  };

  return (
    <div className="login-page">
      <div className="login-brand">
        <h2 className="brand-logo">FoodieHub</h2>
        <div className="brand-text">
          <h1>Join the<br />table.</h1>
          <p>Create an account to save favourites and order in a few taps.</p>
        </div>
        <span className="brand-footer">© 2026 FoodieHub</span>
      </div>

      <div className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <p className="login-eyebrow">Get started</p>
          <h1 className="login-title">Create account</h1>

          <label htmlFor="name">Full name</label>
          <input id="name" type="text" name="name" placeholder="Your name"
            value={form.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com"
            value={form.email} onChange={handleChange} required />

          <label htmlFor="phone">Phone</label>
          <input id="phone" type="tel" name="phone" placeholder="10-digit number"
            value={form.phone} onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Create a password"
            value={form.password} onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" name="confirmPassword"
            placeholder="Repeat your password"
            value={form.confirmPassword} onChange={handleChange} required />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="login-btn">Create account</button>

          <p className="signup-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;