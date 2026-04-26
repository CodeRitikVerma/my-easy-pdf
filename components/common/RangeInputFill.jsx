'use client';
import { useEffect } from 'react';

function applyFill(input) {
  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || 100;
  const val = parseFloat(input.value) ?? min;
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--fill', pct + '%');
}

export default function RangeInputFill() {
  useEffect(() => {
    const initAll = () =>
      document.querySelectorAll('input[type="range"]').forEach(applyFill);

    const onInput = (e) => {
      if (e.target.type === 'range') applyFill(e.target);
    };

    initAll();
    document.addEventListener('input', onInput);

    const observer = new MutationObserver(initAll);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => {
      document.removeEventListener('input', onInput);
      observer.disconnect();
    };
  }, []);

  return null;
}
