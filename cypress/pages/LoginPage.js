class LoginPage {
  navigate() {
    cy.visit("/", { timeout: 60000 });
    cy.get('[data-test="product-name"]', { timeout: 15000 }).should("be.visible");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="email"]', { timeout: 15000 }).should("be.visible");
  }

  fillEmail(email) {
    cy.get('[data-test="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-test="password"]').clear().type(password);
  }

  submit() {
    cy.get('[data-test="login-submit"]').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  assertLoggedIn() {
    cy.url().should("not.include", "/auth/login");
    cy.get('[data-test="nav-menu"]').should("be.visible");
  }

  assertLoginError() {
    cy.get('[data-test="login-error"]', { timeout: 8000 })
      .should("be.visible")
      .and("contain.text", "Invalid email or password");
  }
}

export default new LoginPage();