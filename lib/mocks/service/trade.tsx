import { rest } from 'msw';
import { priceChangesEndpoint } from '@lib/services/trade';
import { priceChangesListMock } from '@lib/mocks/data/trade';

import { ResponseCode, SuccessResponse, ErrorResponse } from '@lib/types/apiResponse';
import type { PriceChangesListType } from '@lib/types/entities/trade';

export const getTradePriceChanges = rest.get(priceChangesEndpoint, async (_, res, ctx) => {
  return res(
    ctx.json<SuccessResponse<PriceChangesListType>>({
      code: ResponseCode.SUCCESS,
      payload: priceChangesListMock,
      message: '',
    }),
  );
});

export const getTradePriceChangesError = rest.get(priceChangesEndpoint, async (_, res, ctx) => {
  return res(
    ctx.json({
      code: 'error',
      payload: null,
      message: '',
    }),
  );
});
