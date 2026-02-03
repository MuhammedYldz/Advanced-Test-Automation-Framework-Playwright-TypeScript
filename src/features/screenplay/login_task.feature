Feature: Screenplay Login Task
  As a tester
  I want a reusable Login task
  So that login flows stay DRY

  @screenplay @task @happy_path
  Scenario: Login with valid credentials using Task
    Given a Screenplay actor
    When the actor logs in with valid credentials via Task
    Then the user should be logged in according to UI
