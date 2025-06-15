import { useMemo } from 'react';
import { Descriptions, Space, Table } from 'antd';
import type { DescriptionsProps, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import {  CustomerEntity } from '@bill/database/esm';

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
    customerId: number;
    templateId: number;
    desc: string;
    status: number;
    createTime?: Date;
    realTotalPrice?: number;
  }
}

const ConfrimDetail = ({formData}: IProps) => {
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

  const items: DescriptionsProps['items'] = [
    {
      label: '订单编号',
      span: 'filled',
      children: convertNo(formData?.no || ''),
    },
    {
      label: '客户',
      span: 2,
      children: formData?.customer?.fullname,
    },
    {
      label: '电话',
      span: 2,
      children: formData?.customer?.phone,
    },
    {
      label: '地址',
      span: 2,
      children: formData?.customer?.address,
    },
    {
      label: '邮箱',
      span: 2,
      children: formData?.customer?.email,
    },
    {
      label: '结款信息',
      span: 2,
      children: t(`cls.order.statusStr.${formData?.status || 0}`),
    },
    {
      label: '订单日期',
      span: 2,
      children: formData?.createTime ? dayjs(formData?.createTime).format('YYYY-MM-DD HH:mm:ss') : '--',
    },
    {
      label: '描述',
      span: 'filled',
      children: formData?.customer?.desc,
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
  );
};

export default ConfrimDetail;
