//
const apiUrl = 'http://localhost:3000';

interface Card {
	contentType: 'q' | 'a';
	text: string;
}

export async function loadCard(contentType: 'q' | 'a', usedIds?: string[]) {
	const url = `${apiUrl}/cards/${contentType}`;
	const stringParams = usedIds ?? [];
	const params = stringParams.map((id) => new URLSearchParams({ used: id }));
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
