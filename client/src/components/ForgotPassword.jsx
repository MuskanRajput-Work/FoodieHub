import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config.js';
import './Food.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setMsg('');
    setError('');
    if (!email || !phone) return setError('Enter your email and phone number.');
    if (newPassword.length < 6) return setError('New password must be at least 6 characters.');
    if (newPassword !== confirm) return setError('Passwords do not match.');

    setSaving(true);
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not reset password');
      setMsg(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="cart-box">
      <h2>Forgot password</h2>
      <p>Enter the email and phone number you signed up with.</p>
      <input className="cart-input" type="email" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="cart-input" placeholder="Phone number" maxLength={10}
        value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="cart-input" type="password" placeholder="New password (min 6 characters)"
        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <input className="cart-input" type="password" placeholder="Confirm new password"
        value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      {error && <p className="cart-error">{error}</p>}
      {msg && <p className="cart-ok">{msg}</p>}
      <button className="add-btn big" onClick={submit} disabled={saving}>
        {saving ? 'Resetting...' : 'Reset password'}
      </button>
      <p style={{ marginTop: 16 }}><Link to="/login">← Back to login</Link></p>
    </section>
  );
}