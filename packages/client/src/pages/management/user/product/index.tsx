import { useCallback, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { ProductEntity, ProductInfoEntity } from '@bill/database/esm';
import type { ProductUnitEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';
import { convertPriceFromServer } from '@/utils';

import Create from './create';
import Edit from './edit';
import Remove from './remove';
import Search from './search';
import Upload from './upload';

export default function PermissionPage() {
  const { t } = useTranslation();
  const [{ data: rows, loading, error: apiError }, refresh] = useAxios(
    {
      url: '/products',
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

  const columns: ColumnsType<ProductEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('cls.product.name'),
      dataIndex: 'name',
      align: 'center',
    },
    // {
    //   title: t('cls.product.label'),
    //   dataIndex: 'label',
    //   align: 'center',
    // },
    {
      title: t('cls.product.price'),
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => convertPriceFromServer(price),
    },
    {
      title: t('cls.product.cost'),
      dataIndex: 'cost',
      align: 'center',
      render: (cost: number) => convertPriceFromServer(cost),
    },
    {
      title: t('cls.product.unit'),
      dataIndex: 'unit',
      align: 'center',
      render: (obj: ProductUnitEntity) => obj?.name,
    },
    {
      title: t('cls.com.desc'),
      dataIndex: 'desc',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
    {
      title: t('cls.product.stock'),
      dataIndex: 'info',
      align: 'center',
      render: (obj: ProductInfoEntity) => obj?.stock ?? "-",
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
          <Edit
            title={t('cls.product.modal.eTitle')}
            formValue={record}
            onSuccess={onSuccess}
          />
          <Remove
            title={t('cls.product.modal.dTitle')}
            formValue={record}
            onSuccess={onSuccess}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (apiError) {
      message.error(apiError?.message);
    }
  }, [apiError]);

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Upload
            title={t('cls.product.modal.uTitle')}
            onSuccess={pag.refresh}
          />
          <Create
            title={t('cls.product.modal.cTitle')}
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
        scroll: { x: 1200 },
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
