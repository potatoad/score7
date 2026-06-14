# Score7

A modern scorekeeper application built with Svelte 5, SvelteKit, Tailwind CSS v4, and Paraglide JS for multi-language support.

## Features

- **Svelte 5 & SvelteKit**: Powered by the latest runes-based reactive paradigm (`$state`, `$derived`, `$inspect`).
- **Tailwind CSS v4**: Fast, next-generation styling engine paired with Flowbite components for UI structures.
- **Internationalization (i18n)**: Out-of-the-box support for English (`en`) and Spanish (`es`) managed efficiently via `@inlang/paraglide-js`.
- **Static Deployment Ready**: Configuration bundle prepared for seamless single-page-app generation or GitHub Pages hosting.
- **Markdown integration**: Integrated with `mdsvex` to parse and render Markdown content dynamically.

---

## Tech Stack & Tooling

- **Framework**: [Svelte 5](https://svelte.dev/) + [SvelteKit 2](https://svelte.dev/docs/kit/introduction)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Component UI**: [Flowbite Svelte](https://flowbite-svelte.com/) & Flowbite Icons
- **Internationalization**: [Paraglide JS](https://inlang.com/m/gerbcloq/library-inlang-paraglideJs)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Formatting & Linting**: Prettier (with Svelte and Tailwind sorting plugins), ESLint 10

---

## Getting Started

### Prerequisites

Ensure you have **Node.js** installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd score7
   ```

````

2. Install dependencies:
```sh
npm install

````

### Development Server

Start a development server with hot-module replacement (HMR) bound to your local host:

```sh
npm run dev

```

The app will be accessible at `http://localhost:5173` (or the next available port indicated in your console).

---

## Available Scripts

In the project directory, you can run the following scripts:

### Build & Production

| Command           | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run build`   | Compiles the production build of the SvelteKit app into optimized static files.                          |
| `npm run preview` | Locally previews the built production application.                                                       |
| `npm run deploy`  | Bundles the application and automatically deploys the built output to **GitHub Pages** using `gh-pages`. |

### Development & Maintenance

| Command               | Description                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run prepare`     | Syncs SvelteKit definitions and initial setup configurations.                                       |
| `npm run check`       | Checks typescript typings and Svelte health components using `svelte-check`.                        |
| `npm run check:watch` | Continually monitors files and watches for Svelte/TypeScript syntax warnings or compilation errors. |
| `npm run lint`        | Runs checks through Prettier and ESLint rulesets across code structures.                            |
| `npm run format`      | Automatically formats the code base using Prettier (including Tailwind class sorting).              |

---

## Localizing Content (i18n)

Translation keys are managed via Inlang's compiler setup. Translation files can be updated inside the `/messages` dictionary directory:

- English keys: `messages/en.json`
- Spanish keys: `messages/es.json`

The Paraglide routing layer will automatically hook language variations into runtime actions seamlessly.

---

## Recreating this Project

This project was initially bootstrapped using the Svelte CLI (`sv`). To recreate the exact framework template manually from scratch, execute:

```sh
npx sv@0.16.1 create --template minimal --types ts --add prettier eslint paraglide="languageTags:en, es+demo:yes" mdsvex --install npm score7

```
