import React from 'react';
import { Link } from 'react-router-dom';

// TODO add some view to this page. Now it looks ugly(:
export const NotFoundPage = () => {
  return (
    <>
      <h1>Page is not found</h1>
      <Link to="/"> Go to Home page </Link>
    </>
  );
};
