import useAxios from "axios-hooks";

export default function useRole() {
  const [{ data: rows, loading: loading }] = useAxios({
    url: "/roles",
  });

  return {roles: rows, loading};
}
