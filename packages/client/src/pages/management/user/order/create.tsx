import { useState } from 'react';
import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { useTranslation } from 'react-i18next';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  OrderCategoryEntity,
  OrderEntity,
  ProductPriceEntity,
} from '@bill/database/esm';

import useDetailData from '@/hooks/data/useDetailData';

import DetailForm from './detailForm';

interface IProps {
  orderId: number;
  title: string;
  btnType?: ButtonType;
  btnTxt?: string;
  onSuccess: () => void;
}

export default function ProductTemplateDetail({
  orderId,
  title,
  btnType = 'link',
  btnTxt,
  onSuccess,
}: IProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { data, loading } = useDetailData<OrderEntity>(
    'orders',
    orderId,
    showModal && !!orderId,
  );
  const { data: categories, loading: categoriesLoading } = useDetailData<
    OrderCategoryEntity[]
  >(`orders/${orderId}`, 'categories', showModal && !!orderId);
  const { data: products, loading: productsLoading } = useDetailData<
    ProductPriceEntity[]
  >(
    `customers/${data?.customer?.id}`,
    'products',
    showModal && !!data?.customer?.id,
  );
  // const { uuid, loading: uuidLoading } = useUUID(showModal);  

  console.log(data , categories , products);
  

  return (
    <>
      {orderId ? (
        <Button
          type={btnType}
          shape="circle"
          loading={loading && categoriesLoading && productsLoading}
          icon={<EditOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        />
      ) : (
        <Button
          loading={loading && categoriesLoading && productsLoading}
          type={btnType}
          icon={<PlusOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        >
          {btnTxt || t('crud.create.buttonText')}
        </Button>
      )}

      {showModal && ((data && categories && products) || !orderId) && (
        <DetailForm
          key={orderId}
          title={title}
          order={
            {
              no: '',
              ...data,
              customerProducts: products?.map || {},
            } as any
          }
          categories={categories as any}
          onSuccess={() => {
            setShowModal(false);
            onSuccess?.();
          }}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
