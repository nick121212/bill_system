import { useState, useMemo } from 'react';
import { Button, Descriptions, Drawer, Space, Table } from 'antd';
import type { DescriptionsProps, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { AlignRightOutlined } from '@ant-design/icons';
import { OrderEntity, ProductCategoryEntity } from '@bill/database/esm';

import useDetailData from '@/hooks/data/useDetailData';
import { convertPriceFromServer } from '@/utils';

interface IProps {
  orderId: number;
  onClose: () => void;
}

export function OrderDetail(props: IProps) {
  const { orderId, onClose } = props;
  const { t } = useTranslation();

  const { data, loading } = useDetailData<OrderEntity>(
    'orders',
    orderId,
    !!orderId,
  );

  const { data: categories, loading: categoriesLoading } = useDetailData<
    ProductCategoryEntity[]
  >(`orders/${orderId}`, 'categories', !!orderId);

  const flattenData = useMemo(() => {
    const data: any[] = [];
    let totalPrice = 0;
    categories?.forEach((item) => {
      item.products?.forEach((product: any, productIndex: number) => {
        const row = {
          ...product,
          unit: product.product?.unit?.name,
          categoryName: product.productCategory?.name,
          fitstCategoryName: item.name,
          rowSpan: productIndex === 0 ? item.products.length : 0,
        };
        data.push(row);
        if (product?.count && product?.price && product?.times) {
          totalPrice += product.count * product.price * product.times;
        }
      });
    });
    data.push({
      fitstCategoryName: <span style={{ fontWeight: 'bold' }}>总价</span>,
      times: (
        <span style={{ fontWeight: 'bold' }}>
          {convertPriceFromServer(totalPrice)}
        </span>
      ),
    });
    return data;
  }, [categories]);

  const items: DescriptionsProps['items'] = [
    {
      label: '订单编号',
      span: 'filled',
      children: data?.no,
    },
    {
      label: '客户',
      span: 2,
      children: data?.customer?.fullname,
    },
    {
      label: '电话',
      span: 2,
      children: data?.customer?.phone,
    },
    {
      label: '地址',
      span: 2,
      children: data?.customer?.address,
    },
    {
      label: '邮箱',
      span: 2,
      children: data?.customer?.email,
    },
    {
      label: '描述',
      span: 'filled',
      children: data?.customer?.desc,
    },
  ];

  const columns: TableProps<any>['columns'] = [
    {
      title: '分类名称',
      width: 200,
      dataIndex: 'fitstCategoryName',
      onCell: (record) => {
        return {
          rowSpan: record.rowSpan,
        };
      },
    },
    {
      title: '产品名称',
      dataIndex: 'name',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (val: number) => val && convertPriceFromServer(val),
    },
    {
      title: '数量',
      dataIndex: 'count',
    },
    {
      title: '份数',
      dataIndex: 'times',
    },
  ];

  return (
    <Drawer
      destroyOnClose
      width={'100%'}
      title={t('cls.order.detail.title')}
      onClose={onClose}
      open={true}
      extra={
        <Space>
          <Button onClick={onClose}>{t('crud.cancel')}</Button>
        </Space>
      }
    >
      <Space direction="vertical" size={16}>
        <Descriptions bordered title={'基本信息'} items={items} size="small" />
        <Descriptions title="产品列表" size="small">
          <Descriptions.Item label="" span={24}>
            <Table
              size="small"
              style={{ width: '100%' }}
              columns={columns}
              dataSource={flattenData}
              pagination={false}
            />
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Drawer>
  );
}

export default function OrderDetailButton({ orderId }: { orderId: number }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={<AlignRightOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal && (
        <OrderDetail orderId={orderId} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
