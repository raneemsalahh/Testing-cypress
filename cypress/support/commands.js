// ═══════════════════════════════════════════════════════════════════════════════
//   CUSTOM COMMANDS  –  practicesoftwaretesting.com
// ═══════════════════════════════════════════════════════════════════════════════

// ── NAVIGATION ──────────────────────────────────────────────────────────────────

Cypress.Commands.add("visitHomepage", () => {
  // 1. Listen for the backend API call that loads the homepage products
  cy.intercept("GET", "**/products?*").as("getInitialProducts");

  // 2. Visit the homepage
  cy.visit("/", { timeout: 60000 });

  // 3. Wait up to 30 seconds for the server to actually return the product data
  cy.wait("@getInitialProducts", { timeout: 30000 });

  // 4. Now that we know the data arrived, wait for Angular to draw it on the screen
  cy.get('[data-test="product-name"]', { timeout: 15000 })
    .should("be.visible")
    .and("have.length.greaterThan", 0);
});

Cypress.Commands.add("goToLogin", () => {
  // 1. Always start at the root to ensure the Angular app boots up properly
  cy.visit("/", { timeout: 60000 });
  
  // 2. Wait for the app to be ready (products loaded)
  cy.get('[data-test="product-name"]', { timeout: 15000 }).should("be.visible");
  
  // 3. Click the sign-in button in the navigation bar
  cy.get('[data-test="nav-sign-in"]').click();
  
  // 4. Now wait for the email field to ensure the page transitioned
  cy.get('[data-test="email"]', { timeout: 15000 }).should("be.visible");
});

Cypress.Commands.add("goToContact", () => {
  cy.visit("/contact");
  cy.get('[data-test="first-name"]', { timeout: 8000 }).should("be.visible");
});

// ── AUTHENTICATION ──────────────────────────────────────────────────────────────

Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

// ── SEARCH ──────────────────────────────────────────────────────────────────────

Cypress.Commands.add("searchFor", (term) => {
  // Clear the box, type the term, and press the 'Enter' key inside the input
  cy.get('[data-test="search-query"]')
    .clear()
    .type(`${term}{enter}`);
    
  // We can still click the button as a fallback
  cy.get('[data-test="search-submit"]').click();
});

// ── SORTING ─────────────────────────────────────────────────────────────────────

Cypress.Commands.add("sortProductsBy", (value) => {
  cy.get('[data-test="sort"]').select(value);
});

// ── CART ────────────────────────────────────────────────────────────────────────

Cypress.Commands.add("addFirstProductToCart", () => {
  // 1. Listen for the API call that fetches the product data
  cy.intercept("GET", "**/products/*").as("getProductDetails");

  // 2. Click the first product on the homepage
  cy.get('[data-test="product-name"]', { timeout: 10000 }).first().click();

  // 3. Wait for the backend to finish sending the product details
  cy.wait("@getProductDetails");

  // 4. Give Angular a tiny fraction of a second to "wake up" the buttons
  cy.wait(500);

  // 5. Listen for the API call that actually adds the item to the cart
  cy.intercept("POST", "**/carts*").as("addToCartApi");

  // 6. Click the Add to Cart button
  cy.get('[data-test="add-to-cart"]', { timeout: 10000 })
    .should("be.visible")
    .click();

  // 7. Force Cypress to wait until the server confirms the item is in the cart
  cy.wait("@addToCartApi", { timeout: 15000 });
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

// ── CONTACT FORM ────────────────────────────────────────────────────────────────

Cypress.Commands.add("fillContactForm", (firstName, lastName, email, subject, message) => {
    cy.get('[data-test="first-name"]').clear().type(firstName);
    cy.get('[data-test="last-name"]').clear().type(lastName);
    cy.get('[data-test="email"]').clear().type(email);
    cy.get('[data-test="subject"]').select(subject);
    cy.get('[data-test="message"]').clear().type(message);
});

// ── ASSERTION HELPERS ───────────────────────────────────────────────────────────

Cypress.Commands.add("assertMinProductCount", (n) => {
  cy.get('[data-test="product-name"]').should("have.length.gte", n);
});

Cypress.Commands.add("assertCartBadge", (qty) => {
  cy.get('[data-test="cart-quantity"]').should("have.text", String(qty));
});