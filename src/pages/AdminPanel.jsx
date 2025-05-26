import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import useApiClient from '../hooks/useApiClient';

export default function AdminPanel() {
  const api = useApiClient();
  const [tab, setTab] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [requests, setRequests] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/admin/rooms').then(res => setRooms(res.data));
    api.get('/admin/bookingRequests').then(res => setRequests(res.data));
    api.get('/admin/invoices').then(res => setInvoices(res.data));
  }, [api]);

  return (
    <Container>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Rooms" />
        <Tab label="Requests" />
        <Tab label="Invoices" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.capacity}</TableCell>
                  <TableCell>{r.roomClass}</TableCell>
                  <TableCell>{r.pricePerNight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Places</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.userId}</TableCell>
                  <TableCell>{r.places}</TableCell>
                  <TableCell>{r.roomClass}</TableCell>
                  <TableCell>{r.startDate}</TableCell>
                  <TableCell>{r.endDate}</TableCell>
                  <TableCell>{r.roomId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Booking ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Issued At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map(i => (
                <TableRow key={i.id}>
                  <TableCell>{i.id}</TableCell>
                  <TableCell>{i.bookingRequestId}</TableCell>
                  <TableCell>{i.amount}</TableCell>
                  <TableCell>{i.issuedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Container>
  );
}
