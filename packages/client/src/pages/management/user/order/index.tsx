import { useCallback } from 'react';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { OrderEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';

import Create from './create';
import Remove from './remove';
// import Search from './search';

export default function OrderPage() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/orders',
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

  const columns: ColumnsType<OrderEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('cls.order.name'),
      dataIndex: 'name',
      align: 'center',
      width: 200,
    },
    {
      title: t('cls.order.customer'),
      dataIndex: 'customer',
      align: 'center',
    },
    {
      title: t('cls.com.desc'),
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: t('cls.com.operation'),
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          {/* <Create
            title={t('cls.order.modal.eTitle')}
            formValue={record}
            onSuccess={pag.refresh}
          /> */}
          <Remove
            title={t('cls.order.modal.dTitle')}
            record={record}
            onSuccess={pag.refresh}
          />
        </div>
      ),
    },
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Create
            title={t('cls.order.modal.cTitle')}
            onSuccess={pag.refresh}
          />
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
