import { useState, useEffect } from 'react';

interface Item {
  category?: string;
  title: string;
  url?: string;
  imgUrl: string;
  id: number;
}

type FilterFn<T> = (items: T[]) => T[];

const useFetchItems = <T extends Item>(endpoint: string, filterFn: FilterFn<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     // Check cache
     const cachedData = localStorage.getItem(endpoint);
     if (cachedData) {
       const parsedData = JSON.parse(cachedData);
       setItems(filterFn(parsedData.items));
       setIsPending(false);
       return;
     }

    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error('Could not fetch the data for that resource');
        }
        const data = await res.json();

        // if (!Array.isArray(data)) {
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Unexpected data format');
        }

        // Cache response
        localStorage.setItem(endpoint, JSON.stringify(data));

        // const filteredItems = filterFn(data);
        const filteredItems = filterFn(data.items);
        setItems(filteredItems);
        setIsPending(false);
      } catch (err) {
        setIsPending(false);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchData();
  }, [endpoint, filterFn]);

  return { items, isPending, error };
};

export default useFetchItems;
