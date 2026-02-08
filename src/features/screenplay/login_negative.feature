Feature: Screenplay Login Negative Scenarios

  Background:
    Given a Screenplay actor
    And the actor navigates to the login page

  @screenplay @negative
  Scenario Outline: Failed login with invalid credentials
    When the actor logs in with email "<email>" and password "<password>"
    Then the actor should see the error message "<error>"

    Examples:
      | email                  | password       | error                        |
      | wronguser@example.com  | wrongpassword  | email or password is incorrect |

  @screenplay @edge_case
  Scenario: Login with empty fields
    When the actor clicks the login button
    Then the actor should still see the login header
