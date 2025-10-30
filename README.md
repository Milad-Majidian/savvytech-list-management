# SavvyTech List Management

SavvyTech List Management is a modern React application for managing lightweight item lists. It showcases a polished UI built with Tailwind CSS tokens, Radix primitives, and custom theming that supports light and dark modes. Data is persisted locally, giving an app-like feel without a backend.

## Features
- Responsive list dashboard with sortable-like layout and subtle motion.
- CRUD item management backed by Zustand with localStorage persistence.
- Radix-powered modal workflow with consistent theming and scroll-lock handling.
- Tailwind v4 pipeline using semantic design tokens for consistent styling.
- Theme toggle with no-flash script and accessible focus states.
- Comprehensive unit tests for utilities, store logic, and services using Vitest.

## Tech Stack
- [Vite 7](https://vitejs.dev/) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) with custom token mapping
- [Radix UI](https://www.radix-ui.com/) + shadcn-inspired components
- [Zustand](https://zustand-demo.pmnd.rs/) state management
- [Vitest](https://vitest.dev/) + Testing Library for testing
- pnpm for dependency management

## Getting Started

### Prerequisites
- Node.js 20+
- [pnpm](https://pnpm.io/) 9+

### Installation
```bash
pnpm install
```

### Running in Development
```bash
pnpm dev
```
The dev server runs on `http://localhost:5173` by default.

### Production Build
```bash
pnpm build
```
This command runs TypeScript checks and emits the production bundle to the `dist/` folder.

Preview the production build locally with:
```bash
pnpm preview
```

## Testing

Vitest is configured with jsdom, Testing Library, and custom setup mocks.

Run the suite once:
```bash
pnpm test --run
```

Watch mode:
```bash
pnpm test:watch
```

Generate coverage reports (text, JSON, HTML in `coverage/`):
```bash
pnpm test:coverage
```

Launch the Vitest UI runner:
```bash
pnpm test:ui
```

## Linting & Formatting

```bash
pnpm lint
```

Formatting is handled via Prettier (see project configuration).

## Project Structure

```
src/
├─ assets/                 # Static assets
├─ components/             # Reusable UI elements and layout primitives
├─ contexts/               # Theme context provider
├─ features/List/          # List domain (components, store, services, schemas)
├─ lib/                    # Shared utilities
├─ providers/              # App-wide providers
└─ test/                   # Test setup and shared typings
```

## Theming Notes
- Theme tokens live in `tailwind.tokens.ts` and are wired into Tailwind via CSS variables.
- `index.html` contains the no-flash theme initialization script.
- Scroll locking and modal animations are handled in `src/index.css`.

## Contributing
1. Fork the repository and create a branch.
2. Install dependencies with `pnpm install`.
3. Implement changes with accompanying tests.
4. Run `pnpm lint` and `pnpm test --run`.
5. Submit a pull request describing your updates.

## License

This project is currently unlicensed. Reach out to the maintainer (Milad Majidian) for usage inquiries.
