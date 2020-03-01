const WORD_CARDS = 'wordCards';
const storage = window.localStorage;
const storedCards = JSON.parse(storage.getItem(WORD_CARDS));

export const getWordCards = () => {
  return storedCards;
};

export const putCards = cards => {
  storage.setItem(WORD_CARDS, JSON.stringify(cards));
};

export const saveGameData = (arr, data) => {
  return arr.map(item => {
    if (data.learntCards.includes(item.uuid)) {
      const { gameId } = data;
      const { gameData } = item;
      if (!gameData) {
        return { ...item, gameData: { [gameId]: 1 } };
      }
      const currentGame = gameData[gameId];
      if (!currentGame) {
        const updatedData = { ...gameData, [gameId]: 1 };
        return { ...item, gameData: updatedData };
      }
      return { ...item, gameData: { ...gameData, [gameId]: currentGame + 1 } };
    }
    return item;
  });
};
