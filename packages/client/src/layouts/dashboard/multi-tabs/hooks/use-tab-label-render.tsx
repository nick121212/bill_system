import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { UserEntity } from "@bill/database/esm";

import useData from "@/hooks/data/useData";

import type { KeepAliveTab } from "../types";

export function useTabLabelRender() {
  const { t } = useTranslation();
  const { rows } = useData<UserEntity[]>("user");

  const specialTabRenderMap = useMemo<
    Record<string, (tab: KeepAliveTab) => React.ReactNode>
  >(
    () => ({
      "sys.menu.system.user_detail": (tab: KeepAliveTab) => {
        const userId = tab.params?.id;
        const defaultLabel = t(tab.label);
        if (userId) {
          const user = rows?.find((item) => item.id.toString() === userId);
          return `${user?.fullname}-${defaultLabel}`;
        }
        return defaultLabel;
      },
    }),
    [t, rows]
  );

  const renderTabLabel = (tab: KeepAliveTab) => {
    const specialRender = specialTabRenderMap[tab.label];
    if (specialRender) {
      return specialRender(tab);
    }
    return t(tab.label);
  };

  return renderTabLabel;
}
