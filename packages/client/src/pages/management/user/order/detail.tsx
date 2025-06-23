import { useState, useMemo } from 'react';
import { Button, Descriptions, Drawer, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { AlignRightOutlined } from '@ant-design/icons';
import { OrderEntity, ProductCategoryEntity } from '@bill/database/esm';

import useDetailData from '@/hooks/data/useDetailData';
import GenericDescriptions from '@/pages/components/genericDescriptions';
import { convertNo, convertPriceFromServer } from '@/utils';

interface IProps {
  orderId: number;
  onClose: () => void;
}

export function OrderDetail(props: IProps) {
  const { orderId, onClose } = props;
  const { t } = useTranslation();
  const [print, setPrint] = useState(true);

  const { data } = useDetailData<OrderEntity>('orders', orderId, !!orderId);

  const { data: categories } = useDetailData<ProductCategoryEntity[]>(
    `orders/${orderId}`,
    'categories',
    !!orderId,
  );

  const totalRealPrice = data?.realTotalPrice || 0;

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
      fitstCategoryName: <span style={{ fontWeight: 'bold' }}>应收总价</span>,
      times: (
        <span style={{ fontWeight: 'bold' }}>
          {convertPriceFromServer(totalPrice)}
        </span>
      ),
    });
    data.push({
      fitstCategoryName: <span style={{ fontWeight: 'bold' }}>实收总价</span>,
      times: (
        <span style={{ fontWeight: 'bold' }}>
          {convertPriceFromServer(totalRealPrice)}
        </span>
      ),
    });

    return data;
  }, [categories]);

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

  function doPrint() {
    setPrint(false);
    setTimeout(() => {
      window.print();
      setPrint(true);
    }, 100);
  }

  return (
    <Drawer
      destroyOnClose
      width={'100%'}
      title={t('cls.order.detail.title')}
      onClose={onClose}
      open={true}
      closable={print}
      extra={
        <Space>
          {print && (
            <Button
              type="primary"
              onClick={() => {
                doPrint();
              }}
            >
              {t('crud.print')}
            </Button>
          )}
        </Space>
      }
    >
      <Space direction="vertical" size={16}>
        <GenericDescriptions
          info={{
            ...(data?.customer || {}),
            no: data?.no,
            status: data?.status,
            createTime: data?.createTime,
          }}
          title="基本信息"
          itemsConfig={[
            { label: '订单编号', key: 'no', span: 'filled', formatter: (v) => convertNo(v || '') },
            { label: '客户', key: 'fullname' },
            { label: '电话', key: 'phone' },
            { label: '地址', key: 'address' },
            { label: '邮箱', key: 'email' },
            { label: '结款信息', key: 'status', formatter: (v) => t(`cls.order.statusStr.${v || 0}`) },
            { label: '订单日期', key: 'createTime', formatter: (v) => dayjs(v).format('YYYY-MM-DD HH:mm:ss') },
            { label: '描述', key: 'desc', span: 'filled' },
          ]}
        />
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
