'use client';
import React, { useRef, useState } from 'react';
import palette from '@/theme/palette';

const DropZone = ({ onFiles, accept, multiple = true, label }) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver  = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onFiles(files);
  };
  const handleClick      = () => inputRef.current.click();
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) onFiles(files);
    e.target.value = '';
  };

  return (
    <div className={`drop-zone${dragOver ? ' drag-over' : ''}`} onClick={handleClick}
      onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <i className="bi bi-cloud-upload-fill" style={{ fontSize: '3rem', color: palette.primary }}></i>
      <p className="fw-semibold fs-5 mt-3 mb-1">{label || 'Drop files here or click to browse'}</p>
      <p className="text-muted small mb-0">{accept}</p>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};

export default DropZone;
