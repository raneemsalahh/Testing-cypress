import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/LoginPage";

When("I login with email {string} and password {string}", (email, password) => {
  loginPage.login(email, password);
});

When("I click the login submit button", () => {
  cy.get('[data-test="login-submit"]').click();
});

Then("I should be redirected away from the login page", () => {
  cy.url().should("not.include", "/auth/login");
});

Then("the account menu should be visible", () => {
  cy.get('[data-test="nav-menu"]').should("be.visible");
});

Then("I should see an invalid credentials error", () => {
  loginPage.assertLoginError();
});

Then("the email field should be invalid", () => {
  cy.get('[data-test="email"]').should("have.class", "ng-invalid");
});