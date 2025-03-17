import { useEffect, useState, Key } from 'react';
import { Select, Table, Space, Button, Card, InputNumber, Input } from 'antd';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
} from '@bill/database/esm';
import useAxios from 'axios-hooks';

import useData from '@/hooks/data/useData';
import useWatch from '@/hooks/data/useWatch';
import { getRandomId } from '@/utils/utils';

interface IProps {
  value?: {
    title?: string;
    productCategoryId?: number;
    products?: IDataSource[];
  };
  onChange?: (value: {
    title?: string;
    productCategoryId?: number;
    products?: IDataSource[];
  }) => void;
  index: number;
  onRemove: () => void;
}

type IDataSource = Partial<ProductEntity> & { num?: number; randomId?: number };

const randomId = getRandomId();

export default function CatProd({ value, onChange, index, onRemove }: IProps) {
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
  const {
    rows: productList,
    loading: serachLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductCategoryEntity[]>('products');
  const [title, setTitle] = useState<string>(value?.title || `分类${index + 1}`);
  const [categoryId, setCategoryId] = useState<number | undefined>(
    value?.productCategoryId,
  );
  const [products, setProducts] = useState<IDataSource[]>(
    value?.products || [],
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  useWatch(() => {
    if (!categoryId) {
      setProducts([]);
      return;
    }
    refresh({ params: { category: { id: categoryId } } });
  }, [categoryId]);

  useWatch(() => {
    setProducts(
      rows?.rows?.map((item: IDataSource) => ({
        ...item,
        randomId: randomId(),
      })) || [],
    );
  }, [rows]);

  useEffect(() => {
    onChange?.({
      title,
      productCategoryId: categoryId,
      products: selectedRowKeys.map((key) => {
        const product = products.find((p) => p.randomId === key);
        return {
          id: product?.id,
          price: product?.price,
          num: product?.num,
        };
      }),
    });
  }, [categoryId, products, selectedRowKeys, title]);

  const columns: ColumnsType<IDataSource> = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      render: (val, record) => renderProductSelector(val, record),
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
      render: (val, record) => {
        return (
          <InputNumber
            value={val}
            precision={2}
            onChange={(value) =>
              handleChangeData(record.randomId!, 'price', value)
            }
          />
        );
      },
    },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
      render: (obj: ProductUnitEntity) => obj?.name,
    },
    {
      title: '数量',
      dataIndex: 'num',
      align: 'center',
      render: (val, record) => (
        <InputNumber
          disabled={!record.id}
          value={val}
          min={1}
          precision={0}
          onChange={(value) => handleChangeData(record.randomId!, 'num', value)}
        />
      ),
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            updateProducts(
              products.filter((p) => p.randomId !== record.randomId),
            );
          }}
        />
      ),
    },
  ];

  // 更新列表数据
  const updateProducts = (newProducts: IDataSource[]) => {
    setProducts(newProducts);
  };

  // 选择产品
  const handleProductSelectChange = (value: number | string) => {
    const numericValue = Number(value);
    productList.forEach((p) => {
      if (p.id === numericValue) {
        updateProducts(
          products.map((pro) => {
            if (!pro.id) {
              return {
                ...pro,
                ...p,
                randomId: randomId(),
              };
            }
            return pro;
          }),
        );
      }
    });
  };

  const renderProductSelector = (val: string, record: IDataSource) => {
    if (record.id) return val;
    return (
      <Select
        value={Number(val) || undefined}
        showSearch
        options={productList.map((c) => ({
          label: c.name,
          value: Number(c.id),
        }))}
        onSearch={debouncedOnProductSearch}
        onChange={(value: number) => handleProductSelectChange(value)}
      />
    );
  };

  // 修改列表数据
  const handleChangeData = (
    id: number,
    key: keyof IDataSource,
    value: number | undefined,
  ) => {
    updateProducts(
      products.map((p) => {
        if (p.randomId === id) {
          return {
            ...p,
            [key]: value,
          };
        }
        return p;
      }),
    );
  };

  const rowSelection: TableProps<IDataSource>['rowSelection'] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
      setSelectedRowKeys(selectedRowKeys);
      onChange?.({
        productCategoryId: categoryId,
        products: selectedRowKeys.map((key) => {
          const product = products.find((p) => p.randomId === key);
          return {
            id: product?.id,
            num: product?.num,
          };
        }),
      });
    },
    selectedRowKeys,
    getCheckboxProps: (record: IDataSource) => ({
      disabled: !record.id,
    }),
  };

  return (
    <Card
      title={
        <Input
          style={{ width: 200 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      }
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => onRemove()}
        />
      }
    >
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
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
          rowKey="randomId"
          dataSource={products || []}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          footer={() => (
            <Button
              ghost
              style={{ width: '100%' }}
              type="primary"
              icon={<PlusOutlined />}
              disabled={!categoryId}
              onClick={() => {
                updateProducts([
                  ...products,
                  {
                    id: undefined,
                    name: '',
                    label: '',
                    price: 0,
                    unit: undefined,
                  },
                ]);
              }}
            >
              添加数据
            </Button>
          )}
        />
      </Space>
    </Card>
  );
}
