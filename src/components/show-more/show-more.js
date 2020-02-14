import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './show-more.css';

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
      <button type="button" onClick={handleSpread} className="show-more__tag">
        {isopen ? closeTag : openTag}
      </button>
    ) : null;
  };

  return (
    <section className={className}>
      <p className="show-more__items">
        <h3 className="show-more__title">{title}</h3>
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
