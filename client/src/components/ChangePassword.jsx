import { useState } from 'react';
import { API } from '../config.js';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setMsg('');
    setError('');
    if (newPassword.length < 6) return setError('New password must be at least 6 characters.');
    if (newPassword !== confirm) return setError('New passwords do not match.');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setSaving(true);
    try {
      const res = await fetch(`${API}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id || user._id, oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not change password');
      setMsg('Password changed ✓');
      setOldPassword('');
      setNewPassword('');
      setConfirm('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ marginTop: 36 }}>
      <h3>Change password</h3>
      <input className="cart-input" type="password" placeholder="Current password"
        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      <input className="cart-input" type="password" placeholder="New password (min 6 characters)"
        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <input className="cart-input" type="password" placeholder="Confirm new password"
        value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      {error && <p className="cart-error">{error}</p>}
      {msg && <p className="cart-ok">{msg}</p>}
      <button className="add-btn big" onClick={submit} disabled={saving}>
        {saving ? 'Updating...' : 'Update password'}
      </button>
    </div>
  );
}