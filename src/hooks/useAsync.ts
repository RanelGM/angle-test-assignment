import { useCallback, useState } from 'react';

type Status = {
  isLoading: boolean,
  isSuccess : boolean,
  isError: boolean
};

type Execute = () => Promise<void>;
type UseAsyncResult = [Execute, Status];

export default function useAsync(asyncFunction: Execute): UseAsyncResult {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const status = {
    isLoading,
    isSuccess,
    isError,
  };

  const execute = useCallback(async () => {
    if (isSuccess) {
      setIsSuccess(false);
    }

    if (isError) {
      setIsError(false);
    }

    try {
      setIsLoading(true);
      await asyncFunction();
      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction, isSuccess, isError]);

  return [execute, status];
}
