export type HttpSuccessfulStatus =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;
export type HttpClientErrorStatus =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;
export type HttpServerErrorStatus =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

export type HttpErrorStatus = HttpClientErrorStatus | HttpServerErrorStatus;

export type ApiSuccessfulResponse<T> = {
  status: HttpSuccessfulStatus;
  data: T;
};

export type ApiErrorResponse = {
  status: HttpErrorStatus;
  error: {
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccessfulResponse<T> | ApiErrorResponse;
