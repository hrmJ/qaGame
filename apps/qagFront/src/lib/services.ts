//
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.debug({ apiUrl });

interface Card {
	contentType: 'q' | 'a';
	text: string;
	id: string;
	status?: string;
}

export async function loadCard(contentType: 'q' | 'a', usedIds?: string[]): Promise<Card | null> {
	const url = `${apiUrl}/cards/${contentType}?`;
	const stringParams = usedIds ?? [];
	const params = new URLSearchParams(stringParams.map((id) => ['used', id]));
	const res = await fetch(url + params, {
		headers: { 'Content-Type': 'application/json' }
	}).catch(() => null);
	if (!res?.ok) throw new Error('Lataaminen ei onnistunut');
	return await res.json();
}

export async function saveCard(card: Card) {
	const res = await fetch(`${apiUrl}/cards`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(card)
	}).catch(() => null);
	if (!res?.ok) throw new Error('Tallentaminen ei onnistunut');
	return res;
}
