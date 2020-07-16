/* eslint-disable jest/expect-expect */
/* eslint-disable testing-library/await-async-query */
import {
  navLinks,
  creds,
  singleOptionGames,
  multiOptionGames,
  successTexts,
  words,
  tags
} from '../helpers/constants';

describe('games page', () => {
  it('play game with multiple options', () => {
    cy.visit('/');
    cy.navigate(navLinks.search);
    cy.loginUser(creds);
    words.forEach(word => cy.addWord(word));
    cy.navigate(navLinks.games);
    multiOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.findByTestId('question').should('exist');
      cy.findByTestId('close').click();
    });
    cy.navigate(navLinks.cards);
    words.forEach(cy.deleteWord);
    cy.findByTestId(tags.cardsList).should('not.exist');
  });
  it('play audio and writing games with 1 word', () => {
    cy.visit('/');
    const word = 'demure';
    cy.loginUser(creds);
    cy.navigate(navLinks.search);
    cy.addWord(word);
    cy.navigate(navLinks.games);
    singleOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.checkCriticalA11y();
      cy.answer('dem');
      cy.findByText('incorrect, try again 😕').should('exist');
      cy.answer('ure');
      successTexts.forEach(text => {
        cy.findByText(text).should('exist');
      });
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByText('games results saved').should('exist');
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByRole('dialog').should('not.exist');
    });
    cy.navigate(navLinks.cards);
    cy.deleteWord(word);
    cy.findByTestId(tags.cardsList).should('not.exist');
  });
  it('play audio and writing games with 1 word and learn it', () => {
    const word = 'dollhouse';
    cy.visit('/');
    cy.loginUser(creds);
    cy.navigate(navLinks.search);
    cy.addWord('doll', word);
    cy.navigate(navLinks.games);
    cy.checkCriticalA11y();
    for (let i = 0; i < 5; i++) {
      singleOptionGames.forEach(game => {
        cy.findByTestId(`start ${game}`).click();
        cy.answer(word);
        cy.findByRole('button', { name: /finish game/i }).click();
        cy.findByText('games results saved').should('exist');
        cy.findByRole('button', { name: /finish game/i }).click();
        cy.findByRole('dialog').should('not.exist');
      });
    }

    singleOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.findByText('All words are learnt, congrats!').should('exist');
      cy.findByRole('link', { name: 'Add new words' }).click();
      cy.navigate('word games');
    });

    cy.navigate('word cards');
    cy.deleteWord(word);
    cy.findByTestId(tags.cardsList).should('not.exist');
  });
  it('can not play games with multiple options with 1 word', () => {
    const word = 'ball';
    cy.visit('/');
    cy.navigate(navLinks.search);
    cy.loginUser(creds);
    cy.addWord(word);
    cy.navigate('word games');
    multiOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.checkCriticalA11y();
      cy.findByText(
        'You need to have at least 6 words to play this game'
      ).should('exist');
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByRole('dialog').should('not.exist');
    });
    cy.navigate('word cards');
    cy.deleteWord(word);
    cy.findByTestId(tags.cardsList).should('not.exist');
  });
});
