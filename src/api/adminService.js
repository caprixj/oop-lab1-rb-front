export async function getPendingRequests() {
  const res = await fetch('/admin', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch pending requests');
  return res.json();
}

export async function respondToRequest({ requestId, action, roomId, message }) {
  const params = new URLSearchParams({ requestId, action, roomId, message });
  const res = await fetch('/admin', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  if (!res.ok) throw new Error('Failed to respond');
  return res.json();
}
