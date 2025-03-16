import { useCallback } from "react";
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";
import type { TemplateEntity } from "@bill/database/esm";

import TablePage from "@/components/table";
import usePagination from "@/hooks/data/usePagination";

import Create from './create';
import Remove from './remove';

export default function PermissionPage() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: "/templates",
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

  const columns: ColumnsType<TemplateEntity> = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: 200,
    },
    {
      title: "描述",
      dataIndex: "desc",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "分类",
      dataIndex: "categories",
      align: "center",
    },
    {
      title: "操作",
      key: "operation",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <Create title="编辑模板" formValue={record} onSuccess={pag.refresh} />
          <Remove title="删除角色" record={record} onSuccess={pag.refresh} />
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
