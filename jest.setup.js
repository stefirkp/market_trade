import { mswServer } from './lib/mocks/msw-server';

/* Jest custom matchers
https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

/* MSW mock server
https://mswjs.io/docs/getting-started/integrate/node#setup */

// Establish API mocking before all tests.
// beforeAll(() => mswServer.listen());

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => mswServer.resetHandlers());

// // Clean up after the tests are finished.
// afterAll(() => mswServer.close());

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));
/* Polyfill fetch
https://github.com/vercel/next.js/discussions/13678#discussioncomment-22383 */
require('next');
