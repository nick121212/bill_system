import { useEffect, useState } from 'react';
import { Select, Table, Button, Card, InputNumber, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
  TemplateCategoryEntity,
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
  productCategoryId?: number;
  times?: number;
  isEdit?: boolean;
  templateCategory?: TemplateCategoryEntity;
};

const randomId = getRandomId();
const initData = {
  id: undefined,
  name: '',
  desc: '',
  price: 0,
  unit: undefined,
};

export default function CatProd({ value, onChange, index, onRemove }: IProps) {
  const {
    rows: categories,
    loading: cateLoad,
    onSearch: debouncedOnCateSearch,
  } = useData<ProductCategoryEntity[]>('product/categories');
  const {
    rows: productList,
    loading: serachLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductCategoryEntity[]>('products');
  const [title, setTitle] = useState<string>(value?.name || `分类${index + 1}`);
  const [products, setProducts] = useState<IDataSource[]>(
    value?.products?.map((item) => ({
      ...item,
      isEdit: true,
      randomId: randomId(),
    })) || [],
  );

  useWatch(() => {
    onChange?.({
      name: title,
      products: products?.map((product) => {
        return {
          productCategoryId: product?.productCategoryId,
          productId: product?.id,
          price: product?.price,
          count: product?.count,
          times: product?.times,
        };
      }),
    });
  }, [products, title]);

  const columns: ColumnsType<IDataSource> = [
    {
      title: '分类',
      dataIndex: 'productCategoryId',
      align: 'center',
      width: 150,
      render: (val, record) => {
        const isExist =
          (categories || [])?.findIndex((item) => item.id === val) > -1;
        const options =
          categories?.map((c) => {
            return {
              label: c.name,
              value: c.id,
            };
          }) || [];
        if (!isExist && record.templateCategory) {
          options.push({
            label: record.templateCategory.name,
            value: record.templateCategory.id,
          });
        }
        return (
          <Select
            allowClear
            loading={cateLoad}
            value={val || record.templateCategory?.id}
            options={options}
            showSearch
            filterOption={false}
            onSearch={(val) => {
              debouncedOnCateSearch({ name: val === '' ? undefined : val });
            }}
            onChange={(value) => {
              debouncedOnProductSearch({
                category: { id: value },
              });
              handleChangeData(record.randomId!, 'productCategoryId', value);
            }}
          />
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'id',
      align: 'center',
      width: 170,
      render: (val: number, record: IDataSource) => {
        const isExist =
          (productList || [])?.findIndex((item) => item.id === val) > -1;
        const options =
          productList?.map((c) => {
            return {
              label: c.name,
              value: c.id,
            };
          }) || [];
        if (!isExist) {
          options.push({
            label: record.name!,
            value: record.id!,
          });
        }
        return (
          <Select
            allowClear
            loading={serachLoad}
            disabled={!record.productCategoryId && !record.templateCategory?.id}
            value={val || undefined}
            showSearch
            filterOption={false}
            options={options}
            onSearch={(val) => {
              debouncedOnProductSearch({
                name: val === '' ? undefined : val,
                category: {
                  id: record.productCategoryId || record.templateCategory?.id,
                },
              });
            }}
            onChange={(value: number) => {
              handleProductSelectChange(value);
              handleChangeData(record.randomId!, 'id', value);
            }}
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
      width: 150,
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
      width: 120,
      render: (obj: ProductUnitEntity) => obj?.name,
    },
    {
      title: '数量',
      dataIndex: 'count',
      align: 'center',
      width: 150,
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
      width: 150,
      render: (val, record) => (
        <InputNumber
          disabled={!record.id}
          defaultValue={1}
          value={val}
          min={1}
          precision={0}
          onChange={(value) =>
            handleChangeData(record.randomId!, 'times', value)
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
                    ...initData,
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
  const handleProductSelectChange = (value: number) => {
    productList?.forEach((p) => {
      if (p.id === value) {
        updateProducts(
          products?.map((pro) => {
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
      products?.map((p) => {
        let rest = {};
        if (key === 'productCategoryId') {
          rest = {
            ...initData,
          };
        }
        if (p.randomId === id) {
          return {
            ...p,
            ...rest,
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
        className='custom-table'
        rowKey="randomId"
        dataSource={products || []}
        columns={columns}
        pagination={false}
        scroll={{ x: 1080 }}
        size="small"
        {...(products?.length
          ? {}
          : {
              footer: () => (
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
                        ...initData,
                        randomId: randomId(),
                      },
                    ]);
                  }}
                >
                  添加数据
                </Button>
              ),
            })}
      />
    </Card>
  );
}
