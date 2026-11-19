export const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const imgUrl = (file) => `${import.meta.env.BASE_URL}images/${file}`;
export const slug = (s) =>
  s.toLowerCase().replace(/\(.*?\)/g, '').replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');