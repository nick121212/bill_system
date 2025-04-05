import { useEffect } from "react";
import useAxios from "axios-hooks";
import dayjs from "dayjs";

import { useUserInfo } from "@/store/userStore";
import { getPinYinFirstChar } from "@/utils";

export function useUUID(start: boolean) {
  const user = useUserInfo();
  const map = {
    simpleNameLowerCase: getPinYinFirstChar(user.fullname || "", false),
    simpleNameUpperCase: getPinYinFirstChar(user.fullname || "", true),
    date: dayjs().format("YYYYMMDD"),
  };
  const prefix = `${map.date}-${user.id}-${map.simpleNameLowerCase}`;
  const [{ data: uuid, loading }, uuidRef] = useAxios(
    {
      method: "patch",
      url: `orders/uuid/${prefix}`,
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (start) {
      uuidRef();
    }
  }, [start]);

  return { uuid, loading };
}
