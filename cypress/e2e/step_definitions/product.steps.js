import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../pages/HomePage";
import productPage from "../../pages/ProductPage";

When("I click the first product", () => {
  cy.intercept("GET", "**/products/*").as("getProductDetails");
  homePage.clickFirstProduct();
  cy.wait("@getProductDetails");
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