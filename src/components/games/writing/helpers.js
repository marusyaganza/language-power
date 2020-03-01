/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { MAX_INDEX, MAX_GAMES, GAME_ID } from './config';
// TODO refactor this
function shuffle(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

export const prepareGameData = rawData => {
  const unlearnt = rawData.filter(i => {
    const data = i.gameData;
    return data === undefined || data[GAME_ID] === undefined || data[GAME_ID] < MAX_GAMES;
  });
  const selected = unlearnt.length > MAX_INDEX + 1 ? rawData.slice(0, MAX_INDEX) : unlearnt;

  const mixed = shuffle(selected);

  const qa = mixed.map(card => {
    const { audioUrl } = card.pronunciation[0];
    const audioElement = new Audio(audioUrl);
    return { a: card.name, q: card.defs[0], audioElement };
  });
  const learntCards = mixed.map(item => item.uuid);
  return [qa, learntCards];
};
