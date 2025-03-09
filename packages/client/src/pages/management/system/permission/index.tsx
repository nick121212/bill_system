import { Popconfirm, Space, Tag } from "antd";
import { ConfigProvider } from "antd";
import { type ColumnsType } from "antd/es/table";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import { IconButton, Iconify, SvgIcon } from "@/components/icon";

import Create from "./create";
import TablePage from "./table";
import type { Permission } from "#/entity";
import { BasicStatus, PermissionType } from "#/enum";

export default function PermissionPage() {
  const { t } = useTranslation();
  const columns: ColumnsType<Permission> = [
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
          <Popconfirm
            title="Delete the Permission"
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <IconButton>
              <Iconify
                icon="mingcute:delete-2-fill"
                size={18}
                className="text-error"
              />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <TablePage
      title="Permission List"
      extra={
        <>
          <Space direction="vertical" size="small" style={{ display: "flex" }}>
            <Create title="新建权限菜单" />
          </Space>
        </>
      }
      tableProps={{
        size: "small",
        scroll: { x: "max-content" },
        pagination: false,
      }}
      columns={columns}
      axiosConfig={{ url: "/menus" }}
    ></TablePage>
  );
}
