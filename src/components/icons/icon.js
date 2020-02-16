import React from 'react';
import PropTypes from 'prop-types';
import sprite from './sprite.svg';

const Icon = ({ width, height, id, className }) => {
  const img = `${sprite}#${id}`;
  return (
    <svg width={width} height={height} className={className}>
      <use xlinkHref={img} />
    </svg>
  );
};

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string
};
Icon.defaultProps = {
  width: 18,
  height: 18,
  id: 'asteriks',
  className: null
};
export { Icon };
