import { createContext, ReactElement, useContext } from 'react';

import { useGetSupportedCurrencies } from '@lib/services/wallet';

import type { SupportedCurrenciesResponse } from '@lib/types/entities/wallet';

type MarketData = {
  loading: boolean;
  currenciesData: SupportedCurrenciesResponse | undefined;
};

const defaultData = {
  loading: false,
  currenciesData: undefined,
};

const MarketContext = createContext<MarketData>(defaultData);

const useMarketContext = () => useContext(MarketContext);

type MarketProviderProps = {
  children?: Array<ReactElement> | ReactElement;
};

const MarketProvider: React.FC<MarketProviderProps> = ({ children }) => {
  // Currencies list will use in market table & search dropdown
  const { isLoading: isLoadingCurrencies, data: currenciesData } = useGetSupportedCurrencies();

  const marketProps = {
    loading: isLoadingCurrencies,
    currenciesData,
  };

  return <MarketContext.Provider value={{ ...marketProps }}>{children}</MarketContext.Provider>;
};

export { MarketProvider, useMarketContext };
