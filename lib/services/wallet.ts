import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosResponse } from 'axios';

import { supportedCurrenciesAPI } from '@lib/config/wallet';
import { APIResponse, ResponseCode } from '@lib/types/apiResponse';
import type {
  SupportedCurrenciesListType,
  SupportedCurrenciesResponse,
} from '@lib/types/entities/wallet';

const clientSideServiceEndpoint = process.env.NEXT_PUBLIC_SERVICE_ENDPOINT;
export const supportedCurrenciesEndpoint = `${clientSideServiceEndpoint}${supportedCurrenciesAPI}`;

// get supported currenccies data
export async function getSupportedCurrencies() {
  let url = supportedCurrenciesEndpoint;

  const res: AxiosResponse<APIResponse<SupportedCurrenciesListType>> = await axios(url);

  if (res.data.code != ResponseCode.SUCCESS) {
    throw res;
  }

  return res;
}

export const useGetSupportedCurrencies = (): UseQueryResult<SupportedCurrenciesResponse> => {
  return useQuery(
    ['suppurtedCurrencies'],
    async () => {
      const { data } = await getSupportedCurrencies();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );
};
