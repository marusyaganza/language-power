export const singleOptionGames = ['audio', 'writing'];
export const multiOptionGames = [
  'definitionWord',
  'findAllDefs',
  'wordDefinition',
  'audioChallenge'
];
export const successTexts = [
  'You made 1 mistakes',
  'You practiced 1 words',
  'Training complete'
];

export const words = [
  'shoal',
  'ball',
  'court',
  'demure',
  'doll',
  'hit',
  'rubber'
];

export const creds = { password: Cypress.env('userPassword') , email: Cypress.env('userEmail')  };

export const navLinks = {
  search: 'search words',
  cards: 'word cards',
  games: 'word games',
  home: 'home'
};

export const tags = {
  cardsList: 'cards-list'
};
