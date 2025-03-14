import useAxios from "axios-hooks";
import { useCallback } from "react";

export default function useData<T = unknown>(name: string) {
    const [{ data: rows, loading }, refetch] = useAxios({
      url: `/${name}`
    });

    const onSearch = useCallback((formData?: unknown) => {
      refetch({
        params: formData,
      });
    }, [refetch]);

    return {rows: rows?.rows as T, loading, onSearch};
  }
  