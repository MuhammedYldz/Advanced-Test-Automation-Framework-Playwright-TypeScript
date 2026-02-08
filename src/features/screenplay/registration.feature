Feature: User Registration

  Background:
    Given a Screenplay actor

  @screenplay @registration
  Scenario: Successful user registration
    When the actor registers with valid details
    Then the actor should see the account created message
