import { useState } from 'react';
import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { useTranslation } from 'react-i18next';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { TemplateCategoryEntity, TemplateEntity } from '@bill/database/esm';

import useDetailData from '@/hooks/data/useDetailData';

import DetailForm from './detailForm';

interface IProps {
  templateId: number;
  title: string;
  btnType?: ButtonType;
  btnTxt?: string;
  onSuccess: () => void;
}

export default function ProductTemplateDetail({
  templateId,
  title,
  btnType="link",
  btnTxt,
  onSuccess,
}: IProps) {
  const [showModal, setShowModal] = useState(false);
  const { data, loading } = useDetailData<TemplateEntity>(
    'templates',
    templateId,
    showModal && !!templateId,
  );
  const { data: categories, loading: categoriesLoading } = useDetailData<
    TemplateCategoryEntity[]
  >(`templates/${templateId}`, 'categories', showModal && !!templateId);
  const { t } = useTranslation();

  return (
    <>
      {templateId ? (
        <Button
          type={btnType}
          shape="circle"
          loading={loading && categoriesLoading}
          icon={<EditOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        />
      ) : (
        <Button
          loading={loading && categoriesLoading}
          type={btnType}
          icon={<PlusOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        >
          {btnTxt || t('crud.create.buttonText')}
        </Button>
      )}

      {showModal && ((data && categories) || !templateId) && (
        <DetailForm
          title={title}
          template={data}
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
