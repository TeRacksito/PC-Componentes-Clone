# General To-Do List

## Project Setup and Structure

- [x] Create project structure for frontend and backend.
- [x] Set up Docker configuration (Dockerfile and docker-compose.yml).
- [x] Set up smooth development environment with `docker-compose watch` (container per service, live reloading).
- [x] Configure TypeScript.
- [x] Make Docker work with Vite hot reload on frontend and Nodemon on backend.
- [ ] Adjust Docker and project configuration for production deployment. !important

## Local Packages

- [x] Centralize common types and interfaces.

## Database

- [x] Set up MySQL database initialization using `docker-entrypoint-initdb.d`.
- [x] Create `init.sql` with data for tables:
  - [x] `categories`
  - [x] `products`
  - [x] `clients`
  - [x] `clients_pass`
  - [x] `clients_products`
  - [x] `flags`
  - [x] `products_categories`
  - [x] `product_flags`
- [x] Web scrape data for categories and products (scraped ~150 categories and ~40 products each).
- [ ] Collect more detailed data for products to fully replicate product pages (Negotiating with PC Componentes for data).

## General Tasks

- [ ] Implement `robots.txt` and `sitemap.xml` files (low priority).
