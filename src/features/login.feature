Feature: User Login Functionality
  As a user
  I want to be able to log in to the application
  So that I can access my account details

  Background:
    Given I am on the login page

  @happy_path @smoke
  Scenario: Successful login with valid credentials
    When I enter valid email and password
    And I click the login button
    Then I should be logged in successfully

  @negative @regression
  Scenario Outline: Failed login with invalid credentials
    When I enter email "<email>" and password "<password>"
    And I click the login button
    Then I should see an error message indicating login failure

    Examples:
      | email                  | password       |
      | wronguser@example.com  | wrongpassword  |
      | testuser@example.com   | wrongpassword  |

  @edge_case
  Scenario: Login with empty fields
    When I click the login button without entering credentials
    Then I should remain on the login page
