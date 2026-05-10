import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import searchPage from "../../pages/SearchPage";

When("I search for {string}", (term) => {
  cy.intercept("GET", "**/products/search?q=*").as("searchApi");
  searchPage.search(term);
});

Then("at least {int} product should be displayed", (n) => {
  cy.get('[data-test="product-name"]').should("have.length.gte", n);
});

Then("I should see the no products message", () => {
  cy.wait("@searchApi");
  cy.get('[data-test="product-name"]').should("not.exist");
  cy.contains("There are no products found.", { timeout: 8000 }).should("be.visible");
});