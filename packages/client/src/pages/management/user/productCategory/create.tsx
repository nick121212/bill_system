import { useState } from 'react';
import { Button } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity } from '@bill/database/esm';

import CategoryDrawer from './CategoryDrawer';

export type ProductModalProps = {
  btnType?: ButtonType;
  btnTxt?: string;
  formValue?: ProductCategoryEntity;
  title: string;
  onSuccess: () => void;
};

export default function CategoryCreateModal({
  btnType = 'link',
  btnTxt,
  formValue,
  title,
  onSuccess,
}: ProductModalProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        type={btnType}
        icon={<PlusOutlined />}
        onClick={() => setShowModal(true)}
      >
        {btnTxt || t('crud.create.buttonText')}
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
