# DinPatra

DinPatra is an offline-first Indian calendar PWA.

## Local Development

```bash
npm install
npm run dev
```

Other useful scripts:

- `npm run build`
- `npm run lint`
- `npm run preview`

## Production Deployment

DinPatra is deployed automatically from the `main` branch through GitHub Actions.

The production build uses a configurable Vite base path:

- `/` for local development and custom-domain hosting
- `/<repository-name>/` for GitHub Pages project sites

The workflow sets `VITE_BASE_PATH` during the production build so asset URLs, the manifest, and runtime data resolve correctly on GitHub Pages.

## GitHub Pages

The repository is configured to deploy to GitHub Pages using the recommended GitHub Actions flow:

1. build the app
2. upload the `dist` output
3. deploy the artifact to Pages

Before the first deployment, set the repository's Pages source to GitHub Actions in GitHub settings.

The app is safe to host at either the site root or a repository subpath because all runtime and asset URLs are base-path aware.

## GitHub Actions

The deployment workflow lives in [.github/workflows/deploy.yml](./.github/workflows/deploy.yml).

It:

- installs dependencies with `npm ci`
- builds the app
- uploads the production artifact
- deploys from the `main` branch automatically

## PWA Installation

DinPatra ships with a production web app manifest and a generated service worker.

To install it:

- open the deployed site in a supported browser
- use the browser install prompt when available
- or choose the browser install option from the menu

## Offline Support

After the first successful visit, DinPatra caches the production app shell and runtime calendar data for offline use.

Cached assets include:

- HTML
- CSS
- JavaScript
- runtime calendar JSON
- icons

DinPatra currently uses system fonts, so there are no custom font files to cache.

## Repository Structure

- `src/app` contains application composition
- `src/components` contains reusable UI components
- `src/core/temporal` contains the Temporal Engine
- `src/core/services` contains service boundaries
- `src/data` contains runtime repository adapters
- `src/db` contains the Dexie database entry point
- `src/hooks` contains application state hooks
- `src/models` contains shared contracts
- `src/pages` contains screen composition
- `src/styles` contains application styling
- `public/runtime-data` contains mock runtime calendar data

## Notes

- The application always opens on today's date.
- The selected view is persisted in localStorage through the preference service.
- CSV parsing, runtime JSON generation, notification logic, and storage schemas are still deferred to later work.
