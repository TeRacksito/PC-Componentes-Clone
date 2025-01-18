# PC-Componentes-Clone

PC-Componentes-Clone is a full-stack project designed to replicate the functionalities of the popular e-commerce platform [PC Componentes](https://www.pccomponentes.com). The project leverages modern web technologies to create a robust, scalable, and maintainable architecture. It includes a React frontend, a Node.js backend, and a MySQL database, all orchestrated using Docker.

## ToDo and README

Read the ToDos and READMEs in root project, frontend and backend. There can be found an overall view of currently implementend features, and future plans.

## Main branch

Main branch should be a functional version of the project, in terms of basic features and, more over, project structure. This means that the main branch should be always deployable and functional, no matter what development stage the project is.

## Features

- **Frontend**: Built with React, TypeScript, and Vite. Uses Tailwind CSS for styling and React Router DOM for navigation.
- **Backend**: Node.js and Express for handling API requests, with Sequelize for ORM.
- **Database**: MySQL database initialized with sample data, including products and categories.
- **Docker**: Containers for the client, server, and database to streamline development and deployment.
- **Dynamic Routing**: Supports dynamic routing for categories and products.
- **Development Setup**: Streamlined with Docker Compose, allowing all components to work seamlessly with live reloading.

## Installation

### Prerequisites

- Ensure you have the following software installed:

  - [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  - [Docker](https://docs.docker.com/get-docker/)
  - [Docker Compose](https://docs.docker.com/compose/install/)

  It's recommended to use Docker Desktop for inexperienced users of Docker

  - [Docker Desktop](https://app.docker.com/signup)

### Setup Instructions

1. **Clone the Repository**: Start by cloning the project repository to your local machine.

   ```bash
   git clone https://github.com/TeRacksito/PC-Componentes-Clone.git
   cd pc-componentes-clone
   ```

2. **npm install**: Install the dependencies for both the frontend and backend.

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Docker Compose**: Use Docker Compose to build and start all the services. This includes the frontend, backend, and database services.

   ```bash
   docker compose watch
   ```

4. **Access the Application**:

   - Frontend: Open a web browser and navigate to `http://localhost:5012`.
   - Backend API: Accessible at `http://localhost:5011`.

5. **Database Initialization**: The MySQL database will be automatically initialized with sample data. You do not need to perform any additional steps for the data to be available.

## Development Workflow

- **Frontend**: Changes made to the frontend source files will automatically be reflected in the browser due to hot reloading.
- **Backend**: The backend automatically restarts with Nodemon upon detecting changes.
- **Database Management**: SQL scripts for database initialization can be found in the `db-init` directory, which is mounted to the MySQL container using `docker-entrypoint-initdb.d`.

## Troubleshooting

- **Docker Issues**: If you encounter any issues with Docker and port bindings, try the following:

  1. **Port Already in Use**: Check if the required ports (5011, 5012, 3306) are already in use.
     ```cmd
     netstat -aon | findstr "5011 5012 3306"
     ```
     Kill the processes using the ports (replace `PID` with the actual process ID).
     ```cmd
     taskkill /F /PID [PID]
     ```
  2. **Reset WinNAT**: Try resetting the WinNAT network using privileged PowerShell.
     ```powershell
     net stop winnat
     net start winnat
     ```
     You can check the excluded port range of WinNAT, to make sure it was the issue.
     ```powershell
     netsh interface ipv4 show excludedPortRange protocol=tcp
     ```
     _Of course, Windows making trouble with no reason..._

- **package-lock.json**: There shouldn't be package-lock files other that the root one. Because NPM is set up with workspaces, all packages goes to root lock file.
  Having this in mind, the extension `Red Hat Dependency Analytics` with ID `redhat.fabric8-analytics` is not recommended for this project. As it creates a package-lock.json for every workspace. To remove it, you can disable the extension or remove it from the workspace settings.

## Known bugs
## Know bugs

- **User log in with large product's quantities**: When a user logs in with a cart having any product that has a quantity greater than the supported by the database, the log will show an error, but will be successfully at the same time (upon page reload, and the cart will be empty). This happens because the session allows for a much larger product quantity than the database, and when logging in, the session is dumped into the database, causing the error.
