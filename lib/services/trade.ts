import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosResponse } from 'axios';

import { priceChangesAPI } from '@lib/config/trade';
import { APIResponse, ResponseCode } from '@lib/types/apiResponse';
import type { PriceChangesListType, PriceChangesResponse } from '@lib/types/entities/trade';

const clientSideServiceEndpoint = process.env.NEXT_PUBLIC_SERVICE_ENDPOINT;
export const priceChangesEndpoint = `${clientSideServiceEndpoint}${priceChangesAPI}`;

// get price changes data
export async function getTradePriceChanges() {
  let url = priceChangesEndpoint;

  const res: AxiosResponse<APIResponse<PriceChangesListType>> = await axios(url);

  if (res.data.code != ResponseCode.SUCCESS) {
    throw res;
  }

  return res;
}

export const useGetTradePriceChanges = (): UseQueryResult<PriceChangesResponse> => {
  return useQuery(
    ['tradePriceChanges'],
    async () => {
      const { data } = await getTradePriceChanges();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );
};
