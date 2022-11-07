import { Then, When } from "cypress-cucumber-preprocessor/steps";

//############### When ##################
When("User input Right Register Credentials", () => {
  cy.intercept("POST", "https://localhost:7258/api/authenticate/register", {
    statusCode: 200,
    body: {
      status: "Success",
      message: "User created successfully!",
    },
  });
  cy.elementShouldVisible("[data-testid=firstnamelabel]");
  cy.elementShouldVisible("[data-testid=emaillabel]");
  cy.elementShouldVisible("[data-testid=passwordlabel]");
  cy.fixture("RegisterInputs").then((data) => {
    cy.filled_inputfield("[type=text]", data.firstName);
    cy.filled_inputfield("[type=email]", data.email);
    cy.filled_inputfield("[type=password]", data.password);
    console.log("sdsd", data);
  });
  cy.clickOnButton("[data-testid=Register-button]");
});

When("User input Wrong Register Credentials", function () {
  cy.intercept("POST", "https://localhost:7258/api/authenticate/register", {
    statusCode: 400,
    body: {
      type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
      title: "One or more validation errors occurred.",
      status: 400,
      traceId: "00-18279f3547819c22e300381d4cada74b-85318dfecea2ee00-00",
      errors: { Email: ["The Email field is not a valid e-mail address."] },
    },
  });
  cy.elementShouldVisible("[data-testid=firstnamelabel]");
  cy.elementShouldVisible("[data-testid=emaillabel]");
  cy.elementShouldVisible("[data-testid=passwordlabel]");
  cy.fixture("RegisterInputs").then((data) => {
    cy.filled_inputfield("[type=text]", data.firstName);
    cy.filled_inputfield("[type=email]", data.email);
    cy.filled_inputfield("[type=password]", data.password);
  });
  cy.clickOnButton("[data-testid=Register-button]");
});

When("User register with empty input filled", function () {
  cy.elementShouldVisible("[data-testid=firstnamelabel]");
  cy.elementShouldVisible("[data-testid=emaillabel]");
  cy.elementShouldVisible("[data-testid=passwordlabel]");
  cy.fixture("RegisterInputs").then((data) => {
    cy.filled_inputfield("[type=text]", data.firstName);
    cy.filled_inputfield("[type=password]", data.password);
  });
  cy.clickOnButton("[data-testid=Register-button]");
});

// ######################### Then ######################
Then("User should be Registerd", () => {
  cy.checkToastMessage("toast-success", "Register Successful!");
});

Then("User should not be Registered", () => {
  cy.checkToastMessage("toast-error", "Register Failed");
});

Then("fill required field.", () => {
  cy.checkToastMessage("toast-error", "fill required field.");
});
