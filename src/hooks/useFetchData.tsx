import { useEffect, useState } from 'react';

function useFetchData<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const result = await fetchFunction();

      if (isSubscribed) {
        setData(result);
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return data;
}

export default useFetchData;
