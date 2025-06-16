import { useCallback, useRef } from 'react';
import { Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import type { ReportEntity } from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';

export type ModalProps = {
  record: ReportEntity;
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
        url: `/reports/${record.id}`,
        method: 'DELETE',
      },
      onSuccessCall,
    );

  return (
    <>
      <Button
        type="text"
        shape="circle"
        loading={loadingAjax}
        icon={<DeleteOutlined />}
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
                callAjax();
              }}
              type="primary"
            >
              {t('crud.confirm')}
            </Button>
          </Space>
        }
      >
        确定要删除?
      </Modal>
    </>
  );
}
