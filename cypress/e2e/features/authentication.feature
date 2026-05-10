Feature: Authentication

  Background:
    Given I am on the login page

  Scenario: TC04 - Login with valid credentials
    When I login with email "admin@practicesoftwaretesting.com" and password "welcome01"
    Then I should be redirected away from the login page
    And the account menu should be visible

  Scenario: TC05 - Login with wrong credentials shows error
    When I login with email "wrong@email.com" and password "wrongpass"
    Then I should see an invalid credentials error

  Scenario: TC06 - Empty login form shows validation errors
    When I click the login submit button
    Then the email field should be invalid