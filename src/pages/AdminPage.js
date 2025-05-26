import React, { useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { getPendingRequests, respondToRequest } from '../api/adminService'
import { useAuth } from '../contexts/AuthContext'
import formatDate from '../utils/formatDate'

export default function AdminPage() {
  const [requests, setRequests] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return
    getPendingRequests(token)
      .then(setRequests)
      .catch(err => alert(err.message))
  }, [token])

  const handleAction = async (r, action) => {
    const roomId = prompt('Room ID to assign')
    const message = prompt('Response message')
    try {
      await respondToRequest({ requestId: r.requestId, action, roomId, message }, token)
      setRequests(prev => prev.filter(x => x.requestId !== r.requestId))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <Container className="py-4">
      <h3>Pending Requests</h3>
      <Table bordered hover>
        <thead style={{ background: 'var(--light)' }}>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Beds</th>
            <th>Class</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.requestId}>
              <td>{r.requestId}</td>
              <td>{r.userId}</td>
              <td>{r.numberOfBeds}</td>
              <td>{r.roomClass}</td>
              <td>{formatDate(r.checkIn)}</td>
              <td>{formatDate(r.checkOut)}</td>
              <td>
                <Button size="sm" onClick={() => handleAction(r, 'approve')} style={{ marginRight: 4 }}>
                  Approve
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleAction(r, 'reject')}>
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
