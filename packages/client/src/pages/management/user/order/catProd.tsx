import { useEffect, useState, useRef } from 'react';
import { Select, Table, Space, Button, Card, InputNumber, Input } from 'antd';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
} from '@bill/database/esm';
import useAxios from 'axios-hooks';

import useData from '@/hooks/data/useData';
import useWatch from '@/hooks/data/useWatch';
import { getRandomId } from '@/utils/utils';
import { fShortenNumber } from '@/utils/format-number';

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
  cusProductData?: ProductEntity[];
}

type IDataSource = Partial<ProductEntity> & {
  count?: number;
  discount?: number;
  randomId?: number;
  product?: ProductEntity;
};

const randomId = getRandomId();

export default function CatProd(props: IProps) {
  const { value, onChange, index, onRemove, cusProductData } = props;
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
  // 获取客户配置的产品价格及折扣
  const getCustomerPrice = (proId: number) => {
    if (!proId) return { price: 0, discount: 100 };
    const cusProduct = cusProductData?.find((p) => p.id === proId);
    return {
      price: cusProduct?.customerPrices?.[0]?.price || 0,
      discount: cusProduct?.customerPrices?.[0]?.discount || 100,
    };
  };
  const [products, setProducts] = useState<IDataSource[]>(
    value?.products?.map((item) => {
      const res = {
        ...item,
        randomId: randomId(),
      };
      if (!res.discount) {
        const { price, discount } = getCustomerPrice(res?.product?.id || 0);
        res.price = price;
        res.discount = discount;
      }
      return res;
    }) || [],
  );
  // 每行总价集合
  const rowTotalPrices = useRef<number[]>([]);

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
    const { price, discount } = getCustomerPrice(first?.id!);
    first &&
      setProducts([
        {
          ...first,
          randomId: randomId(),
          price: price || first.price,
          discount,
        },
      ]);
  }, [rows]);

  useEffect(() => {
    onChange?.({
      name: title,
      productCategoryId: categoryId,
      products: products.map((product) => {
        return {
          id: product?.id,
          price: product?.price,
          count: product?.count ?? 1,
          discount: product?.discount,
        };
      }),
    });
  }, [categoryId, title, products]);

  // 单行总价
  const handleTotalPrice = (record: IDataSource) => {
    const { price = 0, discount = 100, count = 1 } = record;
    return fShortenNumber(price * count * (discount / 100));
  };

  const columns: ColumnsType<IDataSource> = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: 200,
      render: (val: string, record: IDataSource) => {
        if (record.id) return val;
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
          />
        );
      },
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
      title: '折扣',
      dataIndex: 'discount',
      align: 'center',
      render: (discount = 100, record) => {
        return (
          <InputNumber
            disabled={!record.id}
            value={discount}
            min={0}
            max={100}
            precision={0}
            placeholder="0-100"
            onChange={(value) =>
              handleChangeData(record.randomId!, 'discount', value!)
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
      title: '总价',
      dataIndex: 'totalPrice',
      align: 'center',
      render: (_, record, index) => {
        const res = handleTotalPrice(record);
        rowTotalPrices.current[index] = Number(res);
        return res;
      },
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 80,
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
    onChange?.({
      name: title,
      productCategoryId: categoryId,
      products: newProducts.map((product) => {
        return {
          id: product?.id,
          price: product?.price,
          count: product?.count ?? 1,
          discount: product?.discount,
        };
      }),
    });
  };

  // 选择产品
  const handleProductSelectChange = (value: number | string) => {
    const numericValue = Number(value);
    productList.forEach((p) => {
      if (p.id === numericValue) {
        updateProducts(
          products.map((pro) => {
            if (!pro.id) {
              const { price, discount } = getCustomerPrice(p.id!);
              return {
                ...pro,
                ...p,
                price,
                discount,
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
    const updatedProducts = products.map((p) => {
      if (p.randomId === id) {
        return {
          ...p,
          [key]: value,
        };
      }
      return p;
    });

    updateProducts(updatedProducts);
  };

  return (
    <Card
      title={
        <Space size={10}>
          <Input
            style={{ width: 300 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            style={{ width: 500 }}
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
          <div>
            总价：
            {rowTotalPrices.current.filter(Boolean).reduce((pre, cur) => {
              return pre + cur;
            }, 0)}
          </div>
        </Space>
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
        size="small"
        dataSource={products || []}
        columns={columns}
        pagination={false}
        // scroll={{ x: 720 }}
        footer={() => (
          <Button
            ghost
            style={{ width: '100%' }}
            type="primary"
            icon={<PlusOutlined />}
            disabled={!categoryId || products.some((item) => !item.id)}
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
        )}
      />
    </Card>
  );
}
