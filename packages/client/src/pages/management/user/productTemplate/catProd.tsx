import { useEffect, useState } from 'react';
import { Select, Table, Space, Button, Card, InputNumber, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
} from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useWatch from '@/hooks/data/useWatch';
import { getRandomId } from '@/utils/utils';

interface IProps {
  value?: {
    name?: string;
    productCategoryId?: number;
    products?: IDataSource[];
  };
  onChange?: (value: {
    name?: string;
    productCategoryId?: number;
    products?: IDataSource[];
  }) => void;
  index: number;
  onRemove: () => void;
}

type IDataSource = Partial<ProductEntity> & {
  count?: number;
  randomId?: number;
};

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
  const [title, setTitle] = useState<string>(value?.name || `分类${index + 1}`);
  const [categoryId, setCategoryId] = useState<number | undefined>(
    value?.productCategoryId,
  );
  const [products, setProducts] = useState<IDataSource[]>(
    value?.products?.map((item) => ({
      ...item,
      randomId: randomId(),
    })) || [],
  );

  useWatch(() => {
    if (!categoryId) {
      setProducts([]);
      return;
    }
    refresh({ params: { whele: { category: { id: categoryId } } } });
  }, [categoryId]);

  useWatch(() => {
    // 取第一条数据
    const first = rows?.rows?.[0];
    first && setProducts([{ ...first, randomId: randomId() }]);
  }, [rows]);

  useEffect(() => {
    onChange?.({
      name: title,
      productCategoryId: categoryId,
      products: products.map((product) => {
        return {
          id: product?.id,
          price: product?.price,
          count: product?.count,
        };
      }),
    });
  }, [categoryId, products, title]);

  const columns: ColumnsType<IDataSource> = [
    {
      title: '分类',
      dataIndex: 'categoryId',
      render: () => {
        return (
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
            onSearch={(val) =>
              debouncedOnCateSearch({ name: val === '' ? undefined : val })
            }
            allowClear
          />
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: 200,
      render: (val: string, record: IDataSource) => {
        return (
          <Select
            loading={serachLoad}
            value={Number(val) || undefined}
            showSearch
            filterOption={false}
            options={productList.map((c) => {
              return {
                label: c.name,
                value: Number(c.id),
              };
            })}
            onSearch={(val) => {
              debouncedOnProductSearch({
                name: val === '' ? undefined : val,
                category: { id: categoryId },
              });
            }}
            onChange={(value: number) => handleProductSelectChange(value)}
            allowClear
          />
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
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
      dataIndex: 'count',
      align: 'center',
      render: (val, record) => (
        <InputNumber
          disabled={!record.id}
          defaultValue={1}
          value={val}
          min={1}
          precision={0}
          onChange={(value) =>
            handleChangeData(record.randomId!, 'count', value)
          }
        />
      ),
    },
    {
      title: '份数',
      dataIndex: 'copies',
      align: 'center',
      render: (val, record) => (
        <InputNumber
          disabled={!record.id}
          defaultValue={1}
          value={val}
          min={1}
          precision={0}
          onChange={(value) =>
            handleChangeData(record.randomId!, 'copies', value)
          }
        />
      ),
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 80,
      render: (_, record, index) => (
        <div className="flex w-full justify-center text-gray">
          {products.filter((item) => item.id).length - 1 === index && (
            <Button
              type="link"
              icon={<PlusOutlined />}
              disabled={products.some((item) => !item.id)}
              onClick={() => {
                updateProducts([
                  ...products,
                  {
                    id: undefined,
                    name: '',
                    label: '',
                    price: 0,
                    unit: undefined,
                    randomId: randomId(),
                  },
                ]);
              }}
            />
          )}
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
        </div>
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
              };
            }
            return pro;
          }),
        );
      }
    });
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
      <Table
        rowKey="randomId"
        dataSource={products || []}
        columns={columns}
        pagination={false}
        // scroll={{ x: 720 }}
        size="small"
        footer={() => {
          if (products?.length) return null;
          return (
            <Button
              ghost
              style={{ width: '100%' }}
              type="primary"
              icon={<PlusOutlined />}
              disabled={products.some((item) => !item.id)}
              onClick={() => {
                updateProducts([
                  ...products,
                  {
                    id: undefined,
                    name: '',
                    label: '',
                    price: 0,
                    unit: undefined,
                    randomId: randomId(),
                  },
                ]);
              }}
            >
              添加数据
            </Button>
          );
        }}
      />
    </Card>
  );
}
