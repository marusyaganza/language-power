/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/expect-expect */
const viewPorts = [
  'iphone-5',
  'iphone-6',
  'iphone-x',
  'macbook-15',
  'samsung-s10'
];

describe('homepage snapshot', () => {
  viewPorts.forEach(viewPort => {
    it.skip(`match snapshot ${viewPort}`, () => {
      cy.visit('/');
      cy.viewport(viewPort);
      cy.matchImageSnapshot(`${viewPort} portrait`);
      cy.findByRole('button', { name: /login/i }).click();
      cy.matchImageSnapshot(`${viewPort} login popup`);
      cy.findByRole('button', { name: /sign up/i }).click();
      cy.matchImageSnapshot(`${viewPort} sign up popup`);
      cy.findByRole('button', { name: /close window/i }).click();
      if (viewPort !== 'macbook-15') {
        cy.findByTestId('menu').click();
        cy.matchImageSnapshot(`${viewPort} sidedrawer open`);
      }
    });
  });
  it('login', () => {});
});

describe.skip('wordcards snapshot', () => {
  viewPorts.forEach(viewPort => {
    it(`match snapshot ${viewPort}`, () => {
      cy.visit('/word_cards');
      cy.viewport(viewPort);
      cy.matchImageSnapshot(`${viewPort} portrait`);
      cy.findByRole('button', { name: /login/i }).click();
      cy.matchImageSnapshot(`${viewPort} login popup`);
      cy.findByRole('button', { name: /sign up/i }).click();
      cy.matchImageSnapshot(`${viewPort} sign up popup`);
      cy.findByRole('button', { name: /close window/i }).click();
      if (viewPort !== 'macbook-15') {
        cy.findByTestId('menu').click();
        cy.matchImageSnapshot(`${viewPort} sidedrawer open`);
      }
    });
  });
});
