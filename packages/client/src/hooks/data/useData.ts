import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import debounce from "lodash/debounce";

import { objectIsEmpty } from "@/utils";

export default function useData<T = unknown>(
  name: string,
  params?: Record<string, unknown>,
  ...dependencies: unknown[]
) {
  const [{ data: rows, loading }, refetch] = useAxios(
    {
      url: `/${name}`,
      params: { take: 10, where: params },
    },
    {
      useCache: true,
    }
  );

  // useEffect(() => {
  //   // refetch({
  //   //   params: {
  //   //     take: 10,
  //   //     where: params,
  //   //   },
  //   // });
  // }, dependencies);

  const onSearch = useCallback(
    (formData?: Record<string, unknown>, excludeKeys: string[] = []) => {
      refetch({
        params: {
          take: 10,
          where: objectIsEmpty(formData || {}) ? params : formData,
        },
      });
    },
    [refetch]
  );

  const onSearchDeb = debounce((formData?: Record<string, unknown>) => {
    onSearch(formData);
  }, 400);

  return { rows: rows?.rows as T, loading, onSearch: onSearchDeb };
}
