Cypress.Commands.add("visitHomepage", () => {
  cy.visit("/", { timeout: 60000, failOnStatusCode: false });
  cy.get("app-root", { timeout: 30000 }).should("exist");
  cy.get('[data-test="product-name"]', { timeout: 45000 }).should("exist");
});

Cypress.Commands.add("goToLogin", () => {
  cy.visit("/", { timeout: 60000, failOnStatusCode: false });
  cy.get("app-root", { timeout: 30000 }).should("exist");
  cy.get('[data-test="product-name"]', { timeout: 45000 }).should("exist");
  cy.get('[data-test="nav-sign-in"]').click();
  cy.get('[data-test="email"]', { timeout: 15000 }).should("be.visible");
});

Cypress.Commands.add("goToContact", () => {
  cy.visit("/contact", { failOnStatusCode: false });
  cy.get('[data-test="first-name"]', { timeout: 8000 }).should("be.visible");
});

Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("searchFor", (term) => {
  cy.get('[data-test="search-query"]').clear().type(`${term}{enter}`);
  cy.get('[data-test="search-submit"]').click();
});

Cypress.Commands.add("sortProductsBy", (value) => {
  cy.get('[data-test="sort"]').select(value);
});

Cypress.Commands.add("addFirstProductToCart", () => {
  cy.get('[data-test="product-name"]', { timeout: 15000 }).first().click();
  cy.get('[data-test="add-to-cart"]', { timeout: 15000 })
    .should("be.visible")
    .click();
  cy.get('[data-test="cart-quantity"]', { timeout: 15000 }).should("be.visible");
});

Cypress.Commands.add("goToCart", () => {
  cy.get('[data-test="nav-cart"]').click();
  cy.url().should("include", "/checkout");
});

Cypress.Commands.add("proceedToCheckout", () => {
  cy.get('[data-test="proceed-1"]', { timeout: 8000 })
    .should("be.visible")
    .click();
});

Cypress.Commands.add("fillContactForm", (firstName, lastName, email, subject, message) => {
  cy.get('[data-test="first-name"]').clear().type(firstName);
  cy.get('[data-test="last-name"]').clear().type(lastName);
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="subject"]').select(subject);
  cy.get('[data-test="message"]').clear().type(message);
});

Cypress.Commands.add("assertMinProductCount", (n) => {
  cy.get('[data-test="product-name"]').should("have.length.gte", n);
});

Cypress.Commands.add("assertCartBadge", (qty) => {
  cy.get('[data-test="cart-quantity"]').should("have.text", String(qty));
});