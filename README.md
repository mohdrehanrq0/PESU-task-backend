# Habit Tracker Backend

## Overview

This Node.js project serves as the backend for the Habit Tracker application, allowing users to manage their habits, track streaks, earn rewards, and visualize their progress through various endpoints. It features JWT-based authentication and role-based access control.

## Installation Guide

### 1. Clone the Repository

To get started, clone the repository using the following command:

```bash
git clone https://github.com/mohdrehanrq0/PESU-task-backend
```

### 2. Add Environment Variables

Create a ```.env``` file in the root directory and include the following environment variables:

```bash
PORT=               # Port number for the server
JWT_SECRET=         # Secret key for JWT encryption
JWT_EXPIRE=180d     # JWT expiration time
MONGO_URI=          # MongoDB connection string
NODE_ENV=local      # Environment variable
```

### 3. Install Dependencies and Start the Application

Navigate to the root folder in your terminal and run the following commands:

```bash
npm install
npm run dev
```

The application will be running at ```http://localhost:4000/api/v1```.

**Note**: This project has been developed and tested with Node.js version v20.17.0.

### Features

**User Authentication**: Utilizes JWT tokens to handle authentication and httpOnly cookies via cookie-parser middleware.
**Habit Management**: Create, update, delete, and track habits.
**Progress Tracking**: Tracks user streaks and reward badges based on habit completion.
**Security**: Implements CORS and Helmet in Express.js to enhance security.
**Data Validation**: Uses JOI for contract validation in POST and PUT requests.
**Centralized Error Handling**: Better error management for all API endpoints.

### API Endpoints

**Authentication**
**Register Use**r: POST ```/api/v1/user/signup``` – Register a new user.
**Login User**: POST ```/api/v1/user/login``` – Log in an existing user.
**Logout User**: GET ```/api/v1/user/logout``` – Log out the current user.
**Get Current User**: GET ```/api/v1/user``` – Retrieve the current user's details.
Habit Management
**Create Habit**: POST ```/api/v1/habit/``` – Create a new habit.
**Update Habit**: PUT ```/api/v1/habit/:habitId``` – Update an existing habit.
**Delete Habit**: DELETE ```/api/v1/habit/:habitId``` – Delete a habit.
**Complete Habit**: GET ```/api/v1/habit/complete/:habitId``` – Mark a habit as complete for the day.
**Get All Habits**: GET ```/api/v1/habit/``` – Retrieve all habits for the authenticated user.
Progress Tracking
**Get User Progress**: GET ```/api/v1/progress/``` – Retrieve the user's progress on all habits.
**Get Habit Graph Data**: GET ```/api/v1/habit/graphData``` – Retrieve the completion rate for the last seven days for all habits.

### Technologies Used

Node.js and Express.js for the backend server.
JWT for secure authentication.
MongoDB with Mongoose for database management.
Joi for request validation.
CORS and Helmet for security.
