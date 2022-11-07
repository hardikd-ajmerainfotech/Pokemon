import { Then, When } from "cypress-cucumber-preprocessor/steps";

// ############# When ###############
When("User should visit the PlayerPage.", () => {
  cy.get(".Toolbar").should("be.visible");
  cy.get("button").contains("Add Player");
});

When(
  "User should click on the add player button and fill required fields.",
  () => {
    cy.get("button").contains("Add Player").click();
    cy.fixture("AddPlayerInputs").then((data) => {
      cy.get('input[placeholder="First Name"]').type(data.FirstName);
      cy.get('input[placeholder="Last Name"]').type(data.LastName);
      cy.get('input[placeholder="Age"]').type(data.Age);
    });
    cy.clickOnButton("[data-testid=addplayerbutton]");
  }
);

When(
  "User should click on the add player button and don't fill require fields",
  () => {
    cy.get("button").contains("Add Player").click();
    cy.fixture("AddPlayerInputs").then((data) => {
      cy.get('input[placeholder="First Name"]').type(data.FirstName);
      cy.get('input[placeholder="Last Name"]').type(data.LastName);
      // cy.get('input[placeholder="Age"]').type(data.Age);
    });
    cy.clickOnButton("[data-testid=addplayerbutton]");
  }
);

When("User should click on delete button and agree button", () => {
  cy.get("[data-testid=Card-render]").last().contains("Delete").click();
  cy.get("[data-testid=agreebutton]").last().click();
});

When("User should click on delete button and disagree button", () => {
  cy.get("[data-testid=Card-render]").last().contains("Delete").click();
  cy.get("[data-testid=disagreebutton]").last().click();
});


// ############# Then ###############
Then("User able to see PlayerList.", () => {
  cy.get("[data-testid=un-orderlist]").should("be.visible");
});

Then("Player should be added successsfully in playerList.", () => {
  cy.checkToastMessage("toast-success", "Player Added Successful!");
});
Then("Player should not be add in PlayerList", () => {
  cy.checkToastMessage("toast-error", "Please filled the value");
});

Then("Player should be deleted successfully", () => {
  cy.checkToastMessage("toast-success", "Delete player Successfully!");
});

Then("Player should not be deleted", () => {
  cy.contains("Delete item").should("not.be.visible");
});
