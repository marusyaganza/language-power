/* eslint-disable jest/expect-expect */
/* eslint-disable testing-library/await-async-query */

import {
  navLinks,
  creds,
  singleOptionGames,
  multiOptionGames,
  tags
} from '../helpers/constants';

describe('auth', () => {
  it('can login and logout', () => {
    cy.visit('/');
    cy.loginUser(creds);
    cy.findByTestId('spinner-animation').should('exist');
    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: 'Logout' }).click();
    cy.findByRole('button', { name: 'Login' }).should('exist');
  });
  it('can not sign up in prod env', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByRole('button', { name: 'sign up' }).click();
    cy.findByRole('textbox', { name: /email/i }).type('myemail@test.com');
    cy.checkCriticalA11y();
    cy.findByLabelText(/password/i).type('super999#');
    cy.findByLabelText(/name/i).type('super999#');
    cy.findByRole('button', { name: /submit/i }).click();
    cy.findByText(
      'Error occured: Sign Up is temporarily unavailable, please try again later'
    ).should('exist');
  });
  it('should show warning for invalid inputs', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /login/i }).click();
    cy.checkCriticalA11y();
    cy.findByRole('textbox', { name: /email/i }).type('rubbish');
    cy.findByLabelText(/Password/).type('wrong');
    cy.findByRole('textbox', { name: /email/i }).type('@');
    cy.findByRole('button', { name: /submit/i }).should('be.disabled');
    cy.findByRole('textbox', { name: /email/i }).type('blabla.com');
    cy.findByLabelText(/Password/).type('wrong777!');
    cy.findByRole('button', { name: /submit/i }).click();
    cy.findByText(
      'Error occured: could not identify user, credentials seems wrong'
    ).should('have.attr', 'role', 'alert');
    cy.checkCriticalA11y();
    cy.findByRole('button', { name: 'backdrop' }).click({ force: true });
  });

  it('show notification about login', () => {
    const word = 'shoal';
    const games = [...singleOptionGames, ...multiOptionGames];
    cy.visit('/');
    cy.navigate(navLinks.search);
    cy.checkCriticalA11y();
    cy.findByLabelText(/type word to look up/i).type(word);
    cy.findByRole('button', { name: /search/i }).click();
    cy.findAllByRole('button', { name: `add ${word} to cards` }).click();
    cy.findByText('You should login before adding card').should('exist');
    cy.findByText('OK').should('have.focus').click();
    cy.navigate(navLinks.games);
    games.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.findByText('you should login first').should('exist');
      cy.findByText('OK').should('have.focus').click();
    });
  });
  it('can not see cards after logout', () => {
    const word = 'hit';
    cy.visit('/');
    cy.loginUser(creds);
    cy.navigate(navLinks.search);
    cy.addWord(word);
    cy.addWord(word, 'hit-and-miss');
    cy.checkCriticalA11y();
    cy.navigate(navLinks.cards);
    cy.findByText(/You have added 2 cards/i).should('exist');
    cy.findByRole('button', { name: 'Logout' }).click();
    cy.findByText(/You have added 0 cards/i).should('exist');
    cy.findByTestId(tags.cardsList).should('not.exist');
    cy.checkCriticalA11y();
    cy.loginUser(creds);
    cy.findByTestId(tags.cardsList).should('exist');
    cy.deleteWord(word);
    cy.deleteWord('hit-and-miss');
  });
});
