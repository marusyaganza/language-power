/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ErrorDisplay } from '../error-display/error-display';

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
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error('err', JSON.stringify({ error, errorInfo }));
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
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
