import { useState } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import DetailForm from './detailForm';

interface IProps {
  templateId: number;
  title: string;
  onSuccess: () => void;
}

export default function ProductTemplateDetail({ templateId, title }: IProps) {
  const [showModal, setShowModal] = useState(false);

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
          title={title}
          templateId={templateId}
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
