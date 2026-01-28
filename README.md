# Playwright API Automation - FakeStore

This test suite, written in JavaScript using Playwright, validates the FakeStore API functionality across multiple user stories, including a few negative and contract tests.
Comments are added in the code highlighting API limitations where applicable.

##  Project Structure
PlaywrightProject/
├─ apiPOM/ # API page objects
├─ helpers/ # Utility helper functions
├─ testData/ # Test input data
├─ tests/ # Test specifications
├─ .gitignore
├─ package.json
├─ playwright.config.js # Playwright configuration
└─ README.md


##  Prerequisites
- Node.js ≥ 16
- Playwright installed (via `npm install`)

##  Installation

git clone https://github.com/jyothsna2026/PlaywrightProject.git
cd PlaywrightProject
npm install

## Run Tests Locally
npx playwright test

## You can run specific tests with:
npx playwright test tests/userstory1.cart.spec.js

## Test reports will be displayed in the terminal. For HTML report:
npx playwright show-report

## Notes
The API baseURL is set in the playwright.config.js.


