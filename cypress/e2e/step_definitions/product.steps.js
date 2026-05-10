const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../../pages/HomePage");
const productPage = require("../../pages/ProductPage");

When("I click the first product", () => {
  homePage.clickFirstProduct();
  cy.get('[data-test="unit-price"]', { timeout: 15000 }).should("be.visible");
});

Then("the product name should be visible on the detail page", () => {
  productPage.getProductName().should("be.visible");
});

Then("the unit price should be visible", () => {
  productPage.getUnitPrice().should("be.visible");
});

Then("the add to cart button should be enabled", () => {
  productPage.getAddToCartButton().should("be.visible").and("not.be.disabled");
});

When("I set the quantity to {int}", (qty) => {
  productPage.setQuantity(qty);
});

Then("the quantity field should show {int}", (qty) => {
  productPage.getQuantityInput().should("have.value", String(qty));
});