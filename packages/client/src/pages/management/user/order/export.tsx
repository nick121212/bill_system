import { useCallback, useRef } from 'react';
import { Button, Modal, Space, Tag } from 'antd';
import { saveAs } from "file-saver";
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import type { OrderEntity } from '@bill/database/esm';

import { axiosInstanceFile } from '@/api/apiClient';
import useFormAction from '@/hooks/form/useFormAction';

export type ModalProps = {
  // onSuccess: () => void;
};

export default function PermissionModal(
  {
    // onSuccess,
  }: ModalProps,
) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const onSuccessCall = useCallback(() => {
    // onSuccess?.();
    // setShowModal(false);
  }, []);

  const exportFile = async () => {
    const data = await axiosInstanceFile('/orders/export', {
      responseType: 'blob',
      method:"PATCH",
      data: {
        selectAll: true,
        orderIds: [13, 14, 15, 16],
      },
    });

    const url = window.URL.createObjectURL(data.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button
        icon={<ExportOutlined />}
        type="link"
        onClick={() => {
          exportFile();
        }}
      >
        导出账单
      </Button>
    </>
  );
}
