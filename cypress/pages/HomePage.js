class HomePage {
  visit() {
    cy.visit("/", { timeout: 60000, failOnStatusCode: false });
    // Wait for Angular app to bootstrap - look for the nav bar first
    cy.get("app-root", { timeout: 30000 }).should("exist");
    // Then wait for products or any content
    cy.get('[data-test="product-name"]', { timeout: 45000 }).should("exist");
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