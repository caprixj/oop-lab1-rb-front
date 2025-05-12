export async function createBooking({ numberOfBeds, roomClass, checkIn, checkOut }) {
  const res = await fetch('/booking', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numberOfBeds, roomClass, checkIn, checkOut })
  });
  if (!res.ok) throw new Error('Booking failed');
  return res.json();
}
