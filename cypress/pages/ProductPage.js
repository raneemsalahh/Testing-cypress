class ProductPage {
  getProductName() {
    return cy.get('[data-test="product-name"]', { timeout: 10000 });
  }

  getUnitPrice() {
    return cy.get('[data-test="unit-price"]', { timeout: 10000 });
  }

  getAddToCartButton() {
    return cy.get('[data-test="add-to-cart"]', { timeout: 10000 });
  }

  getQuantityInput() {
    return cy.get('[data-test="quantity"]', { timeout: 8000 });
  }

  setQuantity(qty) {
    cy.get('[data-test="quantity"]', { timeout: 8000 })
      .should("be.visible")
      .focus()
      .type("{selectall}")
      .type(String(qty));
  }

  addToCart() {
    cy.get('[data-test="add-to-cart"]', { timeout: 15000 })
      .should("be.visible")
      .click();
    cy.get('[data-test="cart-quantity"]', { timeout: 15000 }).should("be.visible");
  }

  assertPriceIsPositive() {
    this.getUnitPrice()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const price = parseFloat(text.replace(/[^0-9.]/g, ""));
        expect(price).to.be.greaterThan(0);
      });
  }
}

module.exports = new ProductPage();