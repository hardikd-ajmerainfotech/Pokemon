import { Then, When } from "cypress-cucumber-preprocessor/steps";

// ############# When ####################
When("User input Right Login Credentials", function () {
  cy.elementShouldVisible("[data-testid=firstnamelabel]");
  cy.elementShouldVisible("[data-testid=passwordlabel]");
  cy.fixture("LoginInputs").then(function (data) {
    cy.filled_inputfield("[type=text]", data.firstName);
    cy.filled_inputfield("[type=password]", data.password);
  });
  cy.clickOnButton("[data-testid=Login-button]");
});

When("User input Wrong Login Credentials", function () {
  cy.visit("/login");
  cy.elementShouldVisible("[data-testid=firstnamelabel]");
  cy.elementShouldVisible("[data-testid=passwordlabel]");
  cy.fixture("LoginInputs").then(function (data) {
    cy.filled_inputfield("[type=text]", "erf");
    cy.filled_inputfield("[type=password]", data.password);
  });
  cy.clickOnButton("[data-testid=Login-button]");
});

When("User Login With Empty Credentials", function () {
  cy.visit("/login");
  cy.elementShouldVisible("[data-testid=firstnamelabel]");
  cy.elementShouldVisible("[data-testid=passwordlabel]");
  cy.fixture("LoginInputs").then(function (data) {
    cy.filled_inputfield("[type=text]", data.firstName);
  });
  cy.clickOnButton("[data-testid=Login-button]");
});

// ################ Then ###############
Then("User should be logged in", () => {
  cy.checkToastMessage("toast-success", "Login SuccessFully");
});
Then("User should not be logged in", () => {
  cy.checkToastMessage("toast-error", "Login Failed");
});
Then("Login error should be displayed", () => {
  cy.checkToastMessage("toast-error", "fill required fields.");
});
