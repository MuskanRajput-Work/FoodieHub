import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config.js';
import Navbar from './Navbar.jsx';
import ChangePassword from './ChangePassword.jsx';

export default function Profile() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const getUserId = () => {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    return u.id || u._id;
  };

  useEffect(() => {
    fetch(`${API}/users/${getUserId()}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setForm({ name: data.name, email: data.email, phone: data.phone, address: data.address });
        const current = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...current, ...data }));
      })
      .catch((err) => setError(err.message || 'Could not load profile'))
      .finally(() => setLoading(false));
  }, []);

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = async () => {
    setMsg('');
    setError('');
    if (!form.name.trim()) return setError('Name cannot be empty.');
    if (!/^\d{10}$/.test(form.phone)) return setError('Phone number must be 10 digits.');

    setSaving(true);
    try {
      const res = await fetch(`${API}/users/${getUserId()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, address: form.address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not save');
      const current = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...current, ...data.user }));
      setMsg('Profile saved ✓');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="cart-box">
        <h2>My profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <label className="field-label">Name</label>
            <input className="cart-input" value={form.name} onChange={setField('name')} />

            <label className="field-label">Email (cannot be changed)</label>
            <input className="cart-input" value={form.email} disabled />

            <label className="field-label">Phone</label>
            <input className="cart-input" value={form.phone} onChange={setField('phone')} maxLength={10} />

            <label className="field-label">Saved delivery address</label>
            <input
              className="cart-input"
              placeholder="House no, street, area, city"
              value={form.address}
              onChange={setField('address')}
            />

            {error && <p className="cart-error">{error}</p>}
            {msg && <p className="cart-ok">{msg}</p>}

            <button className="add-btn big" onClick={save} disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </button>

            <p style={{ marginTop: 24 }}>
              <Link to="/orders">View my orders and track them →</Link>
            </p>
            <ChangePassword />
          </>
        )}
      </section>
    </>
  );
}