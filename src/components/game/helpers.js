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

export const playAudio = audioUrl => {
  if (audioUrl) {
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  }
};
