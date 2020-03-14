import PropTypes from 'prop-types';
import React from 'react';
import styles from './games-catalog.css';
import { Button } from '../buttons/button/button';
import defaultLogo from '../../assets/img/jpg/default-logo.png';

export const GamesCatalog = ({ games, onClick }) => {
  const renderGames = () => {
    return games.map(game => (
      <li className={styles.catalogItem} key={game.id}>
        <img
          className={styles.logo}
          src={game.logo || defaultLogo}
          alt={`${game.name} logo.`}
        />
        <article className={styles.gameCard}>
          <header className={styles.header}>
            <h3>{game.name}</h3>
          </header>
          <main>
            <p className={styles.description}>{game.desc}</p>
          </main>
          <footer>
            <Button onClick={() => onClick(game.id)} size="L">
              Start game
            </Button>
          </footer>
        </article>
      </li>
    ));
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
