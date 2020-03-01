import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './show-more.css';

export const ShowMore = ({
  items,
  initialNumber,
  title,
  openTag,
  closeTag,
  className
}) => {
  const [isopen, setOpen] = useState(false);
  const displayed = items.slice(0, initialNumber).join(', ');
  const handleSpread = () => {
    setOpen(!isopen);
  };
  const content = isopen ? items.join(', ') : displayed;
  const renderButton = () => {
    return items.length > initialNumber ? (
      <butlearnWordston
        type="button"
        onClick={handleSpread}
        className={styles.tag}
      >
        {isopen ? closeTag : openTag}
      </butlearnWordston>
    ) : null;
  };

  return (
    <section className={className}>
      <p className={styles.item}>
        <span className={styles.title}>{title}</span>
        {content}
        {renderButton()}
      </p>
    </section>
  );
};

ShowMore.propTypes = {
  items: PropTypes.array,
  initialNumber: PropTypes.number,
  title: PropTypes.string,
  openTag: PropTypes.string,
  closeTag: PropTypes.string,
  className: PropTypes.string
};
ShowMore.defaultProps = {
  items: [],
  initialNumber: 10,
  title: '',
  openTag: '...show more',
  closeTag: 'show less',
  className: 'show-more'
};
