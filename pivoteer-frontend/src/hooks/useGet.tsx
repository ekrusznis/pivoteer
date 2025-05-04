import api from "@/services/api/api";
import { AxiosError } from "axios";
import { useState } from "react";

export const useGet = <T,>(url: string, withCredentials?: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get<T>(url, {
        withCredentials: withCredentials,
      });
      setData(response.data);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, loading, error };
};