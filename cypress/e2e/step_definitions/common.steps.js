import { Given } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../pages/HomePage";
import loginPage from "../../pages/LoginPage";

Given("I am on the homepage", () => {
  homePage.visit();
});

Given("I am on the login page", () => {
  loginPage.navigate();
});