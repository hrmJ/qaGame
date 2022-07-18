import { rest } from 'msw';

export const handlers = [
	rest.post('/cards', (_, res, ctx) => {
		return res(ctx.status(200), ctx.json({ id: 1 }));
	})
];
