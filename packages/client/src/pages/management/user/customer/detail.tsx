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

import useData from '@/hooks/data/useData';

import DetailForm from '../customerDetail/detailForm';

const { Title } = Typography;

interface IProps {
  id: number;
  title: string;
}

type IDataSource = Partial<ProductEntity> & {
  discount?: number;
};

export default function CustomerDetail({ id, title }: IProps) {
  // const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  // const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  // const [{ data: rows, loading, error: apiError }, fetchRows] = useAxios(
  //   {
  //     url: `/customers/${id}/products`,
  //   },
  //   {
  //     manual: true,
  //   },
  // );
  // const [{ data: info }, fetchInfo] = useAxios(
  //   {
  //     url: `/customers/${id}`,
  //   },
  //   {
  //     manual: true,
  //   },
  // );
  // const [{ data: postData, loading: saveLoad }, executePost] = useAxios(
  //   {
  //     url: `/customers/${id}/products`,
  //     method: 'POST',
  //   },
  //   {
  //     manual: true,
  //   },
  // );

  // const {
  //   rows: productList,
  //   loading: serachLoad,
  //   onSearch: debouncedOnProductSearch,
  // } = useData<ProductCategoryEntity[]>('products');

  // const columns: ColumnsType<IDataSource> = [
  //   {
  //     title: '名称',
  //     dataIndex: 'name',
  //     align: 'center',
  //     width: 200,
  //     render: (val, record) => {
  //       if (record.id) return val;
  //       return (
  //         <Select
  //           loading={serachLoad}
  //           style={{ width: '100%' }}
  //           value={Number(val) || undefined}
  //           showSearch
  //           filterOption={false}
  //           options={productList
  //             ?.map((c) => ({
  //               label: c.name,
  //               value: Number(c.id),
  //             }))
  //             .filter((item) => {
  //               return !dataSource.some((p) => p.id === item.value);
  //             })}
  //           onSearch={(val) => {
  //             debouncedOnProductSearch({
  //               name: val === '' ? undefined : val,
  //               excludeIds: dataSource.map((item) => item.id).filter(Boolean),
  //             });
  //           }}
  //           onChange={(value: number) => handleProductSelectChange(value)}
  //         />
  //       );
  //     },
  //   },
  //   {
  //     title: '标签',
  //     dataIndex: 'label',
  //     align: 'center',
  //   },
  //   {
  //     title: '价格',
  //     dataIndex: 'price',
  //     align: 'center',
  //     render: (_, record) => {
  //       const disPrice = record.customerPrices?.[0]?.price;
  //       return (
  //         <InputNumber
  //           disabled={!record.id}
  //           value={disPrice}
  //           onChange={(value) => handleChangePrice(record.id!, value!)}
  //         />
  //       );
  //     },
  //   },
  //   {
  //     title: '折扣',
  //     dataIndex: 'discount',
  //     align: 'center',
  //     render: (_, record) => {
  //       const discount = record.customerPrices?.[0]?.discount;
  //       return (
  //         <InputNumber
  //           disabled={!record.id}
  //           value={discount}
  //           min={0}
  //           max={100}
  //           precision={0}
  //           onChange={(value) => handleChangeDiscount(record.id!, value!)}
  //         />
  //       );
  //     },
  //   },
  //   {
  //     title: '单位',
  //     dataIndex: 'unit',
  //     align: 'center',
  //     render: (obj: ProductUnitEntity) => obj?.name,
  //   },
  //   {
  //     title: '分类',
  //     dataIndex: 'category',
  //     align: 'center',
  //     render: (obj: ProductCategoryEntity) => obj?.name,
  //   },
  //   {
  //     title: '介绍',
  //     dataIndex: 'desc',
  //     align: 'center',
  //     width: '15%',
  //     ellipsis: true,
  //   },
  //   {
  //     title: '操作',
  //     key: 'operation',
  //     align: 'center',
  //     width: 100,
  //     render: (_, record) => (
  //       <Button
  //         type="link"
  //         danger
  //         icon={<DeleteOutlined />}
  //         onClick={() => {
  //           setDataSource(dataSource.filter((p) => p.id !== record.id));
  //         }}
  //       />
  //     ),
  //   },
  // ];

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

      {showModal && (
        <DetailForm
          customerId={id}
          onSuccess={() => {
            setShowModal(false);
          }}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
