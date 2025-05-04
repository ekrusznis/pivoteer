import api from "@/services/api/api";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

export const usePost = <T,>(url: string, withCredentials?: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const postData = async (payload?: T) => {
    try {
      setLoading(true);
      const response: AxiosResponse = await api.post<T>(url, payload, {
        withCredentials: withCredentials,
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};