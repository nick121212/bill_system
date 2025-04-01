import { useCallback } from "react";
import useAxios from "axios-hooks";
import debounce from "lodash/debounce";

export default function useData<T = unknown>(name: string, params?: unknown) {
  const [{ data: rows, loading }, refetch] = useAxios(
    {
      url: `/${name}`,
      params:{ where: params },
    },
    {
      useCache: true,
    }
  );

  const onSearch = useCallback(
    (formData?: unknown) => {
      refetch({
        params: { where: formData },
      });
    },
    [refetch]
  );

  const onSearchDeb = debounce((formData) => {
    onSearch(formData);
  }, 800);

  return { rows: rows?.rows as T, loading, onSearch: onSearchDeb };
}
