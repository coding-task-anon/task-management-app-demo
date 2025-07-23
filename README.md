# Task Management App

A simple, modular Angular application for managing tasks. Users can create, view, edit, and delete tasks, with support for task status, descriptions, and due dates.

## Features

- List all tasks, with filtering and search
- Create new tasks with name, description, and due date
- Edit and delete existing tasks
- View detailed task information

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [Angular CLI](https://angular.io/cli) (v16 or above recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/task-management-app-demo.git
   cd task-management-app-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Development

### Running the App

Start a local development server:

```bash
yarn ng serve
```

Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload whenever you modify any of the source files.

### Building for Production

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running Tests

```bash
ng test
```

Runs unit tests with [Karma](https://karma-runner.github.io).

## Project Structure

```
src/
  app/
    app.ts              # Root component
    app.config.ts       # App-wide configuration
    app.routes.ts       # Route definitions
    task/               # Task feature modules
      create/           # Create task
      edit/             # Edit task
      display/          # View task details
      index/            # Task list
  assets/               # Static assets
  styles.css            # Global styles
  main.ts               # App bootstrap
  index.html            # App entry point
```
