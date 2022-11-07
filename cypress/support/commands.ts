/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject = any> {
    checkToastMessage(toastId: string, message: string): Chainable<Element>;
    filled_inputfield(id: string, type: string): Chainable<Element>;
    clickOnButton(id: string): Chainable<Element>;
    elementShouldVisible(id: string): Chainable<Element>;
  }
}

Cypress.Commands.add("checkToastMessage",  (toastId, message) => {
  cy.get(`[id=${toastId}]`).should("contain", message);
});

Cypress.Commands.add("filled_inputfield", (id, type)=>{
    cy.get(id).type(type);
});

Cypress.Commands.add("clickOnButton", (id) => {
  cy.get(id).click();
});

Cypress.Commands.add("elementShouldVisible", (id) => {
  cy.get(id).should('be.visible');
});


