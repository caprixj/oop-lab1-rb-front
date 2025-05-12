import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function SpinnerOverlay() {
  return (
    <div
      className="d-flex vh-100 vw-100 justify-content-center align-items-center"
      style={{ background: 'var(--bg)' }}
    >
      <Spinner animation="border" style={{ color: 'var(--primary)' }} />
    </div>
  );
}
