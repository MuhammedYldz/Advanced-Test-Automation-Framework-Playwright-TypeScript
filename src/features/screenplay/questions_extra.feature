Feature: Screenplay Extra Questions

  Background:
    Given a Screenplay actor
    And the actor navigates to the login page

  @screenplay @questions_extra
  Scenario: Verify input attributes
    When the actor enters "test" into the email field
    Then the email field type should be "email"
    And the email field should have placeholder "Email Address"

  @screenplay @questions_extra @search
  Scenario: Search for products and count results
    Given the actor navigates to "/products"
    When the actor searches for "Dress"
    Then the actor should see at least 1 product result
