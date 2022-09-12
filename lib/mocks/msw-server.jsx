import { setupServer } from 'msw/node';

import { handlers } from './msw-handlers';

// This configures a request mocking server with the given request handlers.
export const mswServer = setupServer(...handlers);

export const mswCustomServer = (customHandler) => setupServer(...customHandler);
