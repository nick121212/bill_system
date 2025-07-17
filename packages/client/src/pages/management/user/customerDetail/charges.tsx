import { useCallback } from 'react';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import { ChargeType, type CustomerEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';

interface CustomerChargesProps {
  customerId: number;
}

const ChargeTypeMap = {
  [ChargeType.CHARGE]: '充值',
  [ChargeType.CONSUME]: '消费',
  [ChargeType.RETURN]: '退款',
};

export default function CustomerCharges({ customerId }: CustomerChargesProps) {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/charges',
      params: {
        where: {
          customerId,
        },
      },
    },
    {
      manual: true,
    },
  );
  const onSuccess = useCallback(
    (formData?: unknown) => {
      refresh({
        params: {
          ...(formData as Record<string, any>),
          where: {
            customerId,
          },
        },
      });
    },
    [refresh],
  );
  const pag = usePagination(onSuccess);

  const columns: ColumnsType<CustomerEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: '充值金额',
      dataIndex: 'balance',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      render: (val: ChargeType) => ChargeTypeMap[val] || '',
    },
    {
      title: '操作员',
      dataIndex: 'user',
      align: 'center',
      render: (val) => val?.fullname,
    },
    {
      title: t('cls.com.createTime'),
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <TablePage
      title=" "
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
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
    ></TablePage>
  );
}
