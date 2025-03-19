import { useState, useEffect } from 'react';
import {
  Button,
  Space,
  message,
  Descriptions,
  Card,
  Typography,
  InputNumber,
  Drawer,
  Table,
  Select,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { EyeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
} from '@bill/database/esm';
import { getRandomId } from '@/utils/utils';

import useData from '@/hooks/data/useData';

const { Title } = Typography;
const randomId = getRandomId();

interface IProps {
  id: number;
  title: string;
}

type IDataSource = Partial<ProductEntity> & {
  discount?: number;
  randomId?: number;
};

export default function CustomerDetail({ id, title }: IProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [{ data: rows, loading, error: apiError }, fetchRows] = useAxios(
    {
      url: `/customers/${id}/products`,
    },
    {
      manual: true,
    },
  );
  const [{ data: info }, fetchInfo] = useAxios(
    {
      url: `/customers/${id}`,
    },
    {
      manual: true,
    },
  );
  const [{ data: postData, loading: saveLoad }, executePost] = useAxios(
    {
      url: `/customers/${id}/products`,
      method: 'POST',
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

  useEffect(() => {
    const data = rows?.[0]?.map((item: ProductEntity) => {
      if (!item?.customerPrices?.length) {
        return {
          ...item,
          customerPrices: [{ price: item.price, discount: 100 }],
        };
      }
      return { ...item, randomId: randomId() };
    });
    setDataSource(data || []);
  }, [rows]);

  useEffect(() => {
    if (postData) {
      message.success('保存成功');
      setShowModal(false);
    }
  }, [postData]);

  useEffect(() => {
    if (apiError) {
      message.error(apiError?.message);
    }
  }, [apiError]);

  useEffect(() => {
    if (showModal) {
      fetchRows();
      fetchInfo();
    }
  }, [showModal]);

  const handleChangePrice = (randomId: number, value: number) => {
    const updatedRows = dataSource.map((item) => {
      if (item.randomId === randomId) {
        item.customerPrices![0].price = value;
      }
      return item;
    });

    setDataSource(updatedRows);
  };

  const handleChangeDiscount = (randomId: number, value: number) => {
    const updatedRows = dataSource.map((item) => {
      if (item.randomId === randomId) {
        item.customerPrices![0].discount = value;
      }
      return item;
    });

    setDataSource(updatedRows);
  };

  const handleProductSelectChange = (value: number) => {
    const product = productList?.find((c) => c.id === value);
    if (product) {
      setDataSource(
        dataSource.map((item) => {
          if (!item.id) {
            return { ...item, ...product };
          }
          return item;
        }),
      );
    }
  };

  const columns: ColumnsType<IDataSource> = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: 200,
      render: (val, record) => {
        if (record.id) return val;
        return (
          <Select
            loading={serachLoad}
            style={{ width: '100%' }}
            value={Number(val) || undefined}
            showSearch
            filterOption={false}
            options={productList?.map((c) => ({
              label: c.name,
              value: Number(c.id),
            }))}
            onSearch={(val) => {
              debouncedOnProductSearch({
                name: val === '' ? undefined : val,
                excludeIds: dataSource.map((item) => item.id).filter(Boolean),
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
      render: (_, record) => {
        const disPrice = record.customerPrices?.[0]?.price;
        return (
          <InputNumber
            disabled={!record.id}
            value={disPrice}
            onChange={(value) => handleChangePrice(record.randomId!, value!)}
          />
        );
      },
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      align: 'center',
      render: (_, record) => {
        const discount = record.customerPrices?.[0]?.discount;
        return (
          <InputNumber
            disabled={!record.id}
            value={discount}
            min={0}
            max={100}
            precision={0}
            onChange={(value) => handleChangeDiscount(record.randomId!, value!)}
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
            setDataSource(
              dataSource.filter((p) => p.randomId !== record.randomId),
            );
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={<EyeOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      />

      <Drawer
        title={title}
        destroyOnClose
        width={'100%'}
        onClose={() => setShowModal(false)}
        open={showModal}
        styles={{
          body: {
            paddingBottom: 20,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setShowModal(false)}>
              {t('crud.cancel')}
            </Button>
            <Button
              loading={saveLoad}
              onClick={() => {
                const res = dataSource.map((item) => {
                  return {
                    productId: item.id,
                    price: item.customerPrices?.[0]?.price,
                    discount: item.customerPrices?.[0]?.discount,
                  };
                });
                executePost({
                  data: {
                    prices: res,
                  },
                });
              }}
              type="primary"
            >
              {t('crud.save')}
            </Button>
          </Space>
        }
      >
        <Space size={10} direction="vertical">
          <Card variant="borderless">
            <Descriptions
              items={[
                {
                  key: '1',
                  label: '客户名称',
                  children: info?.fullname,
                },
                {
                  key: '2',
                  label: '客户邮箱',
                  children: info?.email,
                },
                {
                  key: '3',
                  label: '客户手机',
                  children: info?.phone,
                },
                {
                  key: '4',
                  label: '客户地址',
                  children: info?.address,
                },
                {
                  key: '5',
                  label: '客户折扣',
                  children: info?.discount,
                },
                {
                  key: '5',
                  label: '客户简介',
                  children: info?.desc,
                },
              ]}
            />
          </Card>
          <Table
            title={() => <Title level={5}>商品列表</Title>}
            rowKey="randomId"
            loading={loading}
            dataSource={dataSource || []}
            columns={columns}
            pagination={false}
            scroll={{ x: 1200 }}
            footer={() => (
              <Button
                ghost
                style={{ width: '100%' }}
                type="primary"
                icon={<PlusOutlined />}
                disabled={dataSource.some((item) => !item.id)}
                onClick={() => {
                  setDataSource((prev) => [
                    ...prev,
                    {
                      name: '',
                      label: '',
                      price: 0,
                      randomId: randomId(),
                      customerPrices: [{ price: 0, discount: 100 }],
                    } as IDataSource,
                  ]);
                }}
              >
                添加数据
              </Button>
            )}
          />
        </Space>
      </Drawer>
    </>
  );
}
