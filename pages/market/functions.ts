import type { PriceChangesResponse } from '@lib/types/entities/trade';
import type { SupportedCurrenciesResponse } from '@lib/types/entities/wallet';

type remapTradeMarketType = {
  priceChangesData: PriceChangesResponse;
  currenciesData: SupportedCurrenciesResponse;
};

type tradeDataType = {
  blockchainName: string;
  symbol: string;
  logo: string;
  latestPrice: string;
  day: string | null;
  week: string | null;
  month: string | null;
  year: string | null;
  converterCurrency: string;
  color: string;
};

type tradeDataMappingType = tradeDataType[];

// maping trade market into table format
export const remapTradeMarketList = ({
  priceChangesData,
  currenciesData,
}: remapTradeMarketType) => {
  const remapTradeMarket: tradeDataMappingType = [];

  const { payload: priceChangesList } = priceChangesData;
  const { payload: currencyList } = currenciesData;

  let converterCurrencySymbol: string;
  let converterCurrency: string | undefined;

  if (priceChangesList && priceChangesList.length > 0) {
    priceChangesList.map((priceChangeItem) => {
      // 1st: get currency symbol and converter currency
      const { pair } = priceChangeItem;
      const splitPair = pair.split('/');

      // get detail currency
      const currencyChangesSymbol = splitPair?.[0]?.toUpperCase();
      const currencyDetail = currencyList.find(
        ({ currencyGroup }) => currencyGroup === currencyChangesSymbol,
      );

      // get detail converter currency
      if (!converterCurrencySymbol) {
        converterCurrencySymbol = splitPair?.[1]?.toUpperCase();
        const converterCurrencyDetail = currencyList.find(
          ({ currencyGroup }) => currencyGroup === converterCurrencySymbol,
        );
        converterCurrency = converterCurrencyDetail?.currencySymbol;
      }

      // 2nd: remap item price changes into table format
      if (currencyDetail && converterCurrency) {
        const remapPriceChangeItem = {
          blockchainName: currencyDetail.name,
          symbol: currencyChangesSymbol,
          logo: currencyDetail.logo,
          color: currencyDetail.color,
          converterCurrency,
          ...priceChangeItem,
        };

        remapTradeMarket.push(remapPriceChangeItem);
      }
    });
  }

  return remapTradeMarket;
};
