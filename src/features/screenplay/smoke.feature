Feature: Screenplay Core Smoke
  As an automation engineer
  I want to instantiate a Screenplay actor
  So that I can navigate using its Playwright ability

  @screenplay @smoke
  Scenario: Actor navigates to home URL
    Given a Screenplay actor
    When the actor navigates to "/"
    Then the current URL should start with the base URL
