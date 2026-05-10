import "./commands";

before(() => {
  cy.log("========== TEST SUITE STARTED ==========");
});

after(() => {
  cy.log("========== TEST SUITE FINISHED ==========");
});

// Bypass 403 from CI server IP blocks
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("ResizeObserver loop") ||
    err.message.includes("Non-Error promise rejection") ||
    err.message.includes("Cannot read properties of null") ||
    err.message.includes("403") ||
    err.message.includes("Forbidden")
  ) {
    return false;
  }
});