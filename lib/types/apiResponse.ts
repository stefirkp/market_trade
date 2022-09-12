export enum ResponseCode {
  ERROR = 'error',
  RUNTIME_ERROR = 'runtime_error',
  SUCCESS = 'success',
}

export type SuccessResponse<TData> = {
  code: ResponseCode.SUCCESS;
  message: string;
  payload: TData;
};

export type ErrorResponse = {
  code: ResponseCode.ERROR | ResponseCode.RUNTIME_ERROR;
  payload: null;
  message: string;
};

export type APIResponse<TData> = SuccessResponse<TData> | ErrorResponse;
