# Wasn't sure about turborepo, but the kids insisted on it!

Last summer I was thinking about starting a toy project of some sorts. The
webdev landscape is developing fast, and I have a long backlog of things I
would like to give a try. Here are just some:

- Js monorepos instead of separate repos for frontend / backend / utility packages
- pnpm instead of yarn / npm
- Mock service worker for testing instead of knex / mocking fetch
- The qwik framework

Instead of figuring out a complex real project or waiting a couple of years for
a chance to try these out at my day job, I found an opportunity a lot closer:
in my two kids and their love for an old card game called 77 funny questions
and silly answers. In this two-player game one player is given a stack of
random questions and the other one a stack of random but applicable answers.
The only problem: the questions and answers were getting a bit too familiar.
The solution: a small web app for creating your own.

You might argue that this type of a project does not necessarily call for
something as complexly sounding as a monorepo, but nevertheless I decided to
give it a try. Turned out it gave me content for at least a couple of blog
posts. Let me, In this first one, summarise how I used turborepo to
construct the basic structure of the app.

## Getting started

You don't have study linguistics for 5 years in order to understand that the
first part of the word _monorepo_ is derived from Greek and probably means
something consisting of only a single instance. Tracing the etymology of
_repository_ all the way back to Latin's _reponere_ ('reposition') might
be a taller task but, then again, probably not entirely necessary in
order to understand the basic idea: monorepos are a way to build applications inside a
single repository. Instead of building a good old php monolith, you could
still, however, have separate apps for your backend, frontend etc.

All this I had kind of figured out. The actual point of using
something like turborepo wasn't, however, completely clear to me. What better
way to fill in the gaps than check it out in practice?

The fast way to get started with turborepo is to run `npx create-turbo@latest`.
The initialization script let's you choose your package manager (I chose
pnpm to test that out, too) and scaffolds a basic folder structure for a
turborepo project. After some stripping down, mine looked like the following;

```

├── apps
│   ├── qagApi
│   │   ├── node_modules
│   │   ├── package.json
│   │   ├── src
│   └── qagFront
│       ├── node_modules
│       ├── package.json
│       ├── package-lock.json
│       ├── src
├── package.json
├── packages
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json
├── packages
│   ├── my-eslint-conf
│   ├── my-ts-conf


```

At first, I was a bit confused: what is the config file I need to edit and
what commands do I need to run in order to start developing the project's apps

looking for configuration files, parsing
through the turborepo docs and wondering why it seemed so obscure. Then I
realized my way of thinking about this was too complicated. All I had to do was
remove all the default projects and simply create a new npm project inside the
`./apps` folder.
