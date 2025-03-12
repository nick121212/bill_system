import useAxios from "axios-hooks";

export default function useData(name: string) {
    const [{ data: rows, loading }] = useAxios({
      url: `/${name}s`
    });
  
    return {rows: rows?.rows, loading};
  }
  