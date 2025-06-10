# Health Wellness Tracker
## Project Overview
<<<<<<< Updated upstream
The Health & Wellness Tracker is a serverless web app that helps users monitor and improve their health habits. It collects data from various sources (manual entries or wearables), stores the information securely, and provides insightful visualizations and alerts. The goal is to empower users to track metrics like physical activity, sleep, nutrition, and stress levels, ultimately encouraging a healthier lifestyle.
=======

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

## Documentation

Additional information about the architecture and database design can be found in the `docs` folder. This includes a UML diagram of entities (`new.uxf`) and a high level overview of the system (`HighLevelDiagram.drawio.png`).

---
>>>>>>> Stashed changes
