import { useMemo } from "react";
import { type BreadcrumbProps, Card, type GetProp } from "antd";
import Table, { type TableProps } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useMatches } from "react-router";

import { useFlattenedRoutes, usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";

export type TablePageProps = {
  title?: string;
  tableProps: Partial<TableProps<any>>;
  loading?: boolean;
  extra?: React.ReactElement;
};

type MenuItem = GetProp<BreadcrumbProps, "items">[number];

function TablePage(props: React.PropsWithChildren<TablePageProps>) {
  const { extra, tableProps, children } = props;
  const { t } = useTranslation();
  const matches = useMatches();
  const flattenedRoutes = useFlattenedRoutes();
  const permissionRoutes = usePermissionRoutes();
  const breadCrumbs = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const paths = matches
      .filter((item) => item.pathname !== "/")
      .map((item) => item.pathname);

    const pathRouteMetas = flattenedRoutes.filter((item) =>
      paths.includes(item.key)
    );

    let currentMenuItems = [...menuRoutes];

    return pathRouteMetas.map((routeMeta): MenuItem => {
      const { key, label } = routeMeta;

      // Find current level menu items
      const currentRoute = currentMenuItems.find(
        (item) => item.meta?.key === key
      );

      // Update menu items for next level
      currentMenuItems =
        currentRoute?.children?.filter((item) => !item.meta?.hideMenu) ?? [];

      return {
        key,
        title: t(label),
      };
    });
  }, [matches, flattenedRoutes, t, permissionRoutes]);

  return (
    <div className="flex items-center overflow-hidden size-full flex-col line-highlight">
      <Card
        title={breadCrumbs.map((b) => b.title).join("-")}
        extra={extra}
        style={{ width: "100%", border: "none" }}
        variant="outlined"
      >
        {children}
      </Card>

      <div className="flex-auto overflow-auto w-full">
        <Table {...tableProps} loading={props.loading} />
      </div>
    </div>
  );
}

export default TablePage;
