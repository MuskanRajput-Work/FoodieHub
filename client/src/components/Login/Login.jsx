import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful! Welcome, ' + data.user.name);
      navigate('/home');
    } catch {
      setMessage('Cannot reach the server. Is it running?');
    }
  };

  return (
    <div className="login-page">
      <div className="login-brand">
        <h2 className="brand-logo">FoodieHub</h2>
        <div className="brand-text">
          <h1>Good food,<br />good mood.</h1>
          <p>Discover recipes, restaurants and flavours made for you.</p>
        </div>
        <span className="brand-footer">© 2026 FoodieHub</span>
      </div>

      <div className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <p className="login-eyebrow">Welcome back</p>
          <h1 className="login-title">Sign in</h1>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrap">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <a href="#" className="forgot-link">Forgot password?</a>

          {message && <p className="form-error">{message}</p>}

          <button type="submit" className="login-btn">Sign in</button>

          <p className="signup-text">
            New to FoodieHub? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;