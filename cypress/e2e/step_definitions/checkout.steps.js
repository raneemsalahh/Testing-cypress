import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then("the login submit button should be visible", () => {
  cy.get('[data-test="login-submit"]').should("be.visible");
});