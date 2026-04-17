'use client';
import React from 'react';
import { FILTERS } from './cameraUtils';

const btnBase = {
  borderRadius: 100, fontWeight: 600, cursor: 'pointer',
  backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.28)',
  color: 'white', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
};

const PhotoPreview = ({ photo, onClose, onFilterChange }) => {
  const filterDef = FILTERS.find(f => f.id === photo.filter) || FILTERS[0];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1070, background: '#000', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px',
        paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))',
        background: 'linear-gradient(rgba(0,0,0,0.75), transparent)',
      }}>
        {/* Close */}
        <button onClick={onClose}
          style={{ ...btnBase, width: 40, height: 40, justifyContent: 'center', padding: 0, background: 'rgba(0,0,0,0.4)', fontSize: '1rem' }}>
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Title */}
        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', letterSpacing: 0.3 }}>
          <i className="bi bi-eye me-2 opacity-75"></i>Photo Preview
        </span>

        {/* Active filter badge */}
        <div style={{
          padding: '5px 12px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600,
          background: filterDef.id !== 'none' ? 'rgba(91,94,244,0.75)' : 'rgba(255,255,255,0.15)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          color: 'white', backdropFilter: 'blur(6px)',
        }}>
          <i className={`bi ${filterDef.icon} me-1`}></i>{filterDef.label}
        </div>
      </div>

      {/* ── Image with live filter ── */}
      <img
        src={photo.dataUrl}
        alt="Preview"
        style={{
          flex: 1, width: '100%', objectFit: 'contain', display: 'block',
          filter: filterDef.css !== 'none' ? filterDef.css : undefined,
        }}
      />

      {/* ── Filter switcher bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap',
        padding: '16px 16px',
        paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.88))',
      }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => onFilterChange(photo.id, f.id)}
            style={{
              ...btnBase,
              padding: '8px 16px', fontSize: '0.82rem',
              background: photo.filter === f.id ? 'rgba(91,94,244,0.88)' : 'rgba(255,255,255,0.13)',
              border: photo.filter === f.id ? '1.5px solid rgba(91,94,244,0.9)' : '1.5px solid rgba(255,255,255,0.28)',
              boxShadow: photo.filter === f.id ? '0 2px 12px rgba(91,94,244,0.4)' : 'none',
            }}
          >
            <i className={`bi ${f.icon}`}></i>{f.label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default PhotoPreview;
