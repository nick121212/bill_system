import { useCallback, useRef } from 'react';
import { Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';

import useFormAction from '@/hooks/form/useFormAction';

export type ModalProps = {
  title: string;
  onSuccess: () => void;
};

export default function PermissionModal({ title, onSuccess }: ModalProps) {
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
        url: `/reset/products`,
        method: 'DELETE',
      },
      onSuccessCall,
    );

  return (
    <>
      <Button
        type={'primary'}
        danger
        loading={loadingAjax}
        icon={<DeleteOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {t('cls.product.modal.rTitle')}
      </Button>

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
        重置会删除所有商品的信息，包括商品分类，商品单位以及模板信息。
      </Modal>
    </>
  );
}
