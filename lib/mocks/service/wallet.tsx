import { rest } from 'msw';
import { supportedCurrenciesEndpoint } from '@lib/services/wallet';
import { supportedCurrenciesListMock } from '@lib/mocks/data/wallet';

import { ResponseCode, SuccessResponse, ErrorResponse } from '@lib/types/apiResponse';
import type { SupportedCurrenciesListType } from '@lib/types/entities/wallet';

export const getSupportedCurrencies = rest.get(supportedCurrenciesEndpoint, async (_, res, ctx) => {
  return res(
    ctx.json<SuccessResponse<SupportedCurrenciesListType>>({
      code: ResponseCode.SUCCESS,
      payload: supportedCurrenciesListMock,
      message: '',
    }),
  );
});

export const getSupportedCurrenciesError = rest.get(
  supportedCurrenciesEndpoint,
  async (_, res, ctx) => {
    return res(
      ctx.json({
        code: 'error',
        payload: null,
        message: '',
      }),
    );
  },
);
