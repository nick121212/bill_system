import { useCallback } from "react";
import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useAxios from "axios-hooks";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";
import { PermissionType, type MenuEntity } from "@bill/database/esm";

import { Iconify, SvgIcon } from "@/components/icon";
import TablePage from "@/components/table";

import Create from "./create";
import Edit from "./edit";
import Remove from "./remove";
import { BasicStatus } from "#/enum";

export default function PermissionPage() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios({
    url: "/menus",
  });
  const onSuccess = useCallback(
    (formData?: unknown) => {
      refresh({
        params: formData,
      });
    },
    [refresh]
  );
  const columns: ColumnsType<MenuEntity> = [
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
      render: (_, record) => <div>{t(record.label)}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 60,
      render: (_, record) => (
        <Tag color="processing">{PermissionType[record.type]}</Tag>
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      width: 60,
      render: (icon: string) => {
        if (isNil(icon)) return "";
        if (icon.startsWith("ic")) {
          return (
            <SvgIcon icon={icon} size={18} className="ant-menu-item-icon" />
          );
        }
        return <Iconify icon={icon} size={18} className="ant-menu-item-icon" />;
      },
    },
    {
      title: "Component",
      dataIndex: "component",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (status) => (
        <Tag color={status === BasicStatus.DISABLE ? "error" : "success"}>
          {status === BasicStatus.DISABLE ? "Disable" : "Enable"}
        </Tag>
      ),
    },
    { title: "Order", dataIndex: "order", width: 60 },
    {
      title: "Action",
      key: "operation",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-end text-gray">
          <Edit title="编辑权限菜单" formValue={record} onSuccess={onSuccess} />
          <Remove
            title="删除权限菜单"
            formValue={record}
            onSuccess={onSuccess}
          />
        </div>
      ),
    },
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: "flex" }}>
          <Create title="新建权限菜单" onSuccess={onSuccess} />
          <Button
            icon={<ReloadOutlined />}
            type="text"
            onClick={() => {
              onSuccess();
            }}
          >
            {t("common.redo")}
          </Button>
        </Space>
      }
      tableProps={{
        loading,
        size: "small",
        rowKey: "id",
        pagination: false,
        dataSource: rows,
        columns,
      }}
    />
  );
}
