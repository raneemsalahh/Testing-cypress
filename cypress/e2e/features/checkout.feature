Feature: Checkout

  Background:
    Given I am on the homepage

  Scenario: TC14 - Add to cart flow updates the cart correctly
    When I click the first product
    Then the product name should be visible on the detail page
    And the unit price should be a positive number
    When I add the product to the cart from the detail page
    Then the cart badge should show at least 1 item

  Scenario: TC15 - Guest user is redirected to sign in during checkout
    When I click the sign in link
    Then I should be on the login page
    And the login submit button should be visible