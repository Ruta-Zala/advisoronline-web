# Advisor Online Web (Nuxt 3)

> This is a companion project for [advisoronline-strapi](https://git.jagaad.com/advisoronline/advisoronline-strapi)

> UI Components (Storybook)  
> https://main--639c9352fa885e71d31acda5.chromatic.com

> Figma file
> https://www.figma.com/file/Soauz0ItmNUFfDFQY2HoKE/ADVISOR-Online

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Prerequisites

- Node 16, NPM 8
- Visual Studio Code with installed recommended extensions
- An instance of [advisoronline-strapi](https://git.jagaad.com/advisoronline/advisoronline-strapi)

## Setup

Make a copy of [`.env.example`](.env.example) to `.env` and adjust the properties by reading the comments

```bash
cp .env.example .env
```

> It is recommended to reload Visual Studio Code when changing .env properties  
> Some extension like Apollo will cache .env and won't change until reload

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Release

Running the release command, will make a diff from last release, and based on conventional commits will prepend to the [`CHANGELOG.md`](CHANGELOG.md) all the new changes

```shell
npm run release
git push --follow-tags
```
