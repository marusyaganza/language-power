/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/expect-expect */
import { navLinks, creds, tags } from '../helpers/constants';

describe('homepage snapshot', () => {
  afterEach(() => {
    cy.viewport('macbook-15');
  });

  it('match snapshot homepage', () => {
    cy.visit('/');
    cy.findByRole('dialog').should('not.exist');
    cy.matchImageSnapshot('home');
    cy.matchSnapshotMobile('home mobile');
    cy.viewport('iphone-5');
    cy.findByTestId('menu').click();
    cy.matchImageSnapshot(' sidedrawer open');
  });
  
  it('add word', () => {
    const word = 'demure';
    cy.visit('/');
    cy.navigate(navLinks.search);
    cy.loginUser(creds);
    cy.addWord(word);
    cy.findByRole('button', { name: `add ${word} to cards` }).should(
      'be.disabled'
    );
    cy.matchImageSnapshot(`${word} search`);
    cy.matchSnapshotMobile(`${word} search mobile`);
    cy.findByText(`Results for`).should('exist');
    cy.navigate(navLinks.cards);
    cy.deleteWord(word);
    cy.findByTestId(tags.cardsList).should('not.exist');
  });

  it('suggestions', () => {
    cy.visit('/');
    cy.navigate(navLinks.search);
    cy.findByLabelText(/type word to look up/i).type('wot');
    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('button', { name: '...show more' }).should('exist').click();
    cy.matchImageSnapshot('suggestions');
    cy.matchSnapshotMobile('suggestions');
  });

  // not working by now. May be upgrade cypress and try again
  it.skip('404 page', () => {
    cy.visit('/hell-knows-where', {failOnStatusCode: false});
    cy.findByText('404').should('exist');
    cy.matchImageSnapshot('404');
    cy.matchSnapshotMobile('404');
  });
});
