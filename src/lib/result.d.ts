export interface ResultSuccess<T> {
  success: true;
  data: T;
}

export interface ResultError {
  success: false;
  message: string;
}

export type Result<T> = ResultSuccess<T> | ResultError;
