/* eslint-disable testing-library/await-async-query */
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import { terminalLog } from '../helpers/terminalLog';

Cypress.Commands.add('checkCriticalA11y', () => {
  return cy.checkA11y(
    null,
    {
      includedImpacts: ['critical']
    },
    terminalLog
  );
});

Cypress.Commands.add('loginUser', user => {
  cy.findByRole('button', { name: /login/i }).click();
  cy.findByRole('textbox', { name: /email/i }).type(user.email);
  cy.findByLabelText(/Password/).type(user.password);
  cy.findByRole('button', { name: /submit/i }).click();
});

Cypress.Commands.add('navigate', linkText => {
  cy.findByRole('link', { name: linkText }).click();
});

Cypress.Commands.add('addWord', word => {
  cy.findByLabelText(/type word to look up/i).type(word);
  cy.findByRole('button', { name: /search/i }).click();
  cy.findAllByRole('button', { name: `add ${word} to cards` })
    .first()
    .click();
  cy.findByRole('button', { name: 'OK' }).click();
});

Cypress.Commands.add('deleteWord', word => {
  cy.findByRole('button', { name: `delete ${word} card` }).click();
  cy.findByRole('button', { name: 'Delete' }).click();
  cy.findByRole('button', { name: 'OK' }).click();
});

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport' // capture viewport in screenshot
});
