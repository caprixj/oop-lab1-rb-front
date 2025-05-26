import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { createBooking } from '../api/bookingService';
import { useAuth } from '../contexts/AuthContext';

export default function BookingPage() {
  const [beds, setBeds]         = useState(1);
  const [roomClass, setRoomClass] = useState('STANDARD');
  const [checkIn, setCheckIn]   = useState('');
  const [checkOut, setCheckOut] = useState('');
  const { token } = useAuth();

  const submit = async e => {
    e.preventDefault();
    try {
      await createBooking({ numberOfBeds: beds, roomClass, checkIn, checkOut }, token);
      alert('Request submitted');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 600 }}>
      <Card style={{ borderColor: 'var(--secondary)' }}>
        <Card.Header style={{ background: 'var(--secondary)', color: '#fff' }}>
          New Booking
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Beds</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={beds}
                onChange={e => setBeds(+e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select
                value={roomClass}
                onChange={e => setRoomClass(e.target.value)}
              >
                <option value="ECONOM">Econom</option>
                <option value="STANDARD">Standard</option>
                <option value="DELUXE">Deluxe</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check-in</Form.Label>
              <Form.Control
                type="datetime-local"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check-out</Form.Label>
              <Form.Control
                type="datetime-local"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ background: 'var(--primary)', border: 'none' }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
