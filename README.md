# MatchForecast

> A responsive single-page football prediction dashboard for the **FIFA World Cup 2026**.

**MatchForecast** is a Vite and Tailwind CSS project created for Homework 15. The application helps football fans browse upcoming World Cup group-stage fixtures, save score predictions, compare player forecasts, and review the scoring rules used for the prediction competition.

## Project Overview

The project is built as a dynamic frontend application rendered with JavaScript. It uses local data files for teams, groups, matches, player ratings, and prediction rules. Users can switch between several app sections without reloading the page:

- **Predictions** - create and submit score forecasts for featured and upcoming matches.
- **Calendar** - browse the full group-stage schedule by groups and match details.
- **Ratings** - compare players by points, exact scores, correct outcomes, and missed predictions.
- **Rules** - review how prediction points are calculated.

## Main Features

| Feature | Description |
| --- | --- |
| **Responsive layout** | Optimized for desktop, tablet, and mobile screens with adaptive navigation and content grids. |
| **Dark and light themes** | Theme switching is stored in `localStorage`, so the selected theme persists after reload. |
| **Match prediction forms** | Users can adjust home and away scores with number inputs and step buttons. |
| **Schedule date picker** | Upcoming matches can be viewed by date with previous, next, and reset controls. |
| **Calendar filters** | Matches can be filtered by group, team name, and match status. |
| **Accordion group calendar** | Calendar groups can be expanded or collapsed for easier browsing. |
| **Player leaderboard** | Shows player avatars, total points, awards, and prediction statistics. |
| **Standings preview** | Displays group tables with team flags and navigation between groups. |
| **Authentication modals** | Includes styled login and registration modal windows with social sign-in buttons. |
| **Tournament selector** | Provides a tournament dropdown with active and disabled upcoming options. |

## Technologies Used

- **HTML5** for the base document structure.
- **JavaScript ES Modules** for state, rendering, and interactions.
- **Tailwind CSS 4** for utility-first styling.
- **Vite** for local development and production builds.
- **ESLint** for JavaScript code quality checks.

## Project Structure

```text
homework-15-tailwind/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── img/
│   ├── logo.png
│   ├── logo-light.png
│   └── favicon.png
└── src/
    ├── main.js
    ├── style.css
    ├── assets/
    └── data/
        ├── matches.js
        └── teams.js
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the local Vite development server. |
| `npm run build` | Builds the project for production. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint checks for the source files. |
| `npm run lint:fix` | Runs ESLint and automatically fixes supported issues. |
| `npm run check:js` | Checks JavaScript syntax for the main source files. |

## How To Run

```bash
npm install
npm run dev
```

After starting the development server, open the local URL shown in the terminal.

## Scoring Rules

The app uses a simple prediction scoring system:

1. **Exact score** - 3 points.
2. **Correct outcome** - 1 point.
3. **Wrong prediction** - 0 points.

## Notes

This project is a frontend educational application. It is designed for score-based football predictions and does not include real-money betting functionality.

© Project completed by Dolzhenko Andrii. All Rights reserved. June 2026.
