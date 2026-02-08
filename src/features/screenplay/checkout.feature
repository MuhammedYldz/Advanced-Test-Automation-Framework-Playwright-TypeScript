Feature: Checkout Flow

  Background:
    Given a Screenplay actor
    And the actor navigates to the login page
    And the actor logs in with valid credentials via Task

  @screenplay @checkout @happy_path
  Scenario: Place an order successfully
    Given the actor navigates to "/products"
    And the actor adds a product to the cart
    When the actor places an order with valid payment details
    Then the order should be placed successfully
