import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { THEMES, getTheme, applyTheme } from '../theme.js';

export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const box = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const pickTheme = (id) => {
    applyTheme(id);
    setTheme(id);
  };

  const close = () => setOpen(false);
  const initial = (user.name || '?')[0].toUpperCase();
  const currentLabel = THEMES.find((t) => t.id === theme)?.label;

  return (
    <div className="user-menu" ref={box}>
      <button
        className="avatar-btn"
        onClick={() => {
          setOpen(!open);
          setThemesOpen(false);
        }}
        aria-label="Account menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div className="um-panel">
          <div className="um-head">
            <span className="um-avatar">{initial}</span>
            <div>
              <strong>{user.name}</strong>
              {user.email && <p>{user.email}</p>}
            </div>
          </div>

          <div className="um-sep" />
          <Link to="/profile" className="um-link" onClick={close}>👤 My profile</Link>
          <Link to="/orders" className="um-link" onClick={close}>🧾 My orders</Link>
          <Link to="/profile" className="um-link" onClick={close}>⚙️ Account settings &amp; password</Link>

          <div className="um-sep" />
          <button
            className="um-link"
            onClick={() => setThemesOpen(!themesOpen)}
            aria-expanded={themesOpen}
          >
            🎨 Theme
            <span className="um-current">{currentLabel}</span>
            <span className={`um-chevron ${themesOpen ? 'open' : ''}`}>▾</span>
          </button>

          {themesOpen && (
            <div className="um-themes">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`um-theme ${theme === t.id ? 'active' : ''}`}
                  onClick={() => pickTheme(t.id)}
                >
                  <span
                    className="um-swatch"
                    style={{ background: `linear-gradient(135deg, ${t.accent} 50%, ${t.bg} 50%)` }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <div className="um-sep" />
          <button className="um-link um-logout" onClick={onLogout}>↪ Log out</button>
        </div>
      )}
    </div>
  );
}