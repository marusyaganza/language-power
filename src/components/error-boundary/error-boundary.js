/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ErrorDisplay from '../error-display/index';

const clickHandler = () => {
  window.location.reload(false);
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.mode === 'development') {
      console.error('err', JSON.stringify({ error, errorInfo }));
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          subHeading="Sometning went wrong"
          heading="error"
          headingIcon="error"
          buttonText="Reload"
          buttonHandler={clickHandler}
          theme="red"
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
