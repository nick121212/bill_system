import { useState } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import DetailForm from '../customerDetail/detailForm';

interface IProps {
  id: number;
  title: string;
}

export default function CustomerDetail({ id }: IProps) {
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
