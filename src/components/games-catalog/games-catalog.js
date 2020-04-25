import PropTypes from 'prop-types';
import React from 'react';
import styles from './games-catalog.css';
import { Button } from '../buttons/button/button';
import { hostUrl } from '../../constants/urls';
import defaultLogo from '../../assets/img/jpg/default.png';

export const GamesCatalog = ({ games, onClick }) => {
  const renderGames = () => {
    return games.map(game => {
      const clickHandler = () => {
        const data = { config: game.config, gameId: game.name };
        onClick(data);
      };
      return (
        <li className={styles.catalogItem} key={game.id}>
          <img
            className={styles.logo}
            src={game.logo ? `${hostUrl}/${game.logo}` : defaultLogo}
            alt={`${game.name} logo.`}
          />
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

  return <ul className={styles.catalog}>{renderGames()}</ul>;
};

GamesCatalog.propTypes = {
  games: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

GamesCatalog.defaultProps = {
  games: []
};
