'use client';
import { useEffect } from 'react';

function applyFill(input) {
  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || 100;
  const val = parseFloat(input.value) ?? min;
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--fill', pct + '%');
}

function initAll() {
  document.querySelectorAll('input[type="range"]').forEach(applyFill);
}

export default function RangeInputFill() {
  useEffect(() => {
    const onInput = (e) => { if (e.target.type === 'range') applyFill(e.target); };

    initAll();
    // React sets .value as a DOM property after paint — re-run after a tick
    const t1 = setTimeout(initAll, 0);
    const t2 = setTimeout(initAll, 150);

    document.addEventListener('input', onInput);
    document.addEventListener('change', onInput);

    const observer = new MutationObserver(() => {
      // delay so React finishes setting .value after adding nodes
      setTimeout(initAll, 0);
    });
    observer.observe(document.body, { subtree: true, childList: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.removeEventListener('input', onInput);
      document.removeEventListener('change', onInput);
      observer.disconnect();
    };
  }, []);

  return null;
}
