import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import cartPage from "../../pages/CartPage";
import productPage from "../../pages/ProductPage";

When("I add the first product to the cart", () => {
  cy.addFirstProductToCart();
});

When("I add the product to the cart from the detail page", () => {
  productPage.addToCart();
});

Then("the cart badge should show at least 1 item", () => {
  cartPage.assertCartHasItems();
});

Then("the cart navigation icon should be visible", () => {
  cartPage.assertNavCartVisible();
});

Then("the unit price should be a positive number", () => {
  productPage.assertPriceIsPositive();
});

When("I click the sign in link", () => {
  cy.get('[data-test="nav-sign-in"]').click();
});

Then("I should be on the login page", () => {
  cy.url().should("include", "/auth/login");
});

Then("the email and password fields should be visible", () => {
  cy.get('[data-test="email"]').should("be.visible");
  cy.get('[data-test="password"]').should("be.visible");
});