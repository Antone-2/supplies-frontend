import { useState, useEffect } from 'react';
import apiClient from '@/config/apiClient';

interface UseAdminDataOptions {
  endpoint: string;
  initialData?: any;
}

export function useAdminData<T = any>({ endpoint, initialData }: UseAdminDataOptions) {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    apiClient.get<T>(endpoint)
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err: any) => {
        if (isMounted) setError(err?.response?.data?.message || err.message || 'Error fetching data');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [endpoint]);

  return { data, loading, error };
}
