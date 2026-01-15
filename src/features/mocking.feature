Feature: Mocking Network Responses
  As a tester
  I want to intercept and mock network requests
  So that I can test edge cases like API failures without relying on the real backend

  @mocking
  Scenario: Handle Login API Failure (500 Server Error)
    Given I intercept the login request and simulate a 500 error
    When I enter valid email and password
    And I click the login button
    Then I should see an error message indicating login failure
