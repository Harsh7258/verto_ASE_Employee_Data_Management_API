# Employee Data Management API

A **RESTful API** for managing employee records, built with **Node.js**, **Express**, and **SQLite**. The API allows you to **create, read, update, delete, search, and filter employee records**. Designed following the **MVC architecture**, it focuses on **clean code, proper error handling, and secure, scalable endpoints**.

- **Brainstrom REST API Design:** [Design Link](https://app.eraser.io/workspace/IhhmCnFSzFOsrn4loXrn?origin=share)

## Project Overview

## Installation & Setup: to run it locally

1. Clone the repository:

   > git clone <repo-url>

2. Install dependencies:

   > run
   > npm install

3. create .env file with:

   > PORT=8000
   > DB_NAME=your_db_name

4. Start the react:

   > npm run dev

5. Server runs at http://localhost:8000

6. Connect it with frontend Employee Data Employeement Client

- **Employee Data Employeement Client**: [Connect this frontend](https://github.com/Harsh7258/verto_ASE_Employee_Data_Management_Client)

6. Good to go!!

- **Goal:** Create a simple CRUD backend for employee management.
- **Database:** SQLite (lightweight, file-based database for easy setup and prototyping)
- **Architecture:** MVC (Model-View-Controller) pattern for clear separation of concerns.
- **Features:**
  - CRUD operations for employees (`name`, `email`, `position`)
  - Search and filter employees
  - Pagination support
  - Error handling middleware
  - Security with **Helmet**, **CORS**, and **Rate Limiting**
- **Tech Stack:** Node.js, Express, SQLite, Express Middleware

## API Endpoints

- GET `/api/employee` - Get all employees, supports pagination and sorting by `createdAt`.
- GET `/api/employee/search?query=<value>` - Search employees by `id`, `name`, `email`, or `position`.
- POST `/api/employee/create-employee` - Create a new employee. Pass `name`, `email`, and `position` in request body.
- GET `/api/employee/:id` - Get a single employee by ID.
- PUT `/api/employee/:id` - Update an employee by ID. Pass updated `name`, `email`, `position` in request body.
- DELETE `/api/employee/:id` - Delete an employee by ID.

## API Documentation

- **Postman Collection:** [Click here to view API docs](https://documenter.getpostman.com/view/31106866/2sB3QJMpxQ)
- **Live API Endpoint:** [Deployed API Link](verto-ase-employee-data-management-api-production.up.railway.app)

### Error Handling

- Uses centralized error handler middleware.

- Returns structured JSON:
  {
  "status": "failed",
  "message": "Error message",
  "stack": "stack trace (only in development)"
  }

### Security

1. Helmet: Secures HTTP headers.
2. CORS: Allows cross-origin requests.
3. Rate Limiting: Limits requests to 100 per 15 minutes.

### Notes

1. Built from scratch focusing on clean and scalable API design.
2. All CRUD operations are fully functional.
3. Ready to integrate with React, Vue, or other frontend frameworks.
