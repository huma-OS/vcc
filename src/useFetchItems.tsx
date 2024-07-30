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
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error('Could not fetch the data for that resource');
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }

        const filteredItems = filterFn(data);
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
