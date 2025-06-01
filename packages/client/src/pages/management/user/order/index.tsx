import { useCallback } from 'react';
import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { OrderEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';
import { convertNo, convertPriceFromServer } from '@/utils';

import Create from './create';
import Detail from './detail';
import OrderStatus from './orderStatus';
import Remove from './remove';
import Search from './search';

const colorStatus = ['#f50', '#87d068', 'volcano'];

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
        params: {
          ...(formData || {}),
          order: {
            createTime: 'DESC',
          },
        },
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
      title: t('cls.order.no'),
      dataIndex: 'no',
      align: 'center',
      width: 200,
      render: (val) => convertNo(val),
    },
    {
      title: t('cls.order.customer'),
      dataIndex: 'customer',
      align: 'center',
      render: (data) => data?.fullname,
    },
    {
      title: t('cls.com.desc'),
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: t('cls.order.totalPrice'),
      dataIndex: 'totalPrice',
      align: 'center',
      render: (val) => convertPriceFromServer(val),
    },
    {
      title: t('cls.order.status'),
      dataIndex: 'status',
      align: 'center',
      render: (val, record) => {
        if (record.status === 0) {
          return <OrderStatus record={record} onSuccess={pag.refresh} />;
        }

        return (
          <Tag color={colorStatus[val]}>{t(`cls.order.statusStr.${val}`)}</Tag>
        );
      },
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
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <Create
            title={t('cls.order.modal.eTitle')}
            orderId={record.id}
            btnType="text"
            onSuccess={pag.refresh}
          />
          <Detail orderId={record.id} />
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
            orderId={0}
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
