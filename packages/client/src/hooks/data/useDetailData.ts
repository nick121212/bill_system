import { useEffect } from "react";
import useAxios from "axios-hooks";
import debounce from "lodash/debounce";

export default function useDetailData<T = unknown>(
  name: string,
  id: number,
  condition: boolean
) {
  const [{ data, loading }, refetch] = useAxios(
    {
      url: `/${name}/${id}`,
    },
    {
      useCache: false,
      manual: true,
    }
  );

  useEffect(() => {
    if (condition) {
      refetch();
    }
  }, [condition]);

  const onSearchDeb = debounce(() => {
    refetch();
  }, 300);

  return { data: data as T, loading, refetch: onSearchDeb };
}
