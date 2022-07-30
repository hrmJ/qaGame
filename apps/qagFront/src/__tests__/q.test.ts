import { cleanup, render } from '@testing-library/svelte';
import { describe, it } from 'vitest';
import QuestionScreen from '../routes/q.svelte';
import { server } from 'src/setupTests';
import { rest } from 'msw';

describe('question screen', () => {
	afterEach(() => {
		cleanup();
	});

	it('Shows a question on init if request succesful ', async () => {
		const text = 'text for a question';
		server.use(
			rest.get('/cards/question', (_, res, ctx) => res(ctx.status(200), ctx.json({ text })))
		);
		const { findByText } = render(QuestionScreen);
		await findByText(text);
	});

	it('Shows an error message on init if request not succesful ', async () => {
		const error = 'Kysymyksen lataaminen ei onnistunut';
		server.use(
			rest.get('/cards/question', (_, res, ctx) => res(ctx.status(400), ctx.json({ error: '' })))
		);
		const { findByText } = render(QuestionScreen);
		await findByText(error);
	});
});
