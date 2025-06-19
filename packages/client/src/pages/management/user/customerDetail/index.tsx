import { useState, useEffect } from 'react';
import {
  Button,
  Space,
  message,
  Descriptions,
  Card,
  Typography,
  InputNumber,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity, ProductUnitEntity, ProductEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import { useParams } from '@/router/hooks';

const { Title } = Typography;

interface IDataSource extends ProductEntity {
  discount: number;
}

export default function PermissionPage() {
  const { id } = useParams();
  const { t } = useTranslation();
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
            value={disPrice || val}
            onChange={(value) => handleChangePrice(record.id, value)}
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
            value={discount || val}
            min={0}
            max={100}
            precision={0}
            onChange={(value) => handleChangeDiscount(record.id, value)}
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
  ];

  return (
    <TablePage
      extra={
        <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
          <Button
            loading={saveLoad}
            type="primary"
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
          >
            保存
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type="text"
            onClick={() => {
              refresh();
            }}
          >
            {t('common.redo')}
          </Button>
        </Space>
      }
      tableProps={{
        title: () => <Title level={5}>商品列表</Title>,
        size: 'small',
        rowKey: 'id',
        loading,
        pagination: false,
        dataSource,
        columns,
        scroll: { x: 1200 },
        style: { padding: '0 24px' },
      }}
    >
      <Card title="客户信息" variant="borderless">
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
    </TablePage>
  );
}
