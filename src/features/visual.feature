Feature: Visual Regression Testing
  As a QA Engineer
  I want to verify that the UI layout hasn't changed unexpectedly
  So that the application looks consistent

  @visual
  Scenario: Verify Login Page Layout
    Given I am on the login page
    Then I verify the login page screenshot matches the baseline
