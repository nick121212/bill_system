import { useCallback, useRef, useState } from 'react';
import { Button, Modal, Space, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import type { OrderEntity } from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';

export type ModalProps = {
  record: OrderEntity;
  title: string;
  onSuccess: () => void;
};

export default function PermissionModal({
  title,
  record,
  onSuccess,
}: ModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const onSuccessCall = useCallback(() => {
    onSuccess?.();
    setShowModal(false);
  }, [onSuccess]);
  const { showModal, setShowModal, onClose, callAjax, loadingAjax } =
    useFormAction(
      formRef,
      {
        url: `/orders/${record.id}/status`,
        method: 'PUT',
      },
      onSuccessCall,
    );
  const [status, setStatus] = useState(1);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <Button
        type="text"
        shape="circle"
        loading={loadingAjax}
        icon={<SyncOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      />

      <Modal
        title={title}
        destroyOnClose
        onCancel={onClose}
        open={showModal}
        footer={
          <Space>
            <Button loading={loadingAjax} onClick={onClose}>
              {t('crud.cancel')}
            </Button>
            <Button
              loading={loadingAjax}
              onClick={() => {
                callAjax({ data: { status } });
              }}
              type="primary"
            >
              {t('crud.confirm')}
            </Button>
          </Space>
        }
      >
        <Radio.Group
          value={status}
          options={[
            { value: 1, label: '已付款' },
            { value: 2, label: '已取消' },
          ]}
          onChange={handleStatusChange}
        />
      </Modal>
    </>
  );
}
