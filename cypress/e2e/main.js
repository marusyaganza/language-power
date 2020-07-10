/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/expect-expect */
const singleOptionGames = ['audio', 'writing'];
const successTexts = [
  'You made 1 mistakes',
  'You practiced 1 words',
  'Training complete'
];

describe('homepage', () => {
  it('search word', () => {
    cy.visit('/');
    cy.findByRole('link', { name: /search words/i }).click();
    cy.findByLabelText(/type word to look up/i).type('demure');
    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('button', { name: /add demure to cards/i }).click();
    cy.findByText('You should login before adding card').should('exist');
    cy.findByRole('dialog').should('exist');
    cy.findByRole('button', { name: 'OK' }).click();
    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByRole('dialog').should('exist');
    cy.findByRole('textbox', { type: 'email' }).should('exist');
    cy.findByRole('textbox', { name: /email/i }).type('test@test.com');
    cy.findByLabelText(/Password/).type('test777*');
    cy.findByText(/submit/i).click();
    cy.findByText(/logout/i).should('exist');
    cy.findByRole('button', { name: /add demure to cards/i }).click();
    cy.findByText('card added').should('exist');
    cy.findByRole('dialog').should('exist');
    cy.findByRole('button', { name: 'OK' }).click();
    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: /add demure to cards/i }).should(
      'be.disabled'
    );
  });
  it('play audio and writing games with 1 word', () => {
    cy.findByRole('link', { name: /word games/i }).click();
    singleOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.findByLabelText('Type your answer').type('dem');
      cy.findByRole('button', { name: /check/i }).click();
      cy.findByText('incorrect, try again 😕').should('exist');
      cy.findByLabelText('Type your answer').type('ure');
      cy.findByRole('button', { name: /check/i }).click();
      successTexts.forEach(text => {
        cy.findByText(text).should('exist');
      });
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByText('games results saved').should('exist');
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByRole('dialog').should('not.exist');
    });
  });
  it('should delete card', () => {
    cy.findByRole('link', { name: /word cards/i }).click();
    cy.findByRole('button', { name: /delete demure card/i }).click();
    cy.findByText('Are you sure?').should('exist');
    cy.findByText('Deleting card is irreversible').should('exist');
    cy.findByRole('button', { name: /delete/i }).click();
    cy.findByText('card removed').should('exist');
    cy.findByRole('button', { name: /OK/i }).click();
    cy.findByText('demure').should('not.exist');
    cy.findByText('You have added 0 cards').should('exist');
  });
});
// User can login and logout
// User can search word
// User can not see list of games
// User can not play without login
// User can't add words without login
// User can add words after login
// User can see words that they've added
// User can not play games if he has no words in vocab
// User can play writing and audio games with 1 word
// User can see number of their mistakes
// User won't see the word that they studied 5 times minus num of mistakes