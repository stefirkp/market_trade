import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setLogger } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Ref: https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }) => {
  // wrap children with other providers that you may use
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

AllTheProviders.propTypes = {
  children: PropTypes.any,
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// https://react-query.tanstack.com/guides/testing#turn-off-network-error-logging
setLogger({
  log: console.log,
  warn: console.warn,
});

/* Re-export testing related helpers */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { mswServer } from './mocks/msw-server';
export { rest } from 'msw';
