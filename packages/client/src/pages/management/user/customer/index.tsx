import { useCallback } from 'react';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { CustomerEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';

import Create from './create';
import Detail from './detail';
import Edit from './edit';
import Remove from './remove';
import Search from './search';
import Upload from './upload';

export default function ProductUnit() {
  const { t } = useTranslation();
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/customers',
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

  const columns: ColumnsType<CustomerEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('cls.customer.name'),
      dataIndex: 'fullname',
      align: 'center',
    },
    {
      title: t('cls.customer.email'),
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: t('cls.customer.phone'),
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: t('cls.customer.address'),
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: t('cls.customer.desc'),
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: t('cls.customer.discount'),
      dataIndex: 'discount',
      align: 'center',
    },
    {
      title: t('cls.customer.paytime'),
      dataIndex: 'paytime',
      align: 'center',
      render: (val) => (val ? `${val}天` : '无账期'),
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
          <Edit
            title={t('cls.customer.modal.eTitle')}
            record={record}
            onSuccess={pag.refresh}
          />
          <Detail title={t('cls.customer.modal.iTitle')} id={record.id} />
          <Remove
            title={t('cls.customer.modal.dTitle')}
            record={record}
            onSuccess={pag.refresh}
          />
        </Space>
      ),
    },
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Upload
            title={'上传客户资料'}
            onSuccess={() => {
              pag.refresh();
            }}
          />
          <Create
            title={t('cls.customer.modal.cTitle')}
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
