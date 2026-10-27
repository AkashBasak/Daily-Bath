// Shared response contract for route handlers and server actions.
export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export function ok<T>(data: T, message?: string): ApiSuccess<T> {
  return { success: true, data, message };
}

export function fail(code: string, message: string, fieldErrors?: Record<string, string[]>): ApiFailure {
  return { success: false, error: { code, message, fieldErrors } };
}
