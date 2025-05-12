export async function getInvoice(id) {
  const res = await fetch(`/invoice?id=${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Invoice fetch failed');
  return res.json();
}
