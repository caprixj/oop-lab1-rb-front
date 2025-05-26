import React, { useEffect, useState } from 'react'
import { Table, Container } from 'react-bootstrap'
import { getResponses } from '../api/responseService'
import { useAuth } from '../contexts/AuthContext'
import formatDate from '../utils/formatDate'

export default function ResponsesPage() {
  const [data, setData] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return
    getResponses(token)
      .then(setData)
      .catch(err => alert(err.message))
  }, [token])

  return (
    <Container className="py-4">
      <h3>My Responses</h3>
      <Table bordered hover>
        <thead style={{ background: 'var(--light)' }}>
          <tr>
            <th>Request ID</th>
            <th>Status</th>
            <th>Message</th>
            <th>Responded At</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.responseId}>
              <td>{r.requestId}</td>
              <td>{r.status}</td>
              <td>{r.message}</td>
              <td>{formatDate(r.respondedAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
