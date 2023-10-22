import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export type SearchParamsType = { [k: string]: string | number };

type ReturnedTuple = [URLSearchParams, (params: SearchParamsType) => void];

/*
	1. Hook should relocate after searchParams is updated.
	2. Hook should provide access to searchParams
	3. Hook should provide updateSearchParams function
*/
function useSearchParamsAndNavigate(baseURL: string): ReturnedTuple {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );
  const navigate = useNavigate();

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

  const updateSearchParams = (searchParams: SearchParamsType) => {
    const paramsWithoutNumbers = Object.entries(searchParams).map(
      ([key, value]) =>
        typeof value === 'string' ? [key, value] : [key, value.toString()]
    );

    setSearchParams(
      new URLSearchParams(Object.fromEntries(paramsWithoutNumbers))
    );
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
