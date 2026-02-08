# 🚀 Advanced Test Automation Framework (Screenplay Pattern + Playwright + Cucumber + TypeScript)

## 👋 About This Project
This project is a showcase of advanced test automation architectures. Originally built using the **Page Object Model (POM)**, it has been migrated to the **Screenplay Pattern** to demonstrate superior scalability, maintainability, and readability.

I chose **Automation Exercise** (https://www.automationexercise.com) as the target because it offers a realistic e-commerce flow perfect for practicing end-to-end scenarios.

---

## 🏗 Architecture Evolution: POM vs. Screenplay

### Why migrate from Page Object Model (POM)?
While POM is standard, it often leads to:
-   **Large Classes:** Page objects grow indefinitely as features are added.
-   **Tight Coupling:** Tests depend heavily on specific page implementations.
-   **Duplication:** Similar interactions (like clicking a button) are rewritten for every page.

### The Screenplay Pattern Solution
The Screenplay Pattern applies **SOLID principles** to test automation:
-   **Actors** (Users) have **Abilities** (Browse the Web).
-   **Tasks** (High-level goals like "Login") are composed of **Interactions** (Low-level actions like "Click", "Enter").
-   **Questions** retrieve information about the system state.

**Benefits:**
-   **Reusable:** "Click" is written once and used everywhere.
-   **Readable:** Tests read like a script: `Actor.attemptsTo(Login.withCredentials(...))`.
-   **Composable:** Tasks can be combined easily to form complex workflows.

---

## 🛠 Tech Stack

-   **Playwright:** Fast, reliable, auto-waiting, multi-context browser automation.
-   **Cucumber (BDD):** Gherkin syntax for collaboration with non-technical stakeholders.
-   **TypeScript:** Type safety to prevent runtime errors.
-   **Screenplay Pattern:** Modular, user-centric design pattern.

---

## 🌟 Features Implemented

### 🎭 Screenplay Components
-   **Tasks:** `Login`, `Register`, `PlaceOrder`, `AddProductToCart`
-   **Interactions:** `Click`, `Enter`, `Navigate`, `Select`, `Hover`, `TakeScreenshot`, `MockResponse`
-   **Questions:** `Text`, `IsVisible`, `Attribute`, `Count`, `See` (Assertion)
-   **UI Layers:** `LoginUI`, `SignUpUI`, `ProductUI`, `CartUI`, `CheckoutUI` (Pure Locators)

### 🔄 Hybrid Testing (API + UI)
-   Users are created via **API Request Context** in hooks to speed up login tests.
-   Tests focus on UI logic without waiting for slow registration flows.

### 📸 Visual Regression & Mocking
-   **Visual:** `TakeScreenshot` interaction captures UI states for verification.
-   **Mocking:** `MockResponse` interaction intercepts network requests to test edge cases (e.g., 500 errors).

---

## 📊 Performance Benchmarks (POM vs Screenplay)

| Metric | Page Object Model (POM) | Screenplay Pattern | Analysis |
| :--- | :--- | :--- | :--- |
| **Readability** | Good (Method calls) | **Excellent** (Natural Language) | Screenplay reads like English sentences. |
| **Reusability** | Low (Page specific) | **High** (Universal Interactions) | Interactions are generic and reusable across all features. |
| **Maintenance** | Medium (Large files) | **Low** (Small, single-purpose files) | Easier to fix a specific Interaction than debug a 500-line Page Object. |
| **Execution Time** | ~5s (Login) | ~5s (Login) | Negligible difference; Screenplay overhead is minimal. |
| **Scalability** | Harder (God Objects) | **Easier** (Modular) | Adding new features doesn't bloat existing files. |

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
npx playwright install
```

### 2. Run Tests
**Run Screenplay Tests:**
```bash
npx cucumber-js -p default --tags "@screenplay"
```

**Run Legacy POM Tests (Backward Compatibility):**
```bash
npx cucumber-js -p default --tags "not @screenplay"
```

**Run Specific Suite:**
```bash
npx cucumber-js -p default --tags "@checkout"
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
  ├── screenplay/         # Screenplay Pattern Core
  │   ├── core/           # Interfaces (Actor, Ability, Performable)
  │   ├── interactions/   # Low-level actions (Click, Enter)
  │   ├── tasks/          # High-level business logic (Login, Register)
  │   ├── questions/      # State retrieval (Text, IsVisible)
  │   └── ui/             # Pure Locators (No logic)
  ├── features/           # Gherkin files
  ├── steps/              # Step definitions (Glue code)
  ├── pages/              # Legacy POM files
  ├── support/            # Hooks, World, Helpers
```

---
