# Frontend

This project’s frontend is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It uses **React Router DOM** for browser navigation and manages state via React hooks.

## Structure

- **App.tsx** – Root component that sets up main application routes and layout.
- **main.tsx** – Entry point that renders the application into the DOM.
- **components/** – Reusable presentational and logical components (Header, Footer, ProductCard, etc.).
- **pages/** – Individual views or screens (Home, CategoryPage, ProductPage, etc.).
- **hooks/** – Custom hooks for component logic reuse.
- **public/** – Static files and assets that Vite serves directly.
- **types/** – TypeScript interfaces and types (Product, Category, etc.).

## Technologies

- **React** & **TypeScript** – Core libraries for building UI with static typing.
- **Vite** – Fast build tool for development and production bundling.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **React Router DOM** – Declarative navigation and routing.

## Development

1. Run `npm install` in the frontend directory to install dependencies.
2. Use `docker compose watch` or `npm run dev` for local development with hot reloading.
3. The frontend runs on [http://localhost:5012](http://localhost:5012) by default.
