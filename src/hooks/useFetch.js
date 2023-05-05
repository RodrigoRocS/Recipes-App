import { useCallback, useState } from 'react';

function useFetch(initialState = null) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const fetchApi = useCallback(async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData.message;
      }
      const json = await response.json();

      setData(json);
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [fetchApi, data, isLoading, errorMessage];
}

export default useFetch;
