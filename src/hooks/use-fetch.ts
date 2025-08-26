import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export function useFetch<T = any>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(url, options);
        if (!cancel) {
          setData(response.data);
          setError(null);
        }
      } catch (err: any) {
        if (!cancel) {
          setError(err.message || 'Fetch error');
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}