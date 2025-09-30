# worklife

`worklife` is a web app that helps you track your habits to improve your work-life balance.

- Made with [SvelteKit](https://kit.svelte.dev) and [Tailwind CSS](https://tailwindcss.com).
- Hosted on [Cloudflare Workers](https://cloudflare.com/workers).
- Supports offline usage with service workers and is installable as a PWA.
- Uses localStorage to store user data.

## Features

- Create habits from scratch or using templates.
- Track your habits daily, weekly, or monthly.
- Create habits with quantifiable targets.
- Assign categories to habits for better organization. (Some categories have special icons.)
- View your progress on quantifiable habits with a chart.
- Delete habits you no longer need or archive them to keep them in your stats.
- Import habits from a JSON file.
- Motivate yourself with completion streaks (per habit and overall).
- Earn experience points for completing habits and level up.
- Earn coins for leveling up and spend them on special rewards in the store.
- Install the app on your device and use it offline.
- Receive notifications to remind you to track your habits.

## Production deployment

You can check out the production deployment [here](https://prod24.otomir23.me/).

## Local development

### Setup
- Clone the repo and install dependencies using [`pnpm`](https://pnpm.io).
  ```bash
  git clone https://github.com/otomir23/worklife
  pnpm install
  ```

### Scripts

- `dev`: Starts the development server.
- `build`: Builds the app for production.
- `preview`: Serves the production build locally.
- `lint`: Runs ESLint.

> **Note**: PWA & Offline support are disabled in development mode.