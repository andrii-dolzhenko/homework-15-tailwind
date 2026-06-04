# MatchForecast

MatchForecast is an educational frontend project for predicting FIFA World Cup 2026 match scores.

The project is built as a responsive web application with dark and light themes, Predictions, Calendar, Ratings, and Rules pages, Login/Register modals, a match calendar, filters, and rating tables.

## Technologies Used

* HTML5 - base structure for the page and sections
* Tailwind CSS 4 - utility-first styling
* JavaScript ES Modules - interactivity, application state, filters, and modal windows
* Vite - local development and production build
* ESLint - JavaScript code quality checks

## Project Structure

```text
homework-15-tailwind/
├── public/
│   ├── flags/
│   ├── img/
│   ├── favicon.png
│   └── logo.png
├── src/
│   ├── assets/
│   ├── data/
│   │   └── matches.js
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.mjs
└── README.md
```

## Features

* Responsive layout for desktop, tablet and mobile
* Dark / light theme switcher
* Mobile burger menu
* Match prediction cards
* Score controls with plus/minus buttons
* Calendar page with match groups
* Visual filters for group, team and match status
* Ratings page with player leaderboard
* Rules page with scoring logic
* Login and Register modals
* Forms connected to test echo endpoint

## Scoring Rules

* Exact score — 3 points
* Correct outcome — 1 point
* Wrong prediction — 0 points

## How to Run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Code Quality Checks

JavaScript lint:

```bash
npm run lint
```

JavaScript syntax check:

```bash
npm run check:js
```

Production build check:

```bash
npm run build
```

## Validation

* HTML validation: passed
* Source CSS validation: passed
* ESLint: passed
* Production build: passed

## Links

* GitHub Pages: https://andrii-dolzhenko.github.io/homework-15-tailwind/
* Repository: https://github.com/andrii-dolzhenko/homework-15-tailwind

## Author

Andrii Dolzhenko

© 2026. Andrii Dolzhenko. All Rights Reserved.
