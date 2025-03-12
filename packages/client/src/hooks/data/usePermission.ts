import useAxios from "axios-hooks";

export default function usePermission() {
  const [{ data: rows, loading }] = useAxios({
    url: "/menus",
  });

  return {permissions: rows, loading};
}
