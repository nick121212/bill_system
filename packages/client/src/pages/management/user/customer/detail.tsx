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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { EyeOutlined } from '@ant-design/icons';
import type {
  ProductCategoryEntity,
  ProductUnitEntity,
  ProductEntity,
} from '@bill/database/esm';


const { Title } = Typography;

interface IProps {
  id: number;
  title: string;
}

interface IDataSource extends ProductEntity {
  discount: number;
}

export default function CustomerDetail({ id, title }: IProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [{ data: rows, loading, error: apiError }, refresh] = useAxios({
    url: `/customers/${id}/products`,
  });
  const [{ data: info }] = useAxios({
    url: `/customers/${id}`,
  });
  const [{ data: postData, loading: saveLoad }, executePost] = useAxios(
    {
      url: `/customers/${id}/products`,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    const data = rows?.[0]?.map((item: ProductEntity) => {
      if (!item?.customerPrices?.length) {
        return {
          ...item,
          customerPrices: [{ price: item.price, discount: 100 }],
        };
      }
      return item;
    });
    setDataSource(data || []);
  }, [rows]);

  useEffect(() => {
    if (postData) {
      message.success('保存成功');
      setShowModal(false);
      refresh();
    }
  }, [postData]);

  useEffect(() => {
    if (apiError) {
      message.error(apiError?.message);
    }
  }, [apiError]);

  const handleChangePrice = (proId: number, value: number) => {
    const updatedRows = dataSource.map((item) => {
      if (item.id === proId) {
        item.customerPrices![0].price = value;
      }
      return item;
    });

    setDataSource(updatedRows);
  };

  const handleChangeDiscount = (proId: number, value: number) => {
    const updatedRows = dataSource.map((item) => {
      if (item.id === proId) {
        item.customerPrices![0].discount = value;
      }
      return item;
    });

    setDataSource(updatedRows);
  };

  const columns: ColumnsType<IDataSource> = [
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
      render: (val, record) => {
        const disPrice = record.customerPrices?.[0]?.price;
        return (
          <InputNumber
            value={disPrice}
            onChange={(value) => handleChangePrice(record.id, value!)}
          />
        );
      },
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      align: 'center',
      render: (val, record) => {
        const discount = record.customerPrices?.[0]?.discount;
        return (
          <InputNumber
            value={discount}
            min={0}
            max={100}
            precision={0}
            onChange={(value) => handleChangeDiscount(record.id, value!)}
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
    // {
    //   title: '操作',
    //   key: 'operation',
    //   align: 'center',
    //   width: 100,
    //   render: (_, record) => (
    //     <Remove title="删除商品" record={record} onSuccess={onSuccess} />
    //   ),
    // },
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
            rowKey="id"
            loading={loading}
            dataSource={dataSource || []}
            columns={columns}
            pagination={false}
            scroll={{ x: 1200 }}
          />
        </Space>
      </Drawer>
    </>
  );
}
