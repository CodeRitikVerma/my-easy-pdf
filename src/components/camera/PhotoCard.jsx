import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FILTERS } from './cameraUtils';
import palette from '../../theme/palette';

const PhotoCard = ({ photo, index, total, onMoveUp, onMoveDown, onDelete, onFilterChange, onPreview }) => {
  const filterDef = FILTERS.find(f => f.id === photo.filter) || FILTERS[0];

  return (
    <div className="file-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>

      {/* ── Main row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className="d-flex flex-column gap-1 me-1 flex-shrink-0">
          <button className="btn-reorder" onClick={onMoveUp}   disabled={index === 0}         title="Move up">
            <i className="bi bi-chevron-up"></i>
          </button>
          <button className="btn-reorder" onClick={onMoveDown} disabled={index === total - 1} title="Move down">
            <i className="bi bi-chevron-down"></i>
          </button>
        </div>

        <img
          src={photo.dataUrl}
          alt={`Photo ${index + 1}`}
          className="rounded me-2"
          style={{
            width: 52, height: 52, objectFit: 'cover', flexShrink: 0,
            filter: filterDef.css !== 'none' ? filterDef.css : undefined,
          }}
        />

        <div className="flex-grow-1 min-w-0">
          <div className="fw-semibold small">Photo {index + 1}</div>
          <div style={{ fontSize: '0.72rem', color: palette.text.muted }}>{photo.width} × {photo.height} px</div>
          {filterDef.id !== 'none' && (
            <Badge bg="secondary" pill style={{ fontSize: '0.62rem', marginTop: 2 }}>
              <i className={`bi ${filterDef.icon} me-1`}></i>{filterDef.label}
            </Badge>
          )}
        </div>

        <Button variant="outline-secondary" size="sm" onClick={onPreview} title="Preview with filter" className="me-1">
          <i className="bi bi-eye"></i>
        </Button>
        <Button variant="outline-danger" size="sm" onClick={onDelete}>
          <i className="bi bi-trash"></i>
        </Button>
      </div>

      {/* ── Filter chips ── */}
      <div style={{ display: 'flex', gap: 6, paddingTop: 10, paddingLeft: 2, flexWrap: 'wrap', borderTop: `1px solid ${palette.border.default}`, marginTop: 10 }}>
        <span style={{ fontSize: '0.68rem', color: palette.text.subtle, alignSelf: 'center', marginRight: 2 }}>Filter:</span>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => onFilterChange(photo.id, f.id)}
            style={{
              padding: '3px 11px', borderRadius: 100, fontSize: '0.71rem', fontWeight: 600,
              border: photo.filter === f.id ? `1.5px solid ${palette.primary}` : `1.5px solid ${palette.border.default}`,
              background: photo.filter === f.id ? `${palette.primary}14` : 'transparent',
              color: photo.filter === f.id ? palette.primary : palette.text.muted,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <i className={`bi ${f.icon} me-1`}></i>{f.label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default PhotoCard;
