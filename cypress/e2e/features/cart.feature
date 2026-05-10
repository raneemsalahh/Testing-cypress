Feature: Shopping Cart

  Background:
    Given I am on the homepage

  Scenario: TC11 - Adding a product increments the cart badge
    When I add the first product to the cart
    Then the cart badge should show at least 1 item
    And the cart navigation icon should be visible

  Scenario: TC12 - Unit price is valid and cart badge updates
    When I click the first product
    Then the unit price should be a positive number
    When I add the product to the cart from the detail page
    Then the cart badge should show at least 1 item

  Scenario: TC13 - Login link navigates to login page
    When I click the sign in link
    Then I should be on the login page
    And the email and password fields should be visible