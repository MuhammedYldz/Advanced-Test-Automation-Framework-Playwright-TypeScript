Feature: Screenplay Interactions
  As an engineer
  I want reusable low-level interactions
  So that tests stay DRY and readable

  @screenplay @interactions
  Scenario: Perform a basic login sequence using interactions
    Given a Screenplay actor
    When the actor attempts a basic login sequence
    Then the current URL should start with the base URL
