import { config } from './config';
import {
  generateRandomSample,
  generateRandomNumber,
  pickUnlearnt
} from '../../helpers';

export const generateOptions = (rawData, uuid) => {
  const selected = generateRandomSample(rawData, config.MAX_INDEX + 1);
  const filtered = selected.filter(i => i.uuid !== uuid);
  return filtered.slice(0, config.MAX_INDEX).map(i => i.name);
};

export const prepareGameData = rawData => {
  const selected = pickUnlearnt({ rawData, config });

  const qa = selected.map(card => {
    const { pronunciation } = card;
    const audioUrl = pronunciation.length ? pronunciation[0].audioUrl : null;
    const options = generateOptions(rawData, card.uuid);
    options.splice(generateRandomNumber(options.length - 1), 0, card.name);
    return { a: card.name, q: card.defs[0], audioUrl, options };
  });
  const learntCards = selected.map(item => item.uuid);
  return [qa, learntCards, config.GAME_ID];
};

export const playAudio = audioUrl => {
  if (audioUrl) {
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  }
};
