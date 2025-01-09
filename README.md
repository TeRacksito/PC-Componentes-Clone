# PC-Componentes-Clone

PC-Componentes-Clone is a full-stack project designed to replicate the functionalities of the popular e-commerce platform [PC Componentes](https://www.pccomponentes.com). The project leverages modern web technologies to create a robust, scalable, and maintainable architecture. It includes a React frontend, a Node.js backend, and a MySQL database, all orchestrated using Docker.

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
  - [Docker](https://docs.docker.com/get-docker/)
  - [Docker Compose](https://docs.docker.com/compose/install/)

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
       netsh interface ipv4 show excludedportrange protocol=tcp
     ```
     _Of course, Windows making trouble with no reason..._
