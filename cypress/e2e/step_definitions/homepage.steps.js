import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../pages/HomePage";

Then("the page title should contain {string}", (title) => {
  cy.title().should("contain", title);
});

Then("at least {int} products should be visible", (n) => {
  homePage.assertMinProductCount(n);
});

When("I sort products by {string}", (value) => {
  homePage.sortBy(value);
});

Then("products should be sorted alphabetically ascending", () => {
  homePage.getProductNames().then(($items) => {
    const names = [...$items].map((el) => el.innerText.trim().toLowerCase());
    expect(names[0].localeCompare(names[names.length - 1])).to.be.lte(0);
  });
});

Then("products should be sorted by price descending", () => {
  homePage.getProductPrices().then(($prices) => {
    const values = [...$prices].map((el) =>
      parseFloat(el.innerText.replace(/[^0-9.]/g, ""))
    );
    expect(values[0]).to.be.gte(values[values.length - 1]);
  });
});