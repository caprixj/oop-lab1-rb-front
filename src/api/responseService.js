export async function getResponses() {
  const res = await fetch('/responses', { credentials: 'include' });
  if (!res.ok) throw new Error('Responses fetch failed');
  return res.json();
}
