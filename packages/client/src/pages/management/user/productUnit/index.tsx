import { useCallback } from "react";
import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";
import type { RoleEntity, UserEntity } from "@bill/database/esm";

import TablePage from "@/components/table";
// import Create from "./create";
// import Edit from "./edit";
// import Remove from "./remove";
// import Search from "./search";
import usePagination from "@/hooks/data/usePagination";

import { BasicStatus } from "#/enum";

export default function PermissionPage() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: "/products",
    },
    {
      manual: true,
    }
  );
  const onSuccess = useCallback(
    (formData?: unknown) => {
      refresh({
        params: formData,
      });
    },
    [refresh]
  );
  const pag = usePagination(onSuccess);

  const columns: ColumnsType<UserEntity> = [
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex">
            <div className="ml-2 flex flex-col">
              <span className="text-sm">{record.fullname}</span>
              <span className="text-xs text-text-secondary">
                {record.email} - {record.phone}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      align: "center",
      width: 120,
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      width: 120,
      render: (role: RoleEntity) => <Tag color="cyan">{role?.name}</Tag>,
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
    {
      title: "Action",
      key: "operation",
      align: "center",
      width: 100,
      render: (_, _record) => (
        <div className="flex w-full justify-center text-gray">
          {/* <Edit title="编辑角色" formValue={record} onSuccess={pag.refresh} />
          <Remove title="删除角色" formValue={record} onSuccess={pag.refresh} /> */}
        </div>
      ),
    },
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: "flex" }}>
          {/* <Create title="新建用户" onSuccess={pag.refresh} /> */}
          <Button
            icon={<ReloadOutlined />}
            type="text"
            onClick={() => {
              pag.refresh();
            }}
          >
            {t("common.redo")}
          </Button>
        </Space>
      }
      tableProps={{
        size: "small",
        rowKey: "id",
        pagination: {
          pageSize: pag.pageSize,
          current: pag.page,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            pag.setPage(page);
            pag.setPageSize(pageSize);
          },
          total: rows?.count,
        },
        loading,
        dataSource: rows?.rows || [],
        columns,
      }}
    >
      {/* <Search
        loading={loading}
        onSuccess={(searchData: unknown) => {
          pag.setPage(1);
          pag.setSearchData(searchData);
        }}
      /> */}
    </TablePage>
  );
}
