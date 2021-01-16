import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../../assets/styles/common-styles.css';
import { EditWord } from '../../components/edit-word/edit-word';

export const EditWordPage = ({ match: { params } }) => {
  return (
    <div className={commonStyles.container}>
      <h1 className={commonStyles.mainHeading}>Edit card</h1>
      <EditWord wordId={params?.id} />
    </div>
  );
};

EditWordPage.propTypes = {
  match: PropTypes.object
};

EditWordPage.defaultProps = {
  match: {}
};
