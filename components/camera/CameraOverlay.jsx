'use client';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { FILTERS } from './cameraUtils';

/* ── Shared button styles ── */
const camBtn = {
  width: 42, height: 42, borderRadius: '50%',
  background: 'rgba(0,0,0,0.35)', border: '1.5px solid rgba(255,255,255,0.35)',
  color: 'white', fontSize: '1.1rem', cursor: 'pointer', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const shutterBtn = {
  width: 78, height: 78, borderRadius: '50%', background: 'transparent',
  border: '4px solid rgba(255,255,255,0.75)', padding: 4, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'transform 0.1s', flexShrink: 0,
};
const safeTop = 'calc(52px + env(safe-area-inset-top, 0px))';
const safeBot = 'calc(env(safe-area-inset-bottom, 0px) + 28px)';

/* ── Grid overlay ── */
const Grid = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', left: '33.33%',  top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.32)' }} />
    <div style={{ position: 'absolute', left: '66.66%',  top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.32)' }} />
    <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.32)' }} />
    <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.32)' }} />
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 30, height: 30 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1.5, background: 'rgba(255,255,255,0.6)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1.5, background: 'rgba(255,255,255,0.6)' }} />
    </div>
  </div>
);

const CameraOverlay = ({ videoRef, pendingPhoto, photos, flashActive, showGrid, setShowGrid, capturePhoto, keepPhoto, retakePhoto, stopCamera }) => {
  const lastPhoto = photos[photos.length - 1];

  return (
    <div className="camera-overlay">

      {/* Live video — hidden (not removed) during review so stream stays alive */}
      <video ref={videoRef} autoPlay playsInline muted
        style={{ width: '100%', flex: pendingPhoto ? 0 : 1, objectFit: 'cover', display: pendingPhoto ? 'none' : 'block' }} />

      {/* Review still */}
      {pendingPhoto && (
        <img src={pendingPhoto.dataUrl} alt="Captured"
          style={{ flex: 1, width: '100%', objectFit: 'contain', display: 'block', background: '#111' }} />
      )}

      {/* Flash */}
      {flashActive && <div style={{ position: 'absolute', inset: 0, background: 'white', opacity: 0.65, pointerEvents: 'none' }} />}

      {/* ═══ LIVE CAMERA UI ═══ */}
      {!pendingPhoto && (
        <>
          {showGrid && <Grid />}

          {/* Top bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: safeTop, paddingLeft: 16, paddingRight: 16, paddingBottom: 20, background: 'linear-gradient(rgba(0,0,0,0.6), transparent)' }}>
            <button onClick={stopCamera} aria-label="Stop camera" style={camBtn}><i className="bi bi-arrow-left" aria-hidden="true"></i></button>
            {photos.length > 0 && (
              <Badge bg="primary" pill style={{ fontSize: '0.85rem', padding: '0.45em 0.85em', backdropFilter: 'blur(4px)' }}>
                <i className="bi bi-images me-1"></i>{photos.length} photo{photos.length > 1 ? 's' : ''}
              </Badge>
            )}
            <button onClick={() => setShowGrid(g => !g)} aria-label={showGrid ? 'Hide grid overlay' : 'Show grid overlay'}
              style={{ ...camBtn, background: showGrid ? 'rgba(91,94,244,0.65)' : 'rgba(0,0,0,0.35)', border: showGrid ? '1.5px solid rgba(91,94,244,0.85)' : '1.5px solid rgba(255,255,255,0.35)' }}>
              <i className="bi bi-grid-3x3" aria-hidden="true"></i>
            </button>
          </div>

          {/* Bottom controls */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: safeBot, background: 'linear-gradient(transparent, rgba(0,0,0,0.75))' }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '16px 32px 12px' }}>
              {/* Last thumbnail */}
              <div style={{ width: 56, height: 56 }}>
                {lastPhoto && (
                  <img src={lastPhoto.dataUrl} alt="last"
                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10, border: '2px solid rgba(255,255,255,0.6)', filter: (() => { const f = FILTERS.find(x => x.id === lastPhoto.filter); return f?.css !== 'none' ? f?.css : undefined; })() }} />
                )}
              </div>
              {/* Shutter */}
              <button style={shutterBtn}
                onTouchStart={e => { e.preventDefault(); capturePhoto(); }}
                onClick={capturePhoto}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.91)'}
                onMouseUp  ={e => e.currentTarget.style.transform = ''}
                onTouchEnd ={e => e.currentTarget.style.transform = ''}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white' }} />
              </button>
              <div style={{ width: 56 }} />
            </div>
            {/* Done / Cancel */}
            <button onClick={stopCamera}
              style={{ marginTop: 4, padding: '9px 28px', borderRadius: 100, background: photos.length > 0 ? 'rgba(91,94,244,0.85)' : 'rgba(255,255,255,0.18)', border: photos.length > 0 ? 'none' : '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', gap: 8 }}>
              {photos.length > 0
                ? <><i className="bi bi-check-circle-fill"></i>Done — {photos.length} photo{photos.length > 1 ? 's' : ''}</>
                : <><i className="bi bi-x"></i>Cancel</>}
            </button>
          </div>
        </>
      )}

      {/* ═══ REVIEW UI ═══ */}
      {pendingPhoto && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: safeTop, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, background: 'linear-gradient(rgba(0,0,0,0.7), transparent)' }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem', letterSpacing: 0.4 }}>
              <i className="bi bi-eye me-2 opacity-75"></i>Review Photo
            </span>
          </div>
          <div style={{ position: 'absolute', top: `calc(110px + env(safe-area-inset-top, 0px))`, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '4px 14px', color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
            {pendingPhoto.width} × {pendingPhoto.height} px
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', gap: 12, padding: '20px 20px', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
            <button onClick={retakePhoto}
              style={{ flex: 1, padding: '15px 0', borderRadius: 16, background: 'rgba(255,255,255,0.14)', border: '1.5px solid rgba(255,255,255,0.45)', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <i className="bi bi-arrow-counterclockwise"></i> Retake
            </button>
            <button onClick={keepPhoto}
              style={{ flex: 1, padding: '15px 0', borderRadius: 16, background: 'rgba(91,94,244,0.92)', border: 'none', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(91,94,244,0.4)' }}>
              <i className="bi bi-check-lg"></i> Keep Photo
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default CameraOverlay;
