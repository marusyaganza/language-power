/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Suspense } from 'react';
import { Spinner } from '../../ui-elements/spinner/spinner';

const ErrorDisplay = React.lazy(() => import('../error-display'));

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
    // TODO log the error to an error reporting service
    console.error('err', JSON.stringify({ error, errorInfo }));
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <Suspense fallback={<Spinner />}>
          <ErrorDisplay
            subHeading="Sometning went wrong"
            heading="error"
            headingIcon="error"
            buttonText="Reload"
            buttonHandler={clickHandler}
            theme="red"
          />
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
