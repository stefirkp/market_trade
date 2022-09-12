import type { PriceChangesListType } from '@lib/types/entities/trade';

export const priceChangesListMock: PriceChangesListType = [
  {
    pair: 'btc/idr',
    latestPrice: '332476244',
    day: '4.18',
    week: '12.26',
    month: '-7.19',
    year: '-48.90',
  },
  {
    pair: 'eth/idr',
    latestPrice: '25969218',
    day: '-0.68',
    week: '8.87',
    month: '-10.71',
    year: '-45.38',
  },
  {
    pair: 'usdt/idr',
    latestPrice: '14873',
    day: '0.00',
    week: '-0.21',
    month: '1.34',
    year: null,
  },
];
