/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

export const generateRandomNumber = max => Math.floor(Math.random() * max);
export const generateRandomArray = (max, size) => {
  const result = [];
  let currentNum;
  while (result.length < size) {
    currentNum = generateRandomNumber(max);
    if (!result.includes(currentNum)) {
      result.push(currentNum);
    }
  }
  return result;
};

export const generateRandomSample = (data, size) => {
  const indexes = generateRandomArray(data.length - 1, size);
  return indexes.map(elem => data[elem]);
};

export const pickUnlearnt = ({ rawData, config }) => {
  const unlearnt = rawData.filter(i => {
    const { gameData } = i;
    return gameData === undefined || gameData[config.GAME_ID] === undefined || gameData[config.GAME_ID] < config.MAX_GAMES;
  });
  if (unlearnt.length <= config.MAX_INDEX + 1) {
    return unlearnt;
  }
  return generateRandomSample(unlearnt, config.MAX_INDEX);
};

// export const generateOptions = (rawData, uuid) => {
//   const selected = generateRandomSample(rawData, config.MAX_INDEX + 1);
//   const filtered = selected.filter(i => i.uuid !== uuid);
//   return filtered.slice(0, config.MAX_INDEX).map(i => i.name);
// };

// export const prepareGameData = rawData => {
//   const selected = pickUnlearnt(rawData);

//   const qa = selected.map(card => {
//     const { pronunciation } = card;
//     const audioUrl = pronunciation.length ? pronunciation[0].audioUrl : null;
//     const options = generateOptions(rawData, card.uuid);
//     options.splice(generateRandomNumber(options.length - 1), 0, card.name);
//     return { a: card.name, q: card.defs[0], audioUrl, options };
//   });
//   const learntCards = selected.map(item => item.uuid);
//   return [qa, learntCards, config.GAME_ID];
// };

export const playAudio = audioUrl => {
  if (audioUrl) {
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  }
};
