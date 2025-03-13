import { useCallback } from 'react';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity } from '@bill/database/esm';
import dayjs from "dayjs";

import TablePage from '@/components/table';
import Create from './create';
import Edit from "./edit";
import Remove from "./remove";
import Search from "./search";
import usePagination from '@/hooks/data/usePagination';

export default function ProductCategory() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/product/categories',
    },
    {
      manual: true,
    },
  );
  const onSuccess = useCallback(
    (formData?: unknown) => {
      refresh({
        params: formData,
      });
    },
    [refresh],
  );
  const pag = usePagination(onSuccess);

  const columns: ColumnsType<ProductCategoryEntity> = [
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'label',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Edit title="编辑商品分类" formValue={record} onSuccess={pag.refresh} />
          <Remove title="删除" record={record} onSuccess={pag.refresh} />
        </Space>
      ),
    },
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Create title="新建商品分类" onSuccess={pag.refresh} />
          <Button
            icon={<ReloadOutlined />}
            type="text"
            onClick={() => {
              pag.refresh();
            }}
          >
            {t('common.redo')}
          </Button>
        </Space>
      }
      tableProps={{
        size: 'small',
        rowKey: 'id',
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
      />
    </TablePage>
  );
}
