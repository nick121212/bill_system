import { useCallback, useEffect, useState } from "react";

export default function usePagination(onChange: (data: any) => void) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchData, setSearchData] = useState({});

  const refresh = useCallback(() => {
    let skip = (page - 1) * pageSize;

    onChange({
      where: searchData,
      take: pageSize,
      skip: skip > 0 ? skip : 0,
    });
  }, [page, pageSize, searchData, onChange]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    setPage,
    setPageSize,
    setSearchData,
    page,
    pageSize,
    refresh
  };
}
