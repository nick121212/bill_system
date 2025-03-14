import { useCallback, useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { ProductEntity } from '@bill/database/esm';
import type { ProductCategoryEntity, ProductUnitEntity } from '@bill/database/esm';

import { getCategory } from '@/api/services/prodCatServer';
import { getUnit } from '@/api/services/proUnitServer';
import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';

import Create from './create';
import Edit from './edit';
import Remove from './remove';
import Search from './search';

export default function PermissionPage() {
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [units, setUnits] = useState<DefaultOptionType[]>([]);
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
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'label',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: '成本',
      dataIndex: 'cost',
      align: 'center',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
      render: (obj: ProductUnitEntity) => obj?.name,
    },
    {
      title: '分类',
      dataIndex: 'category',
      align: 'center',
      render: (obj: ProductCategoryEntity) => obj?.name,
    },
    {
      title: '介绍',
      dataIndex: 'desc',
      align: 'center',
      width: "15%",
      ellipsis: true,
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
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <Edit
            title="编辑产品"
            record={record}
            onSuccess={onSuccess}
            units={units}
            categories={categories}
          />
          <Remove
            title="删除商品"
            record={record}
            onSuccess={onSuccess}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCategory().then((res) => {
      const { data } = res;
      setCategories(
        data?.rows?.map((item: any) => ({
          label: item.name,
          value: item.id,
        })) || [],
      );
    });
    getUnit().then((res) => {
      const { data } = res;
      setUnits(
        data?.rows?.map((item: any) => ({
          label: item.name,
          value: item.id,
        })) || [],
      );
    });
  }, []);

  useEffect(() => {
    if (apiError) {
      message.error(apiError?.message);
    }
  }, [apiError]);

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Create
            title="新建产品"
            onSuccess={pag.refresh}
            units={units}
            categories={categories}
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
