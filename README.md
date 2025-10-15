# react-users-dashboard

A Vite + React + Tailwind project that fetches users from JSONPlaceholder and includes:
- Search, filter, sort
- Pagination
- Dark / Light theme (persisted)
- Vitest + Testing Library basic test

## Run locally

1. Install dependencies
```bash
npm install
```

2. Start dev server
```bash
npm run dev
```

3. Run tests
```bash
npm run test
```

## Technical Choices

- React: Functional components with hooks for state management.
- useMemo & useCallback: Optimized filtering, sorting, and pagination to prevent unnecessary renders.
- TailwindCSS: Rapid and responsive UI styling, dark mode support.
- Pagination: Simple client-side pagination for large datasets.
- Custom Hook useUsers: Centralized API fetching logic.
- React Testing Library + Vitest: Unit tests for components ensuring UI correctness.

# AI Usage

- The project structure, code modularization, and test patterns were assisted by an AI assistant.
- used for tailwind css styling

## Scaling & Team Practices

- Component Reusability: Breaking UI into small, single-responsibility components allows multiple developers to work independently.

- State Management: Dashboard-level state is centralized; future scaling could adopt Redux or Zustand for global state.

- Testing: Components include unit tests; team practice encourages test coverage for all new components.

- Code Review & CI/CD: Pre-commit hooks, linting, and CI pipelines recommended for scaling in larger teams.

- Theming & UI Consistency: Tailwind ensures consistent styling; dark mode toggling can be centralized for theme management.

- API Handling: Current useUsers is simple fetch; for scaling, introduce React Query or SWR for caching and server state.

