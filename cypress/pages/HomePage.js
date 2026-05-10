class HomePage {
  visit() {
    cy.intercept("GET", "**/products?*").as("getInitialProducts");
    cy.visit("/", { timeout: 60000, failOnStatusCode: false });
    cy.wait("@getInitialProducts", { timeout: 30000 });
    cy.get('[data-test="product-name"]', { timeout: 15000 })
      .should("be.visible")
      .and("have.length.greaterThan", 0);
  }

  getProductNames() {
    return cy.get('[data-test="product-name"]');
  }

  getProductPrices() {
    return cy.get('[data-test="product-price"]');
  }

  sortBy(value) {
    cy.get('[data-test="sort"]').select(value);
    cy.wait(1500);
  }

  clickFirstProduct() {
    cy.get('[data-test="product-name"]').first().click();
  }

  assertMinProductCount(n) {
    cy.get('[data-test="product-name"]').should("have.length.gte", n);
  }
}

module.exports = new HomePage();