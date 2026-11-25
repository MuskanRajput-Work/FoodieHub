export const THEMES = [
  { id: 'classic', label: 'Masala', accent: '#7a1f2b', bg: '#ffffff' },
  { id: 'dark', label: 'Midnight Dhaba', accent: '#cc4f64', bg: '#161110' },
  { id: 'fresh', label: 'Mint Chutney', accent: '#2e7d4f', bg: '#f2f8f1' },
  { id: 'mango', label: 'Mango Lassi', accent: '#c2540a', bg: '#fff4dc' },
  { id: 'rose', label: 'Rose Kulfi', accent: '#c2185b', bg: '#fdf0f3' },
  { id: 'lavender', label: 'Lavender Latte', accent: '#6d4bc3', bg: '#f3eefb' },
  { id: 'neon', label: 'Neon Noodle', accent: '#d6338f', bg: '#0d1020', glow: true },
  { id: 'cyan', label: 'Cyan Glow', accent: '#00e5ff', bg: '#050505', glow: true },
  { id: 'ocean', label: 'Deep Ocean', accent: '#14c8ff', bg: '#0a1c33', glow: true },
  { id: 'violet', label: 'Ultraviolet', accent: '#b66dff', bg: '#0f0a1c', glow: true },
];

export function getTheme() {
  try {
    const saved = localStorage.getItem('theme');
    return THEMES.some((t) => t.id === saved) ? saved : 'classic';
  } catch {
    return 'classic';
  }
}

export function applyTheme(id) {
  const theme = THEMES.find((t) => t.id === id);
  const root = document.documentElement;
  root.setAttribute('data-theme', id);
  root.toggleAttribute('data-glow', Boolean(theme && theme.glow));
  try {
    localStorage.setItem('theme', id);
  } catch {
    /* ignore */
  }
}