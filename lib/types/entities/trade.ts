import type { AxiosResponse } from 'axios';
import type { SuccessResponse } from '../apiResponse';

export type PriceChangesType = {
  pair: string;
  latestPrice: string;
  day: string | null;
  week: string | null;
  month: string | null;
  year: string | null;
};

export type PriceChangesListType = PriceChangesType[];

export type PriceChangesResponse = SuccessResponse<PriceChangesListType>;

export type AxiosPriceChangesResponse = AxiosResponse<PriceChangesResponse>;
