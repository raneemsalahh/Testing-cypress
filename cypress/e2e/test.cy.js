describe("Website Tests", () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Test Case 9: Search Product", () => {
    cy.visit("http://automationexercise.com");

    cy.url().should("include", "http://automationexercise.com");
    cy.get('[href="products"]').click();
    
  });

  }); 



