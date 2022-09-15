import { cleanup, render } from '@testing-library/svelte';
import { describe, it } from 'vitest';
import QuestionScreen from '../routes/q.svelte';
import { server } from 'src/setupTests';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

describe('question screen', () => {
	afterEach(() => {
		cleanup();
	});

	it('Shows a question on init if request succesful ', async () => {
		const text = 'text for a question';
		server.use(rest.get('/cards/q', (_, res, ctx) => res(ctx.status(200), ctx.json({ text }))));
		const { findByText } = render(QuestionScreen);
		await findByText(text);
	});

	it('Shows an error message on init if request not succesful ', async () => {
		const error = 'Lataaminen ei onnistunut';
		server.use(
			rest.get('/cards/q', (_, res, ctx) => res(ctx.status(400), ctx.json({ error: '' })))
		);
		const { findByText } = render(QuestionScreen);
		await findByText(error);
	});

	it('Shows a message if empty list of questions returned', async () => {
		const text = 'Kukaan ei ole lisännyt kysymyksiä';
		server.use(rest.get('/cards/q', (_, res, ctx) => res(ctx.status(200), ctx.json(null))));
		const { findByText } = render(QuestionScreen);
		await findByText(text);
	});

	it('Renders the next question when the next button is clicked', async () => {
		const texts = ['txt 1', 'txt 2'];
		const nextButtonText = 'Uusi kysymys';
		server.use(
			rest.get('/cards/q', (_, res, ctx) => res(ctx.status(200), ctx.json({ text: texts[0] })))
		);
		const { getByRole, findByText } = render(QuestionScreen);
		const button = getByRole('button', { name: nextButtonText });
		server.use(
			rest.get('/cards/q', (_, res, ctx) => res(ctx.status(200), ctx.json({ text: texts[1] })))
		);
		await userEvent.click(button);
		await findByText(texts[1]);
	});

	it('iterates over the whole set of questions before showing a question again ', () => {
		//laksjd
	});
});
