import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { notification } from "antd";
import type { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";
import { ApiStatusCode } from "@bill/database/esm";

export default function useFormAction(
  formRef: React.RefObject<any>,
  axiosConfig: AxiosRequestConfig<unknown>,
  onSuccess?: VoidFunction
) {
  const [{ loading: loadingAjax, error, response }, callAjax] = useAxios(
    {
      ...axiosConfig,
    },
    { manual: true }
  );
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
  }, []);

  useEffect(() => {
    // formRef.current
    console.log(formRef.current);
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
      showProgress: true,
    });
  }, [error, t]);

  useEffect(() => {
    if (loadingAjax) {
      return;
    }

    if (!error && response?.statusText === ApiStatusCode.SUCCESS) {
      notification.success({
        message: t("crud.success.title"),
        description: t("crud.success.message"),
        duration: 2,
        placement: "bottomLeft",
        showProgress: true,
      });
      onSuccess?.();
    }
  }, [onSuccess, t, error, loadingAjax, response?.statusText]);

  return {
    onSubmit,
    onClose,
    onReset,
    showModal,
    setShowModal,
    formData,
    setFormData,
    loadingAjax,
    callAjax,
  };
}
