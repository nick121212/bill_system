import { useMemo } from 'react';
import { Descriptions, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { CustomerEntity } from '@bill/database/esm';

import GenericDescriptions from '@/pages/components/genericDescriptions';
import { convertNo, convertPriceFromServer } from '@/utils';

interface IProps {
  formData: {
    categories: {
      name: string;
      products: {
        productId: number;
        productCategoryId: number;
        count: number;
        times: number;
        desc: string;
        price: number;
      }[];
    }[];
    customer: CustomerEntity;
    no: string;
    payment: number;
    customerId: number;
    templateId: number;
    desc: string;
    status: number;
    createTime?: Date;
    realTotalPrice?: number;
  };
}

const ConfrimDetail = ({ formData }: IProps) => {
  const { t } = useTranslation();
  const flattenData = useMemo(() => {
    const data: any[] = [];
    let totalPrice = 0;
    formData.categories?.forEach((item) => {
      item.products?.forEach((product: any, productIndex: number) => {
        const row = {
          ...product,
          name: product.product?.name,
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
          {convertPriceFromServer(formData?.realTotalPrice || 0)}
        </span>
      ),
    });
    return data;
  }, [formData]);

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
    <Space direction="vertical" size={16}>
      <GenericDescriptions
        info={{
          ...(formData?.customer || {}),
          no: formData?.no || '',
          status: formData?.status || 0,
          createTime: formData?.createTime || '--',
        }}
        title="基本信息"
        itemsConfig={[
          {
            label: '订单编号',
            key: 'no',
            formatter: (v) => convertNo(v || ''),
          },
          { label: '客户', key: 'fullname' },
          { label: '电话', key: 'phone' },
          { label: '地址', key: 'address' },
          { label: '邮箱', key: 'email' },
          {
            label: '结款信息',
            key: 'status',
            formatter: (v) => t(`cls.order.statusStr.${v || 0}`),
          },
          { label: '支付方式', key: 'payment', formatter: (v) => t(`cls.order.paymentStr.${v || 0}`) },
          {
            label: '订单日期',
            key: 'createTime',
            formatter: (v) =>
              v ? dayjs(v).format('YYYY-MM-DD HH:mm:ss') : '--',
          },
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
  );
};

export default ConfrimDetail;
