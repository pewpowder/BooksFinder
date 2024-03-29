import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// TODO: Remove type number. Remain only string.
export type SearchParamsType = { [k: string]: string | number };

type ReturnedTuple = [URLSearchParams, (params: SearchParamsType) => void];

function useSearchParamsAndNavigate(baseURL: string): ReturnedTuple {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );
  const navigate = useNavigate();

  const updateSearchParams = (searchParams: SearchParamsType) => {
    const paramsWithoutNumbers = Object.entries(searchParams).map(
      ([key, value]) =>
        typeof value === 'string' ? [key, value] : [key, value.toString()]
    );

    setSearchParams(
      new URLSearchParams(Object.fromEntries(paramsWithoutNumbers))
    );
  };

  const navigateWithSearchParams = (searchParams: SearchParamsType) => {
    let url = '';
    for (const key in searchParams) {
      if (Object.prototype.hasOwnProperty.call(searchParams, key)) {
        url += url === '' ? `${baseURL}?` : '&';
        url += `${key}=${searchParams[key]}`;
      }
    }

    navigate(url);
  };

  const updateSearchParamsAndNavigate = useCallback(
    (searchParams: SearchParamsType) => {
      updateSearchParams(searchParams);
      navigateWithSearchParams(searchParams);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseURL]
  );

  return [searchParams, updateSearchParamsAndNavigate];
}

export default useSearchParamsAndNavigate;
