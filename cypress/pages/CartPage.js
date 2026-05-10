class CartPage {
  getCartBadge() {
    return cy.get('[data-test="cart-quantity"]', { timeout: 10000 });
  }

  assertCartHasItems() {
    this.getCartBadge()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const count = parseInt(text.trim()) || 0;
        expect(count).to.be.gte(1);
      });
  }

  goToCart() {
    cy.get('[data-test="nav-cart"]').click();
    cy.url().should("include", "/checkout");
  }

  assertNavCartVisible() {
    cy.get('[data-test="nav-cart"]').should("be.visible");
  }
}

export default new CartPage();