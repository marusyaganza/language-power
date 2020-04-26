import React from 'react';
import { ErrorDisplay } from '../../components/error-display/error-display';

export const NotFoundPage = () => {
  return (
    <ErrorDisplay
      heading="404"
      subHeading="Page is not found"
      buttonText="Go to Home page"
      link="/"
    />
  );
};
