# Hatch Better Full Stack Assessment Backend

The Backend is a Node.js API server for the Marvelous 2.0 Todo application. It provides the necessary API endpoints for managing tasks and supports search functionality. The backend is built using TypeScript, Express, and PostgreSQL.

This project is deployed on Vercel. You can visit the live application at [https://hatch.noahvandenberg.com](https://hatch.noahvandenberg.com).

For the backend API server, please visit the [Hatch Better Full Stack Assessment Backend Repository](https://github.com/noahvandenberg/hatchbetter-backend-ts).

## Features

- CRUD operations on tasks
- Alphabetically sorted task lists
- Limited display of the 10 most recently completed tasks
- Search functionality for both "To Do" and "Done" lists
- Single Page Web App (SPA) support
- All business logic on the API side

## Requirements

- Node.js v14 or later
- PostgreSQL v12 or later

## Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/noahvandenberg/hatchbetter-backend-ts.git
   cd hatchbetter-backend-ts
   ```

2. Install dependencies.

   ```bash
   yarn install
   ```

3. Create a `.env` file in the project root and add the `DATABASE_URL` environment variable with your PostgreSQL connection string.

   ```
   DATABASE_URL=your_connection_string_here
   ```

4. Set up your PostgreSQL database and run the following SQL commands to create the `todos` table:

   ```sql
   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     value TEXT NOT NULL,
     done BOOLEAN NOT NULL,
     completed_at TIMESTAMP
   );
   ```

5. Start the development server.

   ```bash
   yarn start
   ```

   The API server will be running at `http://localhost:3001`.

## API Endpoints

| Method | Endpoint     | Description                                                                                                                                   |
| ------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/todos` | Fetches all tasks, sorted alphabetically, filtered by search query. Returns separate lists for "To Do" and "Done" tasks.                      |
| POST   | `/api/todos` | Creates a new task with the provided `value` and `done` status. Returns the created task.                                                     |
| PATCH  | `/api/todos` | Updates an existing task's `done` status and `completed_at` timestamp based on the provided `id` and `done` status. Returns the updated task. |
| DELETE | `/api/todos` | Deletes all tasks.                                                                                                                            |
