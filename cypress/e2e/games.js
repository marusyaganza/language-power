/* eslint-disable jest/expect-expect */
/* eslint-disable testing-library/await-async-query */
const singleOptionGames = ['audio', 'writing'];
const multiOptionGames = [
  'definitionWord',
  'findAllDefs',
  'wordDefinition',
  'audioChallenge'
];
const successTexts = [
  'You made 1 mistakes',
  'You practiced 1 words',
  'Training complete'
];

const words = ['shoal', 'ball', 'court', 'demure', 'doll', 'hit', 'rubber'];

const creds = { password: 'test777*', email: 'test@test.com' };

describe('games page', () => {
  it.skip('can login and logout', () => {
    cy.visit('/');
    cy.loginUser(creds);
    // cy.findByRole('button', { name: /login/i }).click();
    // cy.findByRole('textbox', { name: /email/i }).type('test@test.com');
    // cy.findByLabelText(/Password/).type('test777*');
    // cy.findByRole('button', { name: /submit/i }).click();
    cy.findByTestId('spinner-animation').should('exist');
    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: 'Logout' }).click();
    cy.findByRole('button', { name: 'Login' }).should('exist');
  });
  it.skip('add words', () => {
    cy.visit('/');
    cy.navigate('search words');
    cy.loginUser(creds);
    words.forEach(cy.addWord);
  });
  it.skip('play game', () => {
    cy.visit('/');
    cy.loginUser(creds);
    cy.navigate('word games');
    multiOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.findByTestId('question').should('exist');
      cy.findByTestId('close').click();
    });
  });
  it.skip('delete all cards', () => {
    cy.visit('/');
    cy.navigate('word cards');
    cy.loginUser(creds);
    words.forEach(cy.deleteWord);
  });
  it('play audio and writing games with 1 word', () => {
    cy.visit('/');
    cy.navigate('search words');
    cy.loginUser(creds);
    cy.addWord('demure');
    cy.navigate('word games');
    singleOptionGames.forEach(game => {
      cy.findByTestId(`start ${game}`).click();
      cy.findByLabelText('Type your answer').type('dem');
      cy.findByRole('button', { name: /check/i }).click();
      cy.findByText('incorrect, try again 😕').should('exist');
      cy.findByLabelText('Type your answer').type('ure');
      cy.findByRole('button', { name: /check/i }).click();
      cy.matchImageSnapshot();
      cy.findByRole('button', { name: 'Finish game' }).click();
      cy.deleteWord('demure');
      // successTexts.forEach(text => {
      //   cy.findByText(text).should('exist');
      // });
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByText('games results saved').should('exist');
      cy.findByRole('button', { name: /finish game/i }).click();
      cy.findByRole('dialog').should('not.exist');
    });
  });
});
