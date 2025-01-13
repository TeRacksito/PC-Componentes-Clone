# Frontend To-Do List

## Project Setup

- [x] Create folders for components, hooks, pages, and types.
- [x] Configure Tailwind CSS 4.0.
- [x] Set up React Router DOM for client-side routing without page reloads.

## Components

- [x] Create components: Category Card, Product Card, Layouts, Header, Footer, Buttons, Breadcrumbs.
- [/] Implement loading states for components and pages (loading skeletons).
- [/] Implement proper error pages (404, 500, etc.).

## Pages

### Home Page

- [x] Implement home page displaying featured products and categories.

### Category Page

- [x] Implement category page with ordering query strings and pagination.
- [ ] Implement filters by price, brand, and vendor.

### Product Page

- [/] Implement full product page with detailed product information.
  - [x] Display image carousel.
  - [x] Display product details.
  - [x] Add to cart functionality.
  - [/] Display product comments.
  - [ ] Display product questions.

### User-Related Pages

- [x] Implement Login page (test user -> username `test` password `test`).
- [ ] Implement Sign-Up (Registration) page.
- [ ] Implement User Account page.
- [x] Implement Cart page.

### Other Pages

- [ ] Implement About Us page.
- [ ] Implement Contact Us page.
- [ ] Implement Privacy Policy page.

## Header Component

- [/] Implement header with logo, search bar, user account and cart icons.
  - [x] Implement logo home link.
  - [/] Implement search bar.
  - [x] Implement user account link.
  - [x] Implement cart link.
- [ ] Improve side-slide menu for category navigation.
  - Make the menu slide in/out smoothly.
  - Display categories starting with root categories and loading their children recursively.

## Search Functionality

- [ ] Implement search bar functionality.
  - Allow users to perform search queries by product or category name.
  - Provide category suggestions while typing.

## Error Handling

- [/] Implement proper error handling and display in the frontend.
  - [x] Create a status component to display error/success messages.
  - [/] error handling for API requests.
  - [x] error handling for form validation.
  - [ ] error pages (404, 500, etc.).
  - [/] Replace basic error strings with user-friendly error messages.

## Optimizations

- [ ] Implement loading skeletons for better user experience during data fetching.

## Overall ux/ui
### 6.5/10