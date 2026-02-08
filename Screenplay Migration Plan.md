# **🏗️ Screenplay Pattern Migration & Architectural Refactoring Plan**

## **🎯 Goal**

Refactor the existing Playwright-TypeScript automation framework from Page Object Model (POM) to **Screenplay Pattern**.

The objective is to achieve a **World Class** architecture by strictly following **KISS** (Keep It Simple, Stupid) and **DRY** (Don't Repeat Yourself) principles, ensuring high scalability and maintenance efficiency.

## **🛠️ Proposed Folder Structure**

New Screenplay components will reside in src/screenplay/ to avoid conflicts with existing pages/.

src/  
└── screenplay/  
    ├── actors/         \# Actor definitions & Abilites (Playwright Page)  
    ├── tasks/          \# High-level business goals (Login, AddToCart)  
    ├── interactions/   \# Low-level UI actions (Click, Fill, Hover)  
    ├── questions/      \# State inquiries & Assertions (IsVisible, TextContent)  
    └── ui/             \# Pure Locators / Targets (KISS)

## **🚀 Milestones (Safe Migration Workflow)**

### **Milestone 1: Core Engine & Actor Ability**

Establish the foundation of the Screenplay Pattern.

* \[ \] Create Actor class: An actor needs the **Ability** to use Playwright's Page.  
* \[ \] Define Performable and Question interfaces.  
* \[ \] Implement a base\_test.ts or fixture that provides a pre-configured Actor.  
* **Verification:** Run a simple test that instantiates an actor and navigates to a URL.

### **Milestone 2: Interaction Layer (Playwright Wrappers)**

Create reusable, low-level interactions to keep the code **DRY**.

* \[ \] Create atomic interactions: Click.on(target), Enter.value(val).into(target), Maps.to(url).  
* \[ \] Ensure interactions include descriptive logging for better "Observability".  
* **Verification:** Create a test using only interactions to perform a basic sequence.

### **Milestone 3: The UI Layer (KISS \- Pure Locators)**

Extract locators from existing Page Objects.

* \[ \] Select a pilot Page Object (e.g., LoginPage.ts).  
* \[ \] Move all locators to src/screenplay/ui/LoginUI.ts as Target objects or simple string constants.  
* \[ \] **Rule:** No logic allowed in this layer. Only address mapping.  
* **Verification:** Ensure locators are correct by inspecting them in Playwright.

### **Milestone 4: Business Tasks (DRY \- Composition)**

Group interactions into meaningful business steps.

* \[ \] Create a Task (e.g., Login.withCredentials(user, pass)).  
* \[ \] Use actor.attemptsTo(...) to chain interactions within the task.  
* \[ \] Implement Factory Pattern if multiple login types (Admin, Guest) are needed.  
* **Verification:** Replace a manual sequence in a test with the new Task and verify it passes.

### **Milestone 5: Question & Assertion Layer**

Separate "doing" from "asking".

* \[ \] Implement Questions to query the state of the UI (e.g., ProfileName.value()).  
* \[ \] Use actor.should(See.that(...)) style for assertions.  
* **Verification:** Ensure failed assertions provide clear, human-readable error messages.

### **Milestone 6: Parallel Execution & Final Swap**

* \[ \] Convert 1-2 full regression suites to the new pattern.  
* \[ \] Verify execution in CI/CD (Azure DevOps/Jenkins) using **Sharding**.  
* \[ \] Keep old POM files as deprecated until the pilot is 100% stable.

## **🛡️ Safety & Quality Protocols for AI**

1. **Parallel Coexistence:** Never delete an existing Page Object until the equivalent Screenplay Task is verified and passing.  
2. **Incremental Testing:** After every file generation or refactor, run npx playwright test for the specific affected file.  
3. **No 'any' Policy:** Use strict TypeScript interfaces for Task parameters and Question return types.  
4. **Log Excellence:** Every interaction must produce a log entry that describes what the Actor is doing (e.g., "Actor clicks on the Login Button").  
5. **KISS Audit:** If a Task or Interaction exceeds 15 lines of code, it must be broken down.

## **📝 Code Template Example (Refactor Target)**

**Old POM Style:**

await loginPage.login(user, pass);  
await dashboardPage.verifyWelcomeMessage("Hi, Muhammed");

**New Screenplay Style:**

await actor.attemptsTo(  
    Login.as(UserType.Admin),  
    Navigate.to(DashboardUI.URL)  
);

await actor.should(  
    See.that(WelcomeMessage.text(), Equals.to("Hi, Muhammed"))  
);  
