
# Task Manager App
A task manager application built with React (Vite + TypeScript) and Material UI. 
The project showcases component-driven development, API integration, and testing best practices, with features including task listing, search, filtering, pagination, deletion, and error handling.

## Getting Started

### Backend API

This front-end app depends on a running Task API. The API is provided separately:

**Repository:** [Tasks API](https://github.com/MarceloFonseca/tasks-api)

Follow the instructions in that repository to install dependencies and start the API. It runs on port 3008 and serves task data for this application.

### 1. Clone the repository and navigate into the project directory
```bash
git clone https://github.com/dtavaresm/tasks-app
```
```bash
cd tasks-app
```
  
### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm start
```
 or
```bash
npm run dev
```

The app will be available at the default Vite port: **[http://localhost:5173/](http://localhost:5173/)** (port may differ if *:5173* is in use)

## Tests
This project includes tests to validate core functionalities:

- **useFetch.test.ts**, which handles API calls and errors
- **TasksPage.test.tsx**, which validates loading, rendering, error states and retry
- **App.test.tsx**, with routing between Home and Tasks pages

**Run tests with:**
```bash
npm test
```

## Features
### Required Features

- **SPA navigation** with ```react-router-dom```
- **API integration** with loading & error states
- **Task listing** with client-side pagination with dynamic navigation
- **Unit & integration tests** for core features
- **Responsive layout**
### Extra Features

- **Loading and error states** with retry option
- Client-side **task deletion** with confirmation dialog
- **Search and Filter** by name and completion status

## Tech Stack

- **React 19.1.1** with hooks
- **TypeScript**
- **Material UI (MUI)** for UI components and styling
- **React Router v7** for routing
- **Jest** and **React Testing Library** for unit and integration testing
