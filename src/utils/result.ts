import type { Err, Ok, Result } from '@/types/result';

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });

export const err = <E extends Error>(error: E): Err<E> => ({
  ok: false,
  error,
});

export const resultMap = <T, E extends Error, U>(
  result: Result<T, E>,
  func: (data: T) => Result<U, E>
): Result<U, E> => {
  if (result.ok) {
    return func(result.value);
  }
  return result;
};
