import React from 'react';
import { Container } from 'react-bootstrap';

export default function NotFoundPage() {
  return (
    <Container className="py-4 text-center">
      <h2>404 – Page Not Found</h2>
      <p>The page you’re looking for does not exist.</p>
    </Container>
  );
}
