import { useCallback, useState, useEffect } from 'react';
import { Button, Space, Tag, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ExportOutlined, ReloadOutlined } from '@ant-design/icons';
import type { OrderEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';
import { convertNo, convertPriceFromServer } from '@/utils';

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
        params: formData,
      });
    },
    [refresh],
  );
  const pag = usePagination(onSuccess);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const rowSelection = {
    selectedRowKeys: selectedIds,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    console.log('selectedRowKeys:', selectedRowKeys);
    if (selectedRowKeys.length === 0) {
      setSelectedIds((ids) => {
        return ids.filter(
          (key) => !rows?.rows?.map(({ id }: OrderEntity) => id)?.includes(key),
        );
      });
    }
    if (selectedRowKeys.length > 0) {
      let ids = [...selectedIds];
      selectedRowKeys.forEach((key) => {
        // selectedIds中没有key，则添加到selectedIds中
        if (!ids.includes(key)) {
          ids.push(key);
        }
      });
      // 删除rows?.rows中key不在selectedRowKeys中的数据
      const deleteKeys = rows?.rows
        ?.filter((row: OrderEntity) => !selectedRowKeys.includes(row.id))
        .map(({ id }: OrderEntity) => id);
      ids = ids.filter((k) => !deleteKeys.includes(k));
      setSelectedIds(ids);
    }
  }, [selectedRowKeys]);

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
  ];

  return (
    <TablePage
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
          <Button
            icon={<ExportOutlined />}
            type="link"
            onClick={() => {
              pag.refresh();
            }}
          >
            导出账单
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
        rowSelection,
      }}
    >
      <Search
        loading={loading}
        onSuccess={(searchData: unknown) => {
          pag.setPage(1);
          pag.setSearchData(searchData);
        }}
      />
      <Checkbox
        checked={allChecked}
        onChange={(e) => setAllChecked(e.target.checked)}
      >
        全选
      </Checkbox>
    </TablePage>
  );
}
