import { Given } from "cypress-cucumber-preprocessor/steps";

Given("User navigate to the Register Page", () => {
  cy.visit("/");
});

Given("User navigate to the Login Page", () => {
  cy.visit("/login");
});

Given("User should be navigate to the {string} Page", (page: string) => {
  cy.visit(`/${page}`);
});

