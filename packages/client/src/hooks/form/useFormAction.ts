import React, { useEffect, useMemo, useState } from "react";
import { notification } from "antd";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export default function useFormAction(
  formRef: React.RefObject<any>,
  error?: AxiosError<any, any> | null
) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const onSubmit = useMemo(() => {
    return () => {
      formRef.current.submit();
    };
  }, [formRef.current]);

  const onReset = useMemo(() => {
    return () => {
      formRef.current.reset();
    };
  }, [formRef.current]);

  const onClose = useMemo(() => {
    return () => {
      setShowModal(false);
    };
  }, [formRef.current]);

  useEffect(() => {
    if (!error) {
      return;
    }

    notification.error({
      message: t("crud.error.title"),
      description: error.message,
      duration: 3,
      placement: "topLeft",
    });
  }, [error]);

  return {
    onSubmit,
    onClose,
    onReset,
    showModal,
    setShowModal,
    formData,
    setFormData,
  };
}
