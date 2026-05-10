Feature: Product Search

  Background:
    Given I am on the homepage

  Scenario: TC07 - Valid search returns results
    When I search for "Pliers"
    Then at least 1 product should be displayed

  Scenario: TC08 - Invalid search shows no results message
    When I search for "xyzinvalidterm123"
    Then I should see the no products message