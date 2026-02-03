Feature: Screenplay UI Targets
  As an engineer
  I want pure locator mappings
  So that UI is decoupled from logic

  @screenplay @ui
  Scenario: Verify Login UI header locator
    Given a Screenplay actor
    When the actor navigates to "/login"
    Then the login header should be visible
