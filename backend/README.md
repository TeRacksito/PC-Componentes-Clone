# Backend

This project’s backend provides a Node.js and Express-based REST API and integrates seamlessly with a MySQL database via Sequelize. It is organized into controllers, models, routers, services, and middlewares.

## Structure

- **app.ts** – Initializes the Express application and applies middleware.
- **server.ts** – Boots the application on a specified port.
- **controllers/** – Contains controller modules for handling request logic (home, product, category, etc.).
- **models/** – Houses Sequelize models and their relationships (Product, Category, etc.).
- **routers/** – Configures route endpoints for products, categories, and dynamic paths.
- **services/** – Implements business logic and database queries for the controllers.
- **middlewares/** – Provides error handling and custom request handling.

## Technologies

- **Node.js + Express** – Core server framework for handling HTTP requests.
- **MySQL** – Relational database system.
- **Sequelize** – ORM for database modeling and queries.
- **TypeScript** – Ensures robust, statically typed structures.
- **Redis** – In-memory data structure store, used as a database for sessions.

## Development

1. Run `npm install` in the backend directory to install dependencies.
2. Use `docker compose watch` or `npm run dev` for local development with hot reloading.
3. The backend runs on http://localhost:5011 by default.
