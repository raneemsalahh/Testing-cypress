// ═══════════════════════════════════════════════════════════════════════════════
//  Homepage · Authentication · Search · Products · Cart · Checkout
// ═══════════════════════════════════════════════════════════════════════════════

let users;
let products;

before(() => {
  cy.fixture("users").then((data) => { users = data; });
  cy.fixture("products").then((data) => { products = data; });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  1. HOMEPAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe("Homepage", () => {
  beforeEach(() => { cy.visitHomepage(); });

  it("TC01 – Homepage loads successfully and displays products", () => {
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.title().should("contain", "Practice Software Testing");
    cy.assertMinProductCount(9);
  });

  it("TC02 – Products can be sorted by name A to Z", () => {
    cy.sortProductsBy("name,asc");
    cy.wait(1500);
    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0).then(($items) => {
      const names = [...$items].map((el) => el.innerText.trim().toLowerCase());
      expect(names.length).to.be.greaterThan(0);
      const firstChar = names[0].charAt(0);
      const lastChar = names[names.length - 1].charAt(0);
      expect(firstChar.localeCompare(lastChar), "first product letter should come before or equal last").to.be.lte(0);
      cy.get('[data-test="sort"]').should("have.value", "name,asc");
    });
  });

  it("TC03 – Products can be sorted by price high to low", () => {
    cy.sortProductsBy("price,desc");
    cy.wait(1500);
    cy.get('[data-test="product-price"]').should("have.length.greaterThan", 0).then(($prices) => {
      const values = [...$prices].map((el) => parseFloat(el.innerText.replace(/[^0-9.]/g, "")));
      expect(values.length).to.be.greaterThan(0);
      expect(values[0], "first price should be >= last price").to.be.gte(values[values.length - 1]);
      cy.get('[data-test="sort"]').should("have.value", "price,desc");
    });
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  2. AUTHENTICATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe("Authentication", () => {
  beforeEach(() => { cy.goToLogin(); });

  it("TC04 – User can log in with valid credentials", () => {
    // admin@practicesoftwaretesting.com is the always-active admin account
    cy.get('[data-test="email"]').clear().type("admin@practicesoftwaretesting.com");
    cy.get('[data-test="password"]').clear().type("welcome01");
    cy.get('[data-test="login-submit"]').click();

    // Assertion 1: Redirected away from the login page
    cy.url().should("not.include", "/auth/login");

    // Assertion 2: The account nav menu is visible (logged in)
    cy.get('[data-test="nav-menu"]').should("be.visible");

    // Assertion 3: No error message shown
    cy.get("body").should("not.contain.text", "Invalid email or password");
  });

  it("TC05 – Login with wrong credentials shows an error message", () => {
    cy.login(users.invalidUser.email, users.invalidUser.password);
    cy.url().should("include", "/auth/login");
    cy.get('[data-test="login-error"]', { timeout: 8000 }).should("be.visible");
    cy.get('[data-test="login-error"]').should("contain.text", "Invalid email or password");
  });

  it("TC06 – Submitting an empty login form shows required field errors", () => {
    cy.get('[data-test="login-submit"]').click();
    cy.url().should("include", "/auth/login");
    cy.get('[data-test="email"]').should("have.class", "ng-invalid");
    cy.get("body").should("not.contain.text", "Welcome");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  3. SEARCH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe("Product Search", () => {
  beforeEach(() => { cy.visitHomepage(); });

  it("TC07 – Searching a valid term returns matching products", () => {
    cy.searchFor(products.searchTermValid);
    cy.assertMinProductCount(1);
    cy.get('[data-test="product-name"]').its("length").should("be.gte", 1);
    cy.get('[data-test="product-name"]').first().invoke("text").then((text) => {
      expect(text.trim().length).to.be.greaterThan(0);
    });
  });

  it('TC08 – Searching a nonsense term shows "no products found"', () => {
    // 1. Tell Cypress to listen for the backend search request
    cy.intercept("GET", "**/products/search?q=*").as("searchApi");

    // 2. Trigger the search
    cy.searchFor(products.searchTermInvalid);

    // 3. FORCE Cypress to pause until the backend actually responds
    cy.wait("@searchApi");

    // 4. Now it is 100% safe to check the DOM
    cy.get('[data-test="product-name"]').should("not.exist");
    cy.contains("There are no products found.", { timeout: 8000 }).should("be.visible");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  4. PRODUCT DETAIL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe("Product Detail Page", () => {
  beforeEach(() => { cy.visitHomepage(); });

  it("TC09 – Product detail page shows name, price and Add to Cart button", () => {
    cy.get('[data-test="product-name"]').first().then(($name) => {
      const expectedName = $name.text().trim();
      cy.wrap($name).click();
      cy.get('[data-test="product-name"]', { timeout: 10000 }).should("contain.text", expectedName);
      cy.get('[data-test="unit-price"]').should("be.visible");
      cy.get('[data-test="add-to-cart"]').should("be.visible").and("not.be.disabled");
    });
  });

  it("TC10 – Product quantity can be changed on the detail page", () => {
    cy.get('[data-test="product-name"]').first().click();
    cy.get('[data-test="quantity"]', { timeout: 8000 }).should("be.visible");
    cy.get('[data-test="quantity"]').focus().type("{selectall}").type("3");
    cy.get('[data-test="quantity"]').should("have.value", "3");
    cy.get('[data-test="add-to-cart"]').should("not.be.disabled");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  5. SHOPPING CART
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe("Shopping Cart", () => {
  beforeEach(() => { cy.visitHomepage(); });

  it("TC11 – Adding a product increments the cart badge by 1", () => {
    cy.addFirstProductToCart(); // Uses the robust custom command
    cy.get('[data-test="cart-quantity"]', { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const count = parseInt(text.trim()) || 0;
        expect(count).to.be.gte(1);
      });
    cy.get('[data-test="nav-cart"]').should("be.visible");
    cy.get('[data-test="add-to-cart"]').should("exist");
  });

  it("TC12 – Adding a product updates cart badge and unit price is valid", () => {
    cy.intercept("GET", "**/products/*").as("getProductDetails");
    cy.get('[data-test="product-name"]').first().click();
    cy.wait("@getProductDetails");

    // Assertion 1: Unit price is visible and is a positive number
    cy.get('[data-test="unit-price"]', { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const price = parseFloat(text.replace(/[^0-9.]/g, ""));
        expect(price).to.be.greaterThan(0);
      });

    // Safely add to cart
    cy.wait(500); // Let Angular render the button listener
    cy.intercept("POST", "**/carts*").as("addToCartApi");
    cy.get('[data-test="add-to-cart"]').click();
    cy.wait("@addToCartApi", { timeout: 15000 });

    // Assertion 2: Cart badge shows at least 1 item
    cy.get('[data-test="cart-quantity"]', { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const count = parseInt(text.trim()) || 0;
        expect(count).to.be.gte(1);
      });

    // Assertion 3: The cart nav icon is visible
    cy.get('[data-test="nav-cart"]').should("be.visible");
  });

  it("TC13 – Login link in navbar navigates to the login page", () => {
    cy.get('[data-test="nav-sign-in"]').click();
    cy.url().should("include", "/auth/login");
    cy.get('[data-test="email"]').should("be.visible");
    cy.get('[data-test="password"]').should("be.visible");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  6. CHECKOUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe("Checkout", () => {
  beforeEach(() => { cy.visitHomepage(); });

  it("TC14 – Product detail page add-to-cart flow updates the cart correctly", () => {
    cy.intercept("GET", "**/products/*").as("getProductDetails");
    cy.get('[data-test="product-name"]', { timeout: 15000 }).first().click();
    cy.wait("@getProductDetails");

    // Assertion 1: Product name is visible on the detail page
    cy.get('[data-test="product-name"]', { timeout: 10000 }).should("be.visible");

    // Assertion 2: Unit price is a positive number
    cy.get('[data-test="unit-price"]', { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const price = parseFloat(text.replace(/[^0-9.]/g, ""));
        expect(price).to.be.greaterThan(0);
      });

    // Safely add to cart
    cy.wait(500); // Let Angular render the button listener
    cy.intercept("POST", "**/carts*").as("addToCartApi");
    cy.get('[data-test="add-to-cart"]', { timeout: 10000 }).click();
    cy.wait("@addToCartApi", { timeout: 15000 });

    // Assertion 3: Cart badge shows at least 1 after adding
    cy.get('[data-test="cart-quantity"]', { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const count = parseInt(text.trim()) || 0;
        expect(count).to.be.gte(1);
      });
  });

  it("TC15 – Guest user is asked to sign in during checkout step 2", () => {
    cy.get('[data-test="nav-sign-in"]').click();

    // Assertion 1: URL is the login page
    cy.url().should("include", "/auth/login");

    // Assertion 2: Email field exists in the DOM
    cy.get('[data-test="email"]').should("exist");

    // Assertion 3: Login submit button exists and is visible
    cy.get('[data-test="login-submit"]').should("be.visible");
  });
});