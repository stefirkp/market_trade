import { getTradePriceChanges } from './service/trade';
import { getSupportedCurrencies } from './service/wallet';

// Ref: https://mswjs.io/docs/getting-started/mocks/rest-api

export const handlers = [getSupportedCurrencies, getTradePriceChanges];
