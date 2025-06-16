import { useState } from 'react';
import { Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity } from '@bill/database/esm';

import useDetailData from '@/hooks/data/useDetailData';

import CategoryDrawer from './CategoryDrawer';

export type ProductModalProps = {
  formValue: ProductCategoryEntity;
  title: string;
  onSuccess: () => void;
};

export default function CategoryEditModal({
  formValue,
  title,
  onSuccess,
}: ProductModalProps) {
  const [showModal, setShowModal] = useState(false);
  const { data, loading } = useDetailData<ProductCategoryEntity>(
    'product/categories',
    formValue.id,
    showModal
  );

  return (
    <>
      <Button
        type="text"
        shape="circle"
        loading={loading}
        icon={<EditOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      />

      {loading && <Spin />}

      {showModal && (
        <CategoryDrawer
          formValue={data}
          title={title}
          onSuccess={onSuccess}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
