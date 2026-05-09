# DSO101 - Continuous Integration and Continuous Deployment
## Lhundup Dorji | Student ID: 02240349 | Bachelor of Engineering in Software Engineering

---

## Assignment 4 - Complete CI/CD Pipeline with Testing

### Live Link
- Application: https://lhundup-dorji-02240349-dso101-a4.onrender.com
- GitHub Repository: https://github.com/Ldorji705/Lhundup_Dorji_02240349_DSO101_A4

---

### Objective
The goal of this assignment was to implement a complete DevOps pipeline including build, test, deploy, and automation for a backend application. The pipeline was built using GitHub Actions and deployed to Render.com with automatic redeployment on every push to the main branch.

---

### Project Structure

```
project/
├── app.js
├── server.js
├── package.json
├── tests/
│   └── app.test.js
└── .github/
    └── workflows/
        └── ci.yml
```

---

### Application Overview
I created a Node.js and Express application with three API endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Returns a welcome message |
| `/health` | GET | Returns the health status of the app |
| `/tasks` | GET | Returns a list of sample tasks |

---

### Steps Taken

**Step 1: Creating the Application**
I created a new Node.js Express application with `app.js` containing the route definitions and `server.js` as the entry point. The application uses ES module syntax throughout.

```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Assignment 4!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Learn CI/CD', completed: true },
    { id: 2, title: 'Deploy to Render', completed: false }
  ]);
});

export default app;
```

**Step 2: Writing Unit Tests**
I wrote three unit tests using Jest and Supertest to test each of the three API endpoints. The tests verify the correct HTTP status codes and response body content.

```javascript
import request from 'supertest';
import app from '../app.js';

describe('App Tests', () => {
  test('GET / should return hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from Assignment 4!');
  });

  test('GET /health should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /tasks should return array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

**Step 3: Configuring Jest for ES Modules**
Since the application uses ES module syntax, I configured Jest to use `node --experimental-vm-modules` in the test script inside `package.json` to handle import statements correctly.

```json
"scripts": {
  "start": "node server.js",
  "test": "node --experimental-vm-modules node_modules/.bin/jest --ci --reporters=default --reporters=jest-junit"
}
```

**Step 4: Creating the CI/CD Pipeline**
I created `.github/workflows/ci.yml` with the following steps: checking out the code, setting up Node.js 20, installing dependencies, running the Jest tests, and triggering a Render deployment via webhook.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: ["main"]

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test

      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

**Step 5: Adding GitHub Secrets**
I added the Render deploy hook URL as a GitHub secret named `RENDER_DEPLOY_HOOK` so that credentials are never hardcoded in the workflow file.

**Step 6: Deploying to Render**
I deployed the application to Render as a Node web service connected directly to the GitHub repository with the following settings:

| Setting | Value |
|---|---|
| Language | Node |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Branch | `main` |

---

### Challenges Faced

- Jest could not parse ES module import statements out of the box. I resolved this by using `node --experimental-vm-modules` in the test command inside `package.json`.
- The `package.json` was not found during the Render build because the project files were initially inside a subfolder. I moved all files to the repository root to fix this.
- The Render deploy webhook was not set in the GitHub secrets initially, causing the curl command to fail with a no URL specified error. I added the correct secret and the workflow completed successfully.

---

### Test Results
All three tests passed successfully locally and in the GitHub Actions workflow:

```
PASS  tests/app.test.js
  App Tests
    ✓ GET / should return hello message (30 ms)
    ✓ GET /health should return ok (3 ms)
    ✓ GET /tasks should return array (3 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

---

### CI/CD Pipeline Results
All steps in the GitHub Actions workflow completed successfully:

- Checkout ✅
- Set up Node.js ✅
- Install Dependencies ✅
- Run Tests ✅
- Deploy to Render ✅

---

### Learning Outcomes
- How to build a simple but complete REST API with Node.js and Express
- How to write meaningful unit tests using Jest and Supertest
- How to configure Jest to work with ES module syntax
- How to build a complete CI/CD pipeline using GitHub Actions
- How to securely manage deployment credentials using GitHub Secrets
- How to deploy a Node.js application to Render with automatic redeployment on every push

### Screenshots
![alt text](<images/Screenshot 2026-05-10 at 12.40.13 AM.png>)
![alt text](<images/Screenshot 2026-05-10 at 12.39.28 AM.png>)
![alt text](<images/Screenshot 2026-05-10 at 12.38.28 AM.png>)
![alt text](<images/Screenshot 2026-05-10 at 12.38.02 AM.png>)