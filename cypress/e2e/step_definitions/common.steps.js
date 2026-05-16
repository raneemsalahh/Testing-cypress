const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../../pages/HomePage");
const loginPage = require("../../pages/LoginPage");

Given("I am on the homepage", () => {
  homePage.visit();
});

Given("I am on the login page", () => {
  loginPage.navigate();
});