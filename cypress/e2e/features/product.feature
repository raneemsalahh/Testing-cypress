Feature: Product Detail Page

  Background:
    Given I am on the homepage

  Scenario: TC09 - Product detail shows name price and add to cart
    When I click the first product
    Then the product name should be visible on the detail page
    And the unit price should be visible
    And the add to cart button should be enabled

  Scenario: TC10 - Product quantity can be changed
    When I click the first product
    And I set the quantity to 3
    Then the quantity field should show 3