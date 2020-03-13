import { config } from './config';
import { pickUnlearnt } from '../../helpers';

export const prepareGameData = rawData => {
  const withAudio = rawData.filter(
    i => i.pronunciation.length && i.pronunciation[0].audioUrl
  );

  const selected = pickUnlearnt({ rawData: withAudio, config });

  const qa = selected.map(card => {
    const { pronunciation } = card;
    const audioUrl = pronunciation.length ? pronunciation[0].audioUrl : null;
    return { a: card.name, q: audioUrl };
  });
  const learntCards = selected.map(item => item.uuid);
  return [qa, learntCards, config.GAME_ID];
};
