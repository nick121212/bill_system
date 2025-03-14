import { useCallback } from "react";
import useAxios from "axios-hooks";
import debounce from "lodash/debounce";

export default function useData<T = unknown>(name: string) {
  const [{ data: rows, loading }, refetch] = useAxios({
    url: `/${name}`,
  });

  const onSearch = useCallback(
    (formData?: unknown) => {
      refetch({
        params: { where: formData },
      });
    },
    [refetch]
  );

  const onSearchDeb = debounce((val) => {
    onSearch({ name: val });
  }, 800);

  return { rows: rows?.rows as T, loading, onSearch: onSearchDeb };
}
