//
import { describe, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import NewCardForm from '../../routes/cards/new.svelte';
import { server } from 'src/setupTests';
import { rest } from 'msw';

describe('Form for adding new card', () => {
	afterEach(() => {
		cleanup();
	});

	it('shows an input for the card text', () => {
		const { getByLabelText } = render(NewCardForm);
		getByLabelText('Kortin teksti');
	});

	it('Has the ability to choose q or a with q as default', () => {
		const { getByRole } = render(NewCardForm);
		const radioQ = getByRole('radio', { name: /Kysymys/ });
		const radioA = getByRole('radio', { name: /Vastaus/ });
		expect(radioQ).toBeChecked();
		expect(radioA).not.toBeChecked();
	});

	it('Initially shows no info about saving', () => {
		const { queryByText } = render(NewCardForm);
		expect(queryByText('Tallennettu')).not.toBeInTheDocument();
		expect(queryByText('ei onnistunut')).not.toBeInTheDocument();
	});

	it('Shows a message if card succesfully submitted', async () => {
		const id = 1;
		server.use(rest.post('/cards', (_, res, ctx) => res(ctx.status(201), ctx.json({ id }))));
		const { getByRole, findByText } = render(NewCardForm);
		const submit = getByRole('button', { name: /Tallenna/ });
		await userEvent.click(submit);
		await findByText('Tallennettu');
	});

	it('Shows a message if card not succesfully submitted', async () => {
		const error = 'Some error';
		server.use(rest.post('/cards', (_, res, ctx) => res(ctx.status(400), ctx.json({ error }))));
		const { getByRole, findByText } = render(NewCardForm);
		const submit = getByRole('button', { name: /Tallenna/ });
		await userEvent.click(submit);
		await findByText(/ei onnistunut/);
	});

	it.skip('Shows a validation error message if text is empy', async () => {
		const error = 'Kirjoita jotain kortin tekstiksi';
		server.use(rest.post('/cards', (_, res, ctx) => res(ctx.status(422), ctx.json({ error }))));
		const { getByRole, findByText } = render(NewCardForm);
		const submit = getByRole('button', { name: /Tallenna/ });
		await userEvent.click(submit);
		await findByText(error);
	});
});
