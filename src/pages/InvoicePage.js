import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getInvoice } from '../api/invoiceService'
import { useAuth } from '../contexts/AuthContext'
import formatDate from '../utils/formatDate'

export default function InvoicePage() {
  const { id } = useParams()
  const [inv, setInv] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return
    getInvoice(id, token)
      .then(setInv)
      .catch(err => alert(err.message))
  }, [id, token])

  if (!inv) return null

  return (
    <Container className="py-4" style={{ maxWidth: 600 }}>
      <Card style={{ borderColor: 'var(--secondary)' }}>
        <Card.Header style={{ background: 'var(--secondary)', color: '#fff' }}>
          Invoice #{inv.invoiceId}
        </Card.Header>
        <Card.Body>
          <p><strong>Request:</strong> {inv.requestId}</p>
          <p><strong>Room:</strong> {inv.roomId}</p>
          <p><strong>Amount:</strong> ${inv.amount}</p>
          <p><strong>Issued:</strong> {formatDate(inv.issuedAt)}</p>
          <p><strong>Status:</strong> {inv.status}</p>
        </Card.Body>
      </Card>
    </Container>
  )
}
