class SearchPage {
  search(term) {
    cy.get('[data-test="search-query"]').clear().type(`${term}{enter}`);
    cy.get('[data-test="search-submit"]').click();
  }

  assertResultsFound() {
    cy.get('[data-test="product-name"]').its("length").should("be.gte", 1);
  }

  assertNoResults() {
    cy.get('[data-test="product-name"]').should("not.exist");
    cy.contains("There are no products found.", { timeout: 8000 }).should("be.visible");
  }
}

export default new SearchPage();