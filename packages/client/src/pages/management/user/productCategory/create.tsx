import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity } from '@bill/database/esm';

import CategoryDrawer from './CategoryDrawer';

export type ProductModalProps = {
  formValue?: ProductCategoryEntity;
  title: string;
  onSuccess: () => void;
};

export default function CategoryCreateModal({
  formValue,
  title,
  onSuccess,
}: ProductModalProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        type="link"
        icon={<PlusOutlined />}
        onClick={() => setShowModal(true)}
      >
        {t('crud.create.buttonText')}
      </Button>

      {showModal && (
        <CategoryDrawer
          formValue={formValue}
          title={title}
          onSuccess={onSuccess}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
