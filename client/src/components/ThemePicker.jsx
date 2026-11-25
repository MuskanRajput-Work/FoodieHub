import { useState } from 'react';
import { THEMES, getTheme, applyTheme } from '../theme.js';

export default function ThemePicker() {
  const [current, setCurrent] = useState(getTheme());

  const pick = (id) => {
    applyTheme(id);
    setCurrent(id);
  };

  return (
    <div className="theme-picker">
      {THEMES.map((t) => (
        <button
          key={t.id}
          className={`theme-dot ${current === t.id ? 'active' : ''}`}
          style={{ background: t.color }}
          title={`${t.label} theme`}
          aria-label={`${t.label} theme`}
          onClick={() => pick(t.id)}
        />
      ))}
    </div>
  );
}