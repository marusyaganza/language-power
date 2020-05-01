import PropTypes from 'prop-types';
import React from 'react';
import styles from './games-catalog.css';
import { Button } from '../../ui-elements/buttons/button/button';
import { FancyHeading } from '../../ui-elements/fancy-heading/fancy-heading';
import { hostUrl } from '../../constants/urls';
import defaultLogo from '../../assets/img/jpg/default.png';
import defaultLogoW from '../../assets/img/jpg/default.webp';

export const GamesCatalog = ({ games, onClick }) => {
  const renderGames = () => {
    return games.map(game => {
      const clickHandler = () => {
        const data = { config: game.config, gameId: game.name };
        onClick(data);
      };
      return (
        <li className={styles.catalogItem} key={game.id}>
          <picture>
            <source
              srcSet={game.logoW ? `${hostUrl}/${game.logoW}` : defaultLogoW}
              type="image/webp"
            />
            <source
              srcSet={game.logo ? `${hostUrl}/${game.logo}` : defaultLogo}
              type="image/jpeg"
            />
            <img
              className={styles.logo}
              src={game.logo ? `${hostUrl}/${game.logo}` : defaultLogo}
              loading="lazy"
              alt={`${game.name} logo.`}
            />
          </picture>
          <article className={styles.gameCard}>
            <header className={styles.header}>
              <h3>{game.title}</h3>
            </header>
            <main>
              <p className={styles.description}>{game.description}</p>
            </main>
            <footer>
              <Button onClick={clickHandler} size="L">
                Start game
              </Button>
            </footer>
          </article>
        </li>
      );
    });
  };

  return (
    <>
      <FancyHeading>Games</FancyHeading>
      <ul className={styles.catalog}>{renderGames()}</ul>
    </>
  );
};

GamesCatalog.propTypes = {
  games: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

GamesCatalog.defaultProps = {
  games: []
};
