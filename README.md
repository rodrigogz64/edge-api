<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" /></a>
</p>

## Prerequisites 
Before getting started, make sure you have the following installed on your machine:

1. **Node.js and npm:**
   - You can download it from [Node.js](https://nodejs.org/).

2. **Nest CLI:**
   - You can install it globally with:
     ```bash
     npm install -g @nestjs/cli
     ```

3. **Docker (Optional):**
   - Docker is not required, but it makes setting up PostgreSQL and RabbitMQ easier. If you choose to use Docker, remember to install Docker Compose:

      - Windows and macOS: Docker Compose is included automatically with [Docker Desktop](https://www.docker.com/products/docker-desktop/).
      - Linux: Please refer to the [official documentation](https://docs.docker.com/desktop/install/linux/) for installation instructions.

4. **PostgreSQL (if not using Docker)**
    - Download from  PostgreSQL [official website](https://www.postgresql.org/download/).

5. **RabbitMQ (if not using Docker)**
    - Download from RabbitMQ [official website](https://www.postgresql.org/download/).

6. **Environment Variables:**
   - Make sure to have a `.env` file in the root of the project with the following configurations to handle the connection to PostgreSQL and RabbitMQ.

    **Note:** If you're running PostgreSQL and RabbitMQ locally, replace user and password with your own credentials. If you don't use the defaults provided in the `.env.sample`.

## Project setup

### Install Dependencies
Run this command to install the dependencies:
```bash
npm install
```
----
### Using Docker(optional)

#### Start the containers
To start the Docker containers, use one of the following commands:
```bash
docker-compose up
```
or

```bash
docker compose up
```
**Note:** The Docker setup includes pre-configured images for PostgreSQL and RabbitMQ.

---
### Running the app without Docker
If you are not using Docker, make sure that both PostgreSQL and RabbitMQ are manually configured and running. Then, start the app with:
```bash
npm start
```

## 
Once the containers are up and running, you can access the following services:

* **Application:** Open your browser and go to http://localhost:3000/graphql.

* **PostgreSQL:** Connect to PostgreSQL at `localhost:5432` and you can using a database client (e.g., pgAdmin, [DBeaver](https://dbeaver.io/download/)).

* **RabbitMQ:** 
Access the management interface at http://localhost:15672 (put username and password).

##

## Project Structure

- `src/:` Main source directory.
  - `main.ts:` Entry point of the NestJS application.
  - `app.module.ts:` Root module of the application.
  - `edges/:` Directory for Edge-related functionality.
    - `dto/:` Directory for Data Transfer Objects.
      - `create-edge.input.ts:` DTO for creating new Edges.
    - `edge.entity.ts:` Edge entity definition.
    - `edge.module.ts:` Edge module configuration.
    - `edge.resolver.ts:` GraphQL resolver for Edge operations.
    - `edge.service.ts:` Service containing Edge business logic.

  - `rabbitmq/:` Directory for RabbitMQ integration.
    - `rabbitmq.constants.ts:` Constants used in RabbitMQ configuration.
    - `rabbitmq.module.ts:` RabbitMQ module configuration.
    - `rabbitmq.service.ts:` Service for handling RabbitMQ operations.
