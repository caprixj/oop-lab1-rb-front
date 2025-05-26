import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, MenuItem,
  Select, FormControl, InputLabel, Alert
} from '@mui/material';
import useApiClient from '../hooks/useApiClient';

export default function BookingPage() {
  const api = useApiClient();
  const [classes, setClasses] = useState([]);
  const [places, setPlaces] = useState(1);
  const [roomClass, setRoomClass] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    api.get('/booking')
      .then(res => setClasses(res.data))
      .catch(err => {
        if (err.response?.status === 403) setError('Access denied');
        else setError('Failed to load room classes');
      });
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/booking', { places, roomClass, startDate, endDate });
      setSuccess(res.data);
    } catch {
      setError('Booking failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Book a Room</h1>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Booking created! ID: {success.id || '(pending DB)'}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          type="number"
          label="Places"
          value={places}
          onChange={e => setPlaces(+e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Room Class</InputLabel>
          <Select
            value={roomClass}
            label="Room Class"
            onChange={e => setRoomClass(e.target.value)}
          >
            {classes.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
