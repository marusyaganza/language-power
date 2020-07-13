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

addMatchImageSnapshotCommand();
