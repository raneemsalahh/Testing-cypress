class CheckoutPage {
  goToSignIn() {
    cy.get('[data-test="nav-sign-in"]').click();
  }

  assertOnLoginPage() {
    cy.url().should("include", "/auth/login");
    cy.get('[data-test="email"]').should("exist");
    cy.get('[data-test="login-submit"]').should("be.visible");
  }
}

export default new CheckoutPage();
