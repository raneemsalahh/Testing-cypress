import "./commands";

before(() => {
  cy.log("========== TEST SUITE STARTED ==========");
});

after(() => {
  cy.log("========== TEST SUITE FINISHED ==========");
});

Cypress.on("uncaught:exception", () => {
  return false;
});