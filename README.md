# Health Wellness Tracker

## Project Overview

Health Wellness Tracker is a web application that helps users monitor day to day health habits. The app collects data that the user enters manually (or from wearables/APIs) and presents simple dashboards and tracking widgets. Authentication is handled with Amazon Cognito, allowing both full accounts and guest access.

The project currently focuses on a React based front‑end, with a serverless API used for retrieving meal information. Documentation in the `docs` directory includes diagrams of the overall architecture and database model.

## Features

- **User Authentication** – Registration, login and email confirmation via Amazon Cognito.
- **Dashboard** containing several trackers:
  - **Mood Tracker** – record how you feel and optional notes.
  - **Food Tracker** – log meals, calories and macronutrients. Data can be fetched from a serverless API or entered manually.
  - **Water Intake Tracker** – visual tracker for daily glasses of water.
  - **Breathing Guide** – animated breathing exercise widget.
- **Guest Mode** – users may explore the dashboard without signing in.
- **Responsive UI** built with Bootstrap and React Router.

## Repository Structure

```
/
├── docs/       # project documentation and diagrams
├── frontend/   # React application
└── README.md   # project overview (this file)
```

The `frontend` folder contains all source code for the React app, including components, views and utility helpers. The `docs` folder holds a high‑level architecture diagram (`HighLevelDiagram.drawio.png`) and other design artifacts.

## Getting Started

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```
2. **Run the Development Server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

3. **Running Tests**
   ```bash
   npm test
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```
   The production build will be placed in `frontend/build`.

## Contributing

Contributions are welcome! If you find a bug or have an enhancement request, feel free to open an issue or submit a pull request. Please ensure that any PR passes the existing `npm test` suite before submission.

## Documentation

Additional information about the architecture and database design can be found in the `docs` folder. This includes a UML diagram of entities (`new.uxf`) and a high level overview of the system (`HighLevelDiagram.drawio.png`).

---
