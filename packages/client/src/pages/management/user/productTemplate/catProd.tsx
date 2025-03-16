import { useEffect, useState, Key } from 'react';
import { Select, Table, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
} from '@bill/database/esm';
import useAxios from 'axios-hooks';

import useData from '@/hooks/data/useData';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

export default function CatProd({value, onChange}: any) {
  const {
    rows: categories,
    loading: cateLoad,
    onSearch: debouncedOnCateSearch,
  } = useData<ProductCategoryEntity[]>('product/categories');
  const [{ data: rows, loading, error: apiError }, refresh] = useAxios(
    {
      url: '/products',
    },
    {
      manual: true,
    },
  );

  const [categoryId, setCategoryId] = useState<number>(value?.productCategoryId);
  const [products, setProducts] = useState<ProductEntity[]>(value?.products || []);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  useEffect(() => {
    if (!categoryId) {
      setProducts([]);
      return;
    }
    refresh({ params: { category: { id: categoryId } } });
    onChange({
      productCategoryId: categoryId,
      products: selectedRowKeys,
    });
  }, [categoryId]);

  useEffect(() => {
    setProducts(rows?.rows || []);
  }, [rows]);

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
      width: '15%',
      ellipsis: true,
    },
  ];

  const rowSelection: TableRowSelection<ProductEntity> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
      setSelectedRowKeys(selectedRowKeys);
      onChange({
        productCategoryId: categoryId,
        products: selectedRowKeys,
      });
    },
    selectedRowKeys,
  };

  return (
    <Space direction="vertical" size={10}>
      <Select
        loading={cateLoad}
        value={categoryId}
        onChange={(value) => {
          setCategoryId(value);
        }}
        options={
          categories?.map((c) => {
            return {
              label: c.name,
              value: c.id,
            };
          }) ?? []
        }
        showSearch
        filterOption={false}
        onSearch={debouncedOnCateSearch}
        allowClear
      />
      <Table
        rowKey="id"
        dataSource={products || []}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
      />
    </Space>
  );
}
