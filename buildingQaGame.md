# Setting up turborepo

- Installed turborepotemplate `npx create-turbo@latest`

The important config is actually in `package.json`

## Added api as app

At first, I was looking for configs, parsing through the docs and wondering why it
seemed so obscure. Then I realized my way of thinking about this was too
complicated. All I had to do was remove all the default projects and
simply create a new npm project inside the `./apps` folder.

So I just cd'd into `./apps`, created a folder for the api (called qagApi) and
ran npm init inside that folder. Next steps: just launch a simple fastify api
inside the folder.

- Went to `./api`

```
npm init
pnpm install --save-dev fastify
pnpm install --save-dev typescript
pnpm install --save-dev ts-node-dev

pnpm add -D ts-node-dev
pnpm add -D @types/node@"*"

tsc --init
```

I created a basic `server.ts` and set up a dev script in `./gaqApi/package.json` as `"dev": "ts-node-dev src/server.ts"`.
Now, I could

- either run `npm run dev` inside `./gaqApi` and get the server up and running
- **or** (the point of a turborepo-style monorepo) go to the root of the project and run `pnpm dev`

At this point, this is what my folder structure looked like:

```
.
├── apps
│   └── qagApi
│       ├── package.json
│       ├── src
│       │   └── server.ts
│       └── tsconfig.json
├── package.json
├── packages
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

```

### API testing

Wow, fastify seems so easy to test!

- installed vitest
- separate app into a build function
- use inject as you would use supertest:

```

```

### DB

Migrations:

https://github.com/salsita/node-pg-migrate

```
pnpm add node-pg-migrate pg
# add migrate script as node-pg-migrate
npm run migrate create add cards table
```

## Added front as app

Now I knew the drill: go inside `apps` and create a new folder with it's own `package.json`.
I wanted to use svelte(kit) for this, so I went into the apps folder and ran

```bash
npm create svelte qagFront
```

### Had a version mismatch with node / pnpm

Oh-no, some trouble:

```
pnpm env use --global 16.10
pnpm add -g pnpm
pnpm add eslint-config-custom@*
```

### Add testing to front

```
pnpm add -D @testing-library/svelte
pnpm add -D vitest
pnpm add -D vitest-svelte-kit
pnpm add -D jsdom
```

create vitest.config.js

```
import { extractFromSvelteConfig } from 'vitest-svelte-kit';

export default extractFromSvelteConfig();
```

in addition, modify svelte.config.js to include:

```
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			test: {
				environment: 'jsdom',
				globals: true,
				setupFiles: ['src/setupTests.ts'],
				deps: {
					inline: ['msw']
				}
			}
		}
	}
};
```

Note: the deps part is due to installing msw. In order to make it work, I had
to use the beta version (0.30) and add the inline option to deal with msw + esm
exports. `globals:true` was also necessary.

#### Adding MSW

Trying out mock service worker with this.

```

pnpm add -D msw@beta
mkdir src/mocks

```

Created `src/mocks/handlers.ts`

#### Using msw in browser

Nice guide: https://flaming.codes/posts/msw-in-sveltekit-for-local-development

```
npx msw init static/ --save
```

Folder structure:

```
src/
├── app.d.ts
├── app.html
├── mocks
│   ├── browser.ts
│   ├── handlers.ts
│   ├── index.ts
│   └── setup.ts

```

- Using layout.svelte to inject the handlers
- Configuring vite.config + tsconfig.json

## Utilizing more of the monorepo benefits

### Unifying tsconfig

### Unifying prettier + eslint

(what about `ts-es-lint`?)

### Some fun facts about working with pnpm

It's so much easier to just run `tree`: node_modules isn't 1000 levels deep, but looks just:

```

.
├── node_modules
│   ├── fastify -> ../../../node_modules/.pnpm/fastify@4.2.0/node_modules/fastify
│   ├── ts-node-dev -> ../../../node_modules/.pnpm/ts-node-dev@2.0.0_x2utdhayajzrh747hktprshhby/node_modules/ts-node-dev
│   ├── @types
│   │   └── node -> ../../../../node_modules/.pnpm/@types+node@17.0.45/node_modules/@types/node
│   └── typescript -> ../../../node_modules/.pnpm/typescript@4.7.4/node_modules/typescript
├── package.json
├── src
│   └── server.ts
└── tsconfig.json

```

```

```
