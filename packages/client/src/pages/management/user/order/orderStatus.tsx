import { useCallback, useRef } from 'react';
import { Select } from 'antd';
import type { OrderEntity } from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';

export type ModalProps = {
  record: OrderEntity;
  onSuccess: () => void;
};

export default function PermissionModal({ record, onSuccess }: ModalProps) {
  const formRef = useRef<any>();
  const onSuccessCall = useCallback(() => {
    onSuccess?.();
    setShowModal(false);
  }, [onSuccess]);
  const { setShowModal, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: `/orders/${record.id}/status`,
      method: 'PUT',
    },
    onSuccessCall,
  );
  const handleStatusChange = (value: number) => {
    callAjax({
      data: {
        status: value,
      },
    });
  };

  return (
    <Select
      value={0}
      loading={loadingAjax}
      options={[
        { value: 0, label: '未付款' },
        { value: 1, label: '已付款' },
        { value: 2, label: '已取消' },
      ]}
      onChange={handleStatusChange}
    ></Select>
  );
}
