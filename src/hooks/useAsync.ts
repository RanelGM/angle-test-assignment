import { useCallback, useState } from 'react';

type Status = {
  isLoading: boolean,
  isSuccess : boolean,
  isError: boolean
};

type Execute<T> = (params?: T) => Promise<void>;
type UseAsyncResult<T> = [Execute<T>, Status, () => void];

export default function useAsync<T>(asyncFunction: Execute<T>): UseAsyncResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const status = {
    isLoading,
    isSuccess,
    isError,
  };

  const discardError = useCallback(() => {
    if (isError) {
      setIsError(false);
    }
  }, [isError]);

  const execute = useCallback(async (params?: T) => {
    if (isSuccess) {
      setIsSuccess(false);
    }

    discardError();

    try {
      setIsLoading(true);

      if (params) {
        await asyncFunction(params);
      } else {
        await asyncFunction();
      }

      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction, isSuccess, discardError]);

  return [execute, status, discardError];
}
