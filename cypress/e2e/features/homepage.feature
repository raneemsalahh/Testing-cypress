Feature: Homepage

  Background:
    Given I am on the homepage

  Scenario: TC01 - Homepage loads and shows products
    Then the page title should contain "Practice Software Testing"
    And at least 9 products should be visible

  Scenario: TC02 - Sort products by name A to Z
    When I sort products by "name,asc"
    Then products should be sorted alphabetically ascending

  Scenario: TC03 - Sort products by price high to low
    When I sort products by "price,desc"
    Then products should be sorted by price descending