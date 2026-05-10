import "./commands";

before(() => {
  cy.log("========== TEST SUITE STARTED ==========");
});

after(() => {
  cy.log("========== TEST SUITE FINISHED ==========");
});

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("ResizeObserver loop") ||
    err.message.includes("Non-Error promise rejection") ||
    err.message.includes("Cannot read properties of null")
  ) {
    return false;
  }
});