import { useCallback, useState, useEffect } from "react";
import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";
import type { ProductEntity } from "@bill/database/esm";

import TablePage from "@/components/table";
import usePagination from "@/hooks/data/usePagination";

import { getCategory } from '@/api/services/prodCatServer';
import { getUnit } from '@/api/services/proUnitServer';

import Create from "./create";
import Remove from "./remove";
import Search from "./search";

export default function PermissionPage() {
  const [categories, setCategories] = useState([
    {
      label: '分类1',
      value: 1
    },
    {
      label: '分类2',
      value: 2
    },
    {
      label: '分类3',
      value: 3
    }
  ]);
  const [units, setUnits] = useState([
    {
      label: '千克',
      value: 0
    },
    {
      label: '斤',
      value: 1
    },
    {
      label: '个',
      value: 2
    }
  ]);
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

  const columns: ColumnsType<ProductEntity> = [
    {
      title: "名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "标签",
      dataIndex: "label",
      align: "center",
    },
    {
      title: "价格",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "成本",
      dataIndex: "cost",
      align: "center",
    },
    {
      title: "单位",
      dataIndex: "unit",
      align: "center",
    },
    {
      title: "分类",
      dataIndex: "category",
      align: "center",
    },
    {
      title: "介绍",
      dataIndex: "desc",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: "操作",
      key: "operation",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-end text-gray">
          <Create title="编辑产品" formValue={record} onSuccess={onSuccess} />
          <Remove
            title="删除权限菜单"
            formValue={record}
            onSuccess={onSuccess}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCategory().then((res) => {
      const { data } = res;
      console.log('Category: ', data);
      // setCategories(data.map((item: any) => ({ label: item.name, value: item.id })));
    });
    getUnit().then((res) => {
      const { data } = res;
      console.log('Unit: ', data);
      // setUnits(data.map((item: any) => ({ label: item.name, value: item.id })));
    });
  }, []);

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: "flex" }}>
          <Create title="新建产品" onSuccess={pag.refresh} units={units} categories={categories} />
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
      <Search
        loading={loading}
        onSuccess={(searchData: unknown) => {
          pag.setPage(1);
          pag.setSearchData(searchData);
        }}
        units={units}
        categories={categories}
      />
    </TablePage>
  );
}
