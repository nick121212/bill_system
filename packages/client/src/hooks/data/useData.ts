import useAxios from "axios-hooks";

export default function useData<T = unknown>(name: string) {
    const [{ data: rows, loading }] = useAxios({
      url: `/${name}`
    });
  
    return {rows: rows?.rows as T, loading};
  }
  