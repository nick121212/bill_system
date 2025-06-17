import { useCallback } from 'react';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { ProductUnitEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';

import Create from './create';
import Edit from "./edit";
import Remove from "./remove";
import Search from "./search";

export default function ProductUnit() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/product/units',
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

  const columns: ColumnsType<ProductUnitEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('cls.proUnit.name'),
      dataIndex: 'name',
      align: 'center',
    },
    // {
    //   title: t('cls.proUnit.label'),
    //   dataIndex: 'label',
    //   align: 'center',
    // },
    {
      title: t('cls.com.desc'),
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: t('cls.com.createTime'),
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('cls.com.operation'),
      key: 'operation',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Edit title={t('cls.proUnit.modal.editTitle')} record={record} onSuccess={pag.refresh} />
          <Remove title={t('cls.proUnit.modal.deleteTitle')} record={record} onSuccess={pag.refresh} />
        </Space>
      ),
    },
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Create title={t('cls.proUnit.modal.createTitle')} onSuccess={pag.refresh} />
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
