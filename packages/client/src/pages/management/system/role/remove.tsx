import { useCallback, useRef } from "react";
import {
  Button,
  Modal,
  Space,
} from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import type { RoleEntity } from "@bill/database/esm";

import useFormAction from "@/hooks/form/useFormAction";


export type RoleModalProps = {
  formValue: RoleEntity;
  title: string;
  onSuccess: () => void;
};

export default function PermissionModal({
  title,
  formValue,
  onSuccess,
}: RoleModalProps) {
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
        url: `/roles/${formValue.id}`,
        method: "DELETE",
      },
      onSuccessCall
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
        onClose={onClose}
        open={showModal}
        footer={
          <Space>
            <Button loading={loadingAjax} onClick={onClose}>
              {t("crud.cancel")}
            </Button>
            <Button
              loading={loadingAjax}
              onClick={() => {
                callAjax();
              }}
              type="primary"
            >
              {t("crud.confirm")}
            </Button>
          </Space>
        }
      >
        确定要删除记录吗？
      </Modal>
    </>
  );
}
