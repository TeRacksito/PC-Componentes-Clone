# Backend To-Do List

## Project Setup

- [x] Set up backend structure with controllers, models, routers, services, middlewares, and config.
- [x] Separate `app.ts` and `server.ts`.
- [x] Set up Sequelize for database connection.
  - [x] `CategoryModel` for categories.
  - [x] `ProductModel` for products.
  - [x] `ClientModel` for clients.
  - [x] `ClientPassModel` for client passwords.
  - [x] `ClientProductModel` for client products in cart.
  - [x] `FlagModel` for products flags.
  - [x] `ProductCategoryModel` for product categories.
  - [x] `ClientProductModel` for client products.
  - [x] `ProductFlagModel` for product flags.
- [x] Set up associations between models.

## Endpoints and Routing

- [x] Implement dynamic routing to handle slugs representing products or categories.
- [x] Implement endpoints for specific product, specific category, and products related to a category.
  - API handles parent categories by recursively collecting all child category products.
- [ ] Implement endpoints to support filters by price, brand, and vendor on category products.
- [ ] Implement endpoints for search queries by name.
- [/] Implement client authentication endpoints (Login, Sign-Up).
  - [x] Client login (test user -> username `test` password `test`).
  - [ ] Client sign-up.
  - [x] basic authentication with JWT.
  - [x] password hashing and salting.
  - [ ] password recovery.
  - [ ] email verification.
- [x] Implement cart-related endpoints.
- [ ] Implement endpoints for posting reviews and questions.
- [x] Support full REST operations (CRUD):
  - [x] GET. For listing all kinds of resources.
  - [x] POST. For creating new resources.
  - [x] PUT. For updating existing resources, like products in cart.
  - [x] DELETE. For removing resources, like products from cart.

## Middleware

- [/] Improve and fix middlewares.
  - Identify and resolve issues caused by dynamic routing.

## Utilities

- [ ] Create a `utils` folder.
  - [ ] Implement a logger.
  - [ ] Add other utility functions as needed.

## Types and Interfaces

- [x] Centralize types by creating a folder.

## Data Considerations

- [ ] Collect more detailed product data to provide full product information via API.

## Deployment

- [ ] Adjust configuration for production environment deployment.
  - Ensure Docker and server configurations are suitable for production use.
