import { useState } from 'react';
import { imgUrl } from '../config.js';

const EXTS = ['jpg', 'jpeg', 'png', 'webp'];

export default function Photo({ file, fallback = null, className = '', fallbackClassName = '' }) {
  const [attempt, setAttempt] = useState(0);

  if (!file || attempt >= EXTS.length) {
    return fallback ? <span className={fallbackClassName}>{fallback}</span> : null;
  }

  const base = file.replace(/\.(jpe?g|png|webp)$/i, '');
  return (
    <img
      key={`${base}-${attempt}`}
      className={`photo ${className}`}
      src={imgUrl(`${base}.${EXTS[attempt]}`)}
      alt=""
      loading="lazy"
      onError={() => setAttempt(attempt + 1)}
    />
  );
}