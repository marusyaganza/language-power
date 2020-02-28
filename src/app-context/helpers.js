const WORD_CARDS = 'wordCards';
const storage = window.localStorage;
const storedCards = JSON.parse(storage.getItem(WORD_CARDS));

export const getWordCards = () => {
  return storedCards;
};

export const putCards = cards => {
  storage.setItem(WORD_CARDS, JSON.stringify(cards));
};
