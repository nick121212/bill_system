import { useCallback, useRef } from 'react';
import { Button, Modal, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity } from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';

export type PermissionModalProps = {
  record: ProductCategoryEntity;
  title: string;
  onSuccess: () => void;
};

export default function PermissionModal({
  title,
  record,
  onSuccess,
}: PermissionModalProps) {
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
        url: `/product/units/${record.id}`,
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
        确定要删除
        <Tag bordered={false} color="red" style={{fontSize: 14}}>
          {record.name}
        </Tag>{' '}
        单位吗？
      </Modal>
    </>
  );
}
