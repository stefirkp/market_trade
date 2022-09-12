import type { AxiosResponse } from 'axios';
import type { SuccessResponse } from '../apiResponse';

type WalletsType = {
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: string;
  blockchainName: string;
  logo: string;
};

export type SupportedCurrenciesType = {
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: string;
  wallets: Array<WalletsType>;
};

export type SupportedCurrenciesListType = SupportedCurrenciesType[];

export type SupportedCurrenciesResponse = SuccessResponse<SupportedCurrenciesListType>;

export type AxiosSupportedCurrenciesResponse = AxiosResponse<SupportedCurrenciesResponse>;
