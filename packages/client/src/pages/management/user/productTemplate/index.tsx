import { useCallback } from "react";
import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";
import type { RoleEntity, UserEntity } from "@bill/database/esm";

import TablePage from "@/components/table";
import usePagination from "@/hooks/data/usePagination";

import Create from './create';

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
      title: '分类',
      dataIndex: 'name',
      align: 'center',
      width: 200,
    },
    {
      title: "商品",
      dataIndex: "products",
      align: "center",
      render: () => <Tag color="cyan">a</Tag>,
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
          <Create title="新建模板" onSuccess={pag.refresh} />
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
