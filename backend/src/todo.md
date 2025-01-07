# Backend To-Do List

## Project Setup

- [x] Set up backend structure with controllers, models, routers, services, middlewares, and config.
- [x] Separate `app.ts` and `server.ts`.
- [x] Set up Sequelize for database connection.

## Endpoints and Routing

- [x] Implement dynamic routing to handle slugs representing products or categories.
- [x] Implement endpoints for specific product, specific category, and products related to a category.
  - API handles parent categories by recursively collecting all child category products.
- [ ] Implement endpoints to support filters by price, brand, and vendor on category products.
- [ ] Implement endpoints for search queries by name.
- [ ] Implement user authentication endpoints (Login, Sign-Up).
- [ ] Implement cart-related endpoints.
- [ ] Implement endpoints for posting reviews and questions.
- [ ] Support full REST operations: GET (listing and individual), POST, PUT, DELETE for resources.

## Middleware

- [ ] Improve and fix middlewares.
  - Identify and resolve issues caused by dynamic routing.

## Utilities

- [ ] Create a `utils` folder.
  - [ ] Implement a logger.
  - [ ] Add other utility functions as needed.

## Types and Interfaces

- [ ] Centralize types by creating a folder.

## Data Considerations

- [ ] Collect more detailed product data to provide full product information via API.

## Deployment

- [ ] Adjust configuration for production environment deployment.
  - Ensure Docker and server configurations are suitable for production use.
