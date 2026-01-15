# 🚀 Advanced Test Automation Framework (Playwright + Cucumber + TypeScript)

## 👋 About This Project
This project is a showcase of my journey into advanced test automation. It's built to demonstrate not just *how* to write a test, but *how to architect* a scalable, maintainable, and modern testing solution.

I chose **Automation Exercise** (https://www.automationexercise.com) as the target because it offers a realistic e-commerce flow perfect for practicing end-to-end scenarios.

---

## 🛠 Tech Stack & "Why?"
I didn't just pick tools randomly; here's why I chose this specific stack:

### 1. **Playwright** (vs Selenium/Cypress)
-   **Why:** I learned that Playwright is faster and more stable because of its **Auto-waiting** mechanism. Unlike Selenium, I don't need to add `Thread.sleep` or explicit waits everywhere. It also supports multiple contexts (incognito windows) natively, which is great for parallel testing.

### 2. **Cucumber (BDD)**
-   **Why:** Technical code is hard for non-technical stakeholders to read. Cucumber allows me to write tests in **Gherkin (English)** so that Product Managers or Manual QAs can understand exactly what is being tested.
-   *Trade-off:* It adds a layer of complexity (Glue code), but the readability benefit is worth it for large teams.

### 3. **TypeScript**
-   **Why:** JavaScript can be messy with types. TypeScript catches errors at compile-time (before I even run the code). It helps me know exactly what properties my `User` object has, preventing silly bugs.

### 4. **Page Object Model (POM)**
-   **Why:** In my early attempts, I wrote selectors directly in the test steps. When the UI changed, I had to fix 50 files. With POM, I store locators in one place (`LoginPage.ts`). If the UI changes, I fix it in one file, and all tests work again.

---

## 🌟 Advanced Features Implemented

### 🔄 Hybrid Testing (API + UI)
**The Problem:** Creating a new user via UI takes 30+ seconds and can flake.
**My Solution:** I used **API Request Context** in `hooks.ts` to create a user in milliseconds before the test starts.
**Benefit:** Tests are faster and focus only on the "Login" logic, not the "Sign Up" logic.

### 📸 Visual Regression Testing
**The Problem:** A button still "works" even if it overlaps with text, but it looks terrible.
**My Solution:** Added a step to capture screenshots.
**Benefit:** We can catch UI bugs that functional assertions miss.

### 🕵️ Network Interception / Mocking
**The Problem:** How do I test a "500 Server Error" if the server is working fine?
**My Solution:** I used Playwright's `page.route()` to **intercept** the login request and mock a failure response.
**Benefit:** I can test edge cases (Server Down, Slow Network) on demand.

### 📊 Allure Reporting
**The Problem:** Console logs are boring and hard to debug.
**My Solution:** Integrated Allure Reports.
**Benefit:** Provides a beautiful dashboard with graphs, screenshots on failure, and step-by-step history.

### 🐳 Docker Containerization
**The Problem:** "It works on my machine" but fails on the CI server.
**My Solution:** Wrapped the whole project in Docker.
**Benefit:** Anyone can run these tests without installing Node.js or Playwright locally.

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
npx playwright install
```

### 2. Run Tests
**Run All Tests (Parallel):**
```bash
npm test
```

**Run Specific Tag:**
```bash
npx cucumber-js --tags "@happy_path"
```

### 3. View Report
```bash
npm run report
```

### 4. Run with Docker
```bash
docker build -t automation-cv .
docker run automation-cv
```

---

## 📂 Project Structure
```
src/
  ├── features/       # Gherkin files (The "What")
  ├── steps/          # Glue code (The "How")
  ├── pages/          # Locators & Methods (The "Where")
  ├── support/        # Hooks, World, Helpers
config/               # Environment configs
```

---

## 💡 Humble Learnings
-   **Async/Await:** I learned that everything in Playwright is asynchronous. I had to be careful to always `await` my actions, otherwise the test would finish before the button was clicked!
-   **Browser Contexts:** I learned that `browser.newContext()` is faster than launching a new browser. It's like opening a new Incognito window instead of restarting Chrome.
