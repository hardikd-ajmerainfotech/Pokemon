import { Then, When } from "cypress-cucumber-preprocessor/steps";

// ############### When ################
When("User should on the MatchPage", () => {
  cy.contains("Matches").should("be.visible");
});

When(
  "User should click on the add match button and fill required fields.",
  () => {
    cy.get("button").contains("Add Match").click();
    cy.fixture("AddMatchInputs").then((data) => {
      cy.get('[data-testid="matchName"]').type(data.MatchName);
      cy.get('[data-testid="totalAudience"]').type(data.TotalAudience);
    });
    cy.get('[data-testid="players"]').click();
    cy.contains("Rohit").should("be.visible").click();
    cy.get("[data-testid=addmatchbutton]").click({ force: true });
  }
);

When(
  "User should click on the add match button and don't fill required fields.",
  () => {
    cy.get("button").contains("Add Match").click();
    cy.fixture("AddMatchInputs").then((data) => {
      // cy.get('[data-testid="matchName"]').type(data.MatchName);
      cy.get('[data-testid="totalAudience"]').type(data.TotalAudience);
    });
    cy.get('[data-testid="players"]').click();
    cy.contains("Rohit").should("be.visible").click();
    cy.get("[data-testid=addmatchbutton]").click({ force: true });
  }
);

When("User should click on delete button and disagree button", () => {
  cy.get("[data-testid=Card-render]").last().contains("Delete").click();
  cy.get("[data-testid=disagreebutton]").last().click();
});

When("User should click on delete button and agree button", () => {
  cy.get("[data-testid=Card-render]").last().contains("Delete").last().click();
  cy.get("[data-testid=agreebutton]").last().click();
});
// ###################### Then ####################
Then("User able to see MatchList.", () => {
  cy.get("[data-testid=un-orderlist]").should("be.visible");
});

Then("Match should be added successsfully in MatchList.", () => {
  cy.checkToastMessage("toast-success", "Match Added !");
});

Then("Match should not be add in MatchList.", () => {
  cy.checkToastMessage("toast-error", "Match Not Added !");
});

Then("Match should be deleted successfully",()=>{
  cy.checkToastMessage("toast-success", "Delete match Successfully!");
});

Then("Match should not be deleted", () => {
  cy.contains("Delete item").should("not.be.visible");
});