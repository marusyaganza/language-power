import { config } from './config';
import { pickUnlearnt } from '../../helpers';

export const prepareGameData = rawData => {
  const selected = pickUnlearnt({ rawData, config });

  const qa = selected.map(card => {
    const { pronunciation } = card;
    const audioUrl = pronunciation.length ? pronunciation[0].audioUrl : null;
    return { a: card.name, q: card.defs[0], audioUrl };
  });
  const learntCards = selected.map(item => item.uuid);
  return [qa, learntCards, config.GAME_ID];
};
