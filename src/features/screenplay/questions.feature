Feature: Screenplay Questions & Assertions
  As a tester
  I want to separate asking from doing
  So that assertions are reusable and clear

  @screenplay @questions @happy_path
  Scenario: Verify logged-in state using Questions
    Given a Screenplay actor
    When the actor logs in with valid credentials via Task
    Then the actor should verify logged-in indicator using Questions
