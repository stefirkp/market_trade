import { render, cleanup, waitFor, screen, fireEvent } from '@lib/test-utils';
import { customMockApi } from '@lib/mocks/msw-pre-test';
import { getSupportedCurrenciesError, getSupportedCurrencies } from '@lib/mocks/service/wallet';
import { getTradePriceChangesError, getTradePriceChanges } from '@lib/mocks/service/trade';

import MarketPage from './index.page';

afterEach(cleanup);

describe('Error Market Trade Test', () => {
  const handlers = [getTradePriceChangesError, getSupportedCurrenciesError];

  customMockApi(handlers);

  afterEach(cleanup);

  it('should simulate tags filter market', async () => {
    render(<MarketPage />);

    await waitFor(() => {
      expect(screen.getByText('Oups. Data tidak ditemukan')).toBeInTheDocument();
    });
  });
});

describe('Market Trade Test', () => {
  const handlers = [getTradePriceChanges, getSupportedCurrencies];

  customMockApi(handlers);

  afterEach(cleanup);

  it('should simulate tags filter market', async () => {
    render(<MarketPage />);
    await waitFor(() => {
      expect(screen.getAllByTestId('tbody-col').length).toBe(3 * 6);
    });
    expect(screen.getByText('Terbaru')).toBeInTheDocument();
    expect(screen.getByText('Defi')).toBeInTheDocument();
    expect(screen.getAllByTestId('btn-tag').length).toBe(10);
  });

  it('should simulate market trade', async () => {
    render(<MarketPage />);

    await waitFor(() => {
      expect(screen.getAllByTestId('tbody-col').length).toBe(3 * 6);
    });

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('USDT')).toBeInTheDocument();
  });

  it('should simulate search asset', async () => {
    render(<MarketPage />);

    await waitFor(() => {
      expect(screen.getAllByTestId('tbody-col').length).toBe(3 * 6);
    });

    // change search input
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, {
      target: {
        value: 'Bitcoin BTC',
      },
    });
    expect(screen.getByDisplayValue('Bitcoin BTC')).toBeInTheDocument();
  });
});
