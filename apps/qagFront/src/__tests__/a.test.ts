import { cleanup, render } from '@testing-library/svelte';
import { describe, it } from 'vitest';
import AnswerScreen from '../routes/a.svelte';
import { server } from 'src/setupTests';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

describe('answer screen', () => {
	afterEach(() => {
		cleanup();
	});

	it('Shows a answer on init if request succesful ', async () => {
		const text = 'text for a answer';
		server.use(rest.get('/cards/a', (_, res, ctx) => res(ctx.status(200), ctx.json({ text }))));
		const { findByText } = render(AnswerScreen);
		await findByText(text);
	});

	it('Shows an error message on init if request not succesful ', async () => {
		const error = 'Lataaminen ei onnistunut';
		server.use(
			rest.get('/cards/a', (_, res, ctx) => res(ctx.status(400), ctx.json({ error: '' })))
		);
		const { findByText } = render(AnswerScreen);
		await findByText(error);
	});
	it('Shows a message if empty list of questions returned', async () => {
		const text = 'Kukaan ei ole lisännyt vastauksia';
		server.use(rest.get('/cards/a', (_, res, ctx) => res(ctx.status(200), ctx.json(null))));
		const { findByText } = render(AnswerScreen);
		await findByText(text);
	});

	it('Renders the next question when the next button is clicked', async () => {
		const texts = ['txt 1', 'txt 2'];
		const nextButtonText = 'Uusi vastaus';
		server.use(
			rest.get('/cards/a', (_, res, ctx) => res(ctx.status(200), ctx.json({ text: texts[0] })))
		);
		const { getByRole, findByText } = render(AnswerScreen);
		const button = getByRole('button', { name: nextButtonText });
		server.use(
			rest.get('/cards/a', (_, res, ctx) => res(ctx.status(200), ctx.json({ text: texts[1] })))
		);
		await userEvent.click(button);
		await findByText(texts[1]);
	});
});
